use soroban_sdk::{contracttype, Address};

pub(crate) const DAY_IN_LEDGERS: u32 = 17280;
pub(crate) const INSTANCE_PUMP_AMOUNT: u32 = 7 * DAY_IN_LEDGERS;
pub(crate) const INSTANCE_LIFETIME_THRESHOLD: u32 = INSTANCE_PUMP_AMOUNT - DAY_IN_LEDGERS;

pub(crate) const BALANCE_PUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;
pub(crate) const BALANCE_LIFETIME_THRESHOLD: u32 = BALANCE_PUMP_AMOUNT - DAY_IN_LEDGERS;

#[derive(Clone)]
#[contracttype]
pub struct AllowanceDataKey {
  pub from: Address,
  pub spender: Address,
}

#[contracttype]
pub struct AllowanceValue {
  pub amount: i128,
  pub expiration_ledger: u32,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
  Allowance(AllowanceDataKey),
  Balance(Address),
  Nonce(Address),
  State(Address),
  Admin,
}