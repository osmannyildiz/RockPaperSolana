use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{MasterEditionAccount, Metadata, MetadataAccount},
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::{GameState, MatchState};

#[derive(Accounts)]
pub struct SaveMoves<'info> {
    #[account(mut)]
    player: Signer<'info>,

    #[account(
        seeds = [b"game_state"],
        bump = game_state.bump
    )]
    game_state: Account<'info, GameState>,

    #[account(
        seeds = [b"match_state", player.key().as_ref()],
        bump
    )]
    match_state: Account<'info, MatchState>,

    nft_mint: InterfaceAccount<'info, Mint>,

    #[account(
        seeds = [
            b"metadata",
            metadata_program.key().as_ref(),
            nft_mint.key().as_ref(),
        ],
        seeds::program = metadata_program.key(),
        bump,
    )]
    nft_metadata: Account<'info, MetadataAccount>,

    #[account(
        seeds = [
            b"metadata",
            metadata_program.key().as_ref(),
            nft_mint.key().as_ref(),
            b"edition"
        ],
        seeds::program = metadata_program.key(),
        bump,
    )]
    nft_edition: Account<'info, MasterEditionAccount>,

    #[account(
        mut,
        associated_token::mint = nft_mint,
        associated_token::authority = player
    )]
    player_ata_for_nft: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = nft_mint,
        associated_token::authority = game_state
    )]
    vault: InterfaceAccount<'info, TokenAccount>,

    metadata_program: Program<'info, Metadata>,

    associated_token_program: Program<'info, AssociatedToken>,

    token_program: Interface<'info, TokenInterface>,

    system_program: Program<'info, System>,
}

impl<'info> SaveMoves<'info> {
    pub fn save_moves(&mut self, moves: u8) -> Result<()> {
        // TODO Don't allow if player's moves were already set

        self.match_state.progress += 1;
        if self.player.key() == self.match_state.player_a {
            self.match_state.moves_a = Some(moves);
            self.match_state.timestamp_a = Some(Clock::get()?.unix_timestamp);
        } else {
            self.match_state.moves_b = Some(moves);
            self.match_state.timestamp_b = Some(Clock::get()?.unix_timestamp);
        }
        Ok(())
    }
}
