module powerpay::payments {
    use sui::coin::{Self, Coin};
    use sui::event;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    const E_ZERO_AMOUNT: u64 = 1;

    public struct PaymentReceipt has key, store {
        id: UID,
        reference: vector<u8>,
        payer: address,
        recipient: address,
        amount: u64,
        asset_type: vector<u8>,
    }

    public struct PaymentSettled has copy, drop {
        receipt_id: address,
        payer: address,
        recipient: address,
        amount: u64,
    }

    public fun pay<CoinType>(
        payment: Coin<CoinType>,
        recipient: address,
        reference: vector<u8>,
        asset_type: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let amount = coin::value(&payment);
        assert!(amount > 0, E_ZERO_AMOUNT);
        let payer = tx_context::sender(ctx);
        transfer::public_transfer(payment, recipient);

        let receipt = PaymentReceipt {
            id: object::new(ctx),
            reference,
            payer,
            recipient,
            amount,
            asset_type,
        };
        let receipt_id = object::uid_to_inner(&receipt.id);
        event::emit(PaymentSettled { receipt_id, payer, recipient, amount });
        transfer::transfer(receipt, payer);
    }
}
