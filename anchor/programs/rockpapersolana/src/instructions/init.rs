use anchor_lang::prelude::*;

use crate::GameState;

#[derive(Accounts)]
pub struct Init<'info> {
    #[account(mut)]
    admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        space = 8 + GameState::INIT_SPACE,
        seeds = [b"game_state"],
        bump
    )]
    game_state: Account<'info, GameState>,

    system_program: Program<'info, System>,
}

impl<'info> Init<'info> {
    pub fn init(&mut self, bumps: &InitBumps) -> Result<()> {
        self.game_state.set_inner(GameState {
            pending_match: None,
            bump: bumps.game_state,
        });
        Ok(())
    }
}
