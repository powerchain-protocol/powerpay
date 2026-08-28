import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import type { RecoveryRecord, RecoveryStore } from '@powerpay/transaction-recovery';

const KEY = '@powerpay/transaction-recovery/v2';
const LEGACY_KEY = '@powerpay/transaction-recovery/v1';
const signedKey = (attemptId: string) => `powerpay.recovery.signed.${attemptId}`;

type StoredRecoveryRecord = Omit<RecoveryRecord, 'signedTransaction'> & { hasSignedTransaction?: boolean };

export class MobileRecoveryStore implements RecoveryStore {
  async list(): Promise<RecoveryRecord[]> {
    await this.migrateLegacy();
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    let stored: StoredRecoveryRecord[];
    try { stored = JSON.parse(raw) as StoredRecoveryRecord[]; } catch { return []; }
    return Promise.all(stored.map(async (record) => ({
      ...record,
      signedTransaction: record.hasSignedTransaction ? (await SecureStore.getItemAsync(signedKey(record.attemptId))) || undefined : undefined,
    })));
  }

  async put(record: RecoveryRecord): Promise<void> {
    const current = await this.readStored();
    const existingHasSigned = Boolean(current.find((item) => item.attemptId === record.attemptId)?.hasSignedTransaction);
    if (record.signedTransaction) await SecureStore.setItemAsync(signedKey(record.attemptId), record.signedTransaction, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
    else if (record.phase === 'CONFIRMING') await SecureStore.deleteItemAsync(signedKey(record.attemptId));
    const hasSignedTransaction = record.phase === 'CONFIRMING' ? false : Boolean(record.signedTransaction) || existingHasSigned;
    const safe: StoredRecoveryRecord = { ...record, signedTransaction: undefined, hasSignedTransaction };
    const next = [...current.filter((item) => item.attemptId !== record.attemptId), safe];
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  }

  async remove(attemptId: string): Promise<void> {
    const current = await this.readStored();
    await AsyncStorage.setItem(KEY, JSON.stringify(current.filter((item) => item.attemptId !== attemptId)));
    await SecureStore.deleteItemAsync(signedKey(attemptId));
  }

  private async readStored(): Promise<StoredRecoveryRecord[]> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    try { return JSON.parse(raw) as StoredRecoveryRecord[]; } catch { return []; }
  }

  private async migrateLegacy(): Promise<void> {
    if (await AsyncStorage.getItem(KEY)) return;
    const raw = await AsyncStorage.getItem(LEGACY_KEY);
    if (!raw) return;
    try {
      const legacy = JSON.parse(raw) as RecoveryRecord[];
      const safe: StoredRecoveryRecord[] = [];
      for (const record of legacy) {
        if (record.signedTransaction) await SecureStore.setItemAsync(signedKey(record.attemptId), record.signedTransaction, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
        safe.push({ ...record, signedTransaction: undefined, hasSignedTransaction: Boolean(record.signedTransaction) });
      }
      await AsyncStorage.setItem(KEY, JSON.stringify(safe));
      await AsyncStorage.removeItem(LEGACY_KEY);
    } catch {
      await AsyncStorage.removeItem(LEGACY_KEY);
    }
  }
}

export const mobileRecoveryStore = new MobileRecoveryStore();
