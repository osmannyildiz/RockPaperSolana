use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{MasterEditionAccount, Metadata, MetadataAccount},
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::{GameState, MatchState};

#[derive(Accounts)]
pub struct RequestMatch<'info> {
    #[account(mut)]
    player: Signer<'info>,

    #[account(
        seeds = [b"game_state"],
        bump = game_state.bump
    )]
    game_state: Account<'info, GameState>,

    #[account(
        init_if_needed,
        payer = player,
        space = 8 + MatchState::INIT_SPACE,
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

impl<'info> RequestMatch<'info> {
    pub fn request_match(&mut self, bumps: &RequestMatchBumps) -> Result<()> {
        // TODO require

        if self.match_state.progress == 0 {
            msg!("🐸 hey progress 0");
            self.match_state.set_inner(MatchState {
                progress: 1,
                player_a: self.player.key(),
                player_b: None,
                nft_mint_a: self.nft_mint.key(),
                nft_mint_b: None,
                vault_a: self.vault.key(),
                vault_b: None,
                moves_a: None,
                moves_b: None,
                timestamp_a: None,
                timestamp_b: None,
                bump: bumps.match_state,
            });
        } else if self.match_state.progress == 1 {
            msg!("🐸 hey progress 1");
            self.match_state.progress = 2;
            self.match_state.player_b = Some(self.player.key());
            self.match_state.nft_mint_b = Some(self.nft_mint.key());
            self.match_state.vault_b = Some(self.vault.key());
        }
        Ok(())
    }
}
