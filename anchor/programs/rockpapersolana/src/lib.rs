pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("47jiKP91AgzgQdZXrDD7R8HBEpjngAiUaCmM5uMo1ef8");

#[program]
pub mod rockpapersolana {
    use super::*;

    pub fn init(ctx: Context<Init>) -> Result<()> {
        ctx.accounts.init(&ctx.bumps)
    }

    pub fn request_match(ctx: Context<RequestMatch>) -> Result<()> {
        ctx.accounts.request_match(&ctx.bumps)
    }

    pub fn save_moves(ctx: Context<SaveMoves>, moves: u8) -> Result<()> {
        ctx.accounts.save_moves(moves)
    }
}
