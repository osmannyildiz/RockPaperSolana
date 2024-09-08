use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct GameState {
    pub pending_match: Option<Pubkey>,
    pub bump: u8,
}
