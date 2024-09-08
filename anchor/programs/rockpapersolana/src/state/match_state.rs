use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct MatchState {
    pub progress: u8,
    pub player_a: Pubkey,
    pub player_b: Option<Pubkey>,
    pub nft_mint_a: Pubkey,
    pub nft_mint_b: Option<Pubkey>,
    pub vault_a: Pubkey,
    pub vault_b: Option<Pubkey>,
    pub moves_a: Option<u8>,
    pub moves_b: Option<u8>,
    pub timestamp_a: Option<i64>,
    pub timestamp_b: Option<i64>,
    pub bump: u8,
}
