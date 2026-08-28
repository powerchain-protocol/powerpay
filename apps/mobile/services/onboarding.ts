import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@powerpay/onboarding/v1';

export async function hasCompletedOnboarding(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEY)) === 'complete';
}

export async function completeOnboarding(): Promise<void> {
  await AsyncStorage.setItem(KEY, 'complete');
}

export async function resetOnboarding(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
