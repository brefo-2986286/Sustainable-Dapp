#![no_std]
use soroban_sdk::{contractimpl, Address, Env};

pub struct DonationContract;

#[contractimpl]
impl DonationContract {
    pub fn donate(env: Env, from: Address, amount: i128) {
        let key = from.to_string();
        let mut total = env.storage().get::<_, i128>(key.clone()).unwrap_or(0);
        total += amount;
        env.storage().set(key, total);
    }

    pub fn get_total(env: Env, from: Address) -> i128 {
        env.storage().get(from.to_string()).unwrap_or(0)
    }
}
