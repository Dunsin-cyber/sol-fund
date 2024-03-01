use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::metadata::{
    create_master_edition_v3, create_metadata_accounts_v3, CreateMasterEditionV3,
    CreateMetadataAccountsV3, Metadata,
};
use anchor_spl::token::{mint_to, Mint, MintTo, Token, TokenAccount};
use mpl_token_metadata::types::{Collection, Creator, DataV2};

declare_id!("C6i6SQDkP8nbL3ie1PacW2t3Z62zsrbbJE5YiJR7D9u8");

#[program]
pub mod solfund {
    use super::*;

	pub fn create(ctx: Context<Create>, name: String, id : u8, amount_required : u64, tags : Vec<String>, description: String) -> ProgramResult {
		let compaign =&mut ctx.accounts.campaign;
		compaign.name = name;
		compaign.id = id;
		compaign.amount_required = amount_required;
		compaign.tags = tags;
		compaign.description = description;
		compaign.amount_donated = 0;
		compaign.donation_complete = false;
		compaign.admin = *ctx.accounts.user.key;
		Ok(())
	}

	pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> ProgramResult {
		let campaign = &mut ctx.accounts.campaign;
		let user =  &mut ctx.accounts.user;

		if campaign.admin != *user.key {
			return Err(ProgramError::IncorrectProgramId);
		}

		let rent_balance = Rent::get()?.minimum_balance(campaign.to_account_info().data_len());
		if **campaign.to_account_info().lamports.borrow() - rent_balance < amount {
			return Err(ProgramError::InsufficientFunds);
		}
		**campaign.to_account_info().try_borrow_mut_lamports()? -= amount;
		**user.to_account_info().try_borrow_mut_lamports()? += amount;
		Ok(())
	}

	pub fn donate(ctx: Context<Donate>, amount: u64) -> ProgramResult {
		let instruction = anchor_lang::solana_program::system_instruction::transfer(
			&ctx.accounts.user.key(),
			&ctx.accounts.campaign.key(),
			amount
		);

		let _ = anchor_lang::solana_program::program::invoke(
			&instruction,
			&[
				ctx.accounts.user.to_account_info(),
			  	ctx.accounts.campaign.to_account_info()
			]);

		(&mut ctx.accounts.campaign).amount_donated += amount;
		if ctx.accounts.campaign.amount_required == ctx.accounts.campaign.amount_donated {
			(&mut ctx.accounts.campaign).donation_complete = true;
		}
		Ok(())
	}

	pub fn create_single_nft(
        ctx: Context<CreateNFT>,
        id: u64,
        name: String,
        symbol: String,
        uri: String,
        price: f32,
        cant: u64,
    ) -> Result<()> {
        msg!("Creating seeds");
        let id_bytes = id.to_le_bytes();
        let seeds = &[
            "mint".as_bytes(),
            id_bytes.as_ref(),
            &[*ctx.bumps.get("mint").unwrap()],
        ];

        msg!("Run mint_to");

        mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    authority: ctx.accounts.authority.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                },
                &[&seeds[..]],
            ),
            1, // 1 token
        )?;

        msg!("Run create metadata accounts v3");

        create_metadata_accounts_v3(
            CpiContext::new_with_signer(
                ctx.accounts.metadata_program.to_account_info(),
                CreateMetadataAccountsV3 {
                    payer: ctx.accounts.payer.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    metadata: ctx.accounts.nft_metadata.to_account_info(),
                    mint_authority: ctx.accounts.authority.to_account_info(),
                    update_authority: ctx.accounts.authority.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                },
                &[&seeds[..]],
            ),
            DataV2 {
                name,
                symbol,
                uri,
                seller_fee_basis_points: 0,
                creators: None,
                collection: None,
                uses: None,
            },
            true,
            true,
            None,
        )?;

        msg!("Run create master edition v3");

        create_master_edition_v3(
            CpiContext::new_with_signer(
                ctx.accounts.metadata_program.to_account_info(),
                CreateMasterEditionV3 {
                    edition: ctx.accounts.master_edition_account.to_account_info(),
                    payer: ctx.accounts.payer.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    metadata: ctx.accounts.nft_metadata.to_account_info(),
                    mint_authority: ctx.accounts.authority.to_account_info(),
                    update_authority: ctx.accounts.authority.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                    token_program: ctx.accounts.token_program.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                },
                &[&seeds[..]],
            ),
            Some(1),
        )?;

        msg!("Minted NFT successfully");

        Ok(())
    }
}


#[derive(Accounts)]
pub struct Create<'info> {
	#[account(init, payer=user, space = 9000, seeds=[b"CAMPAIGN_DEMO".as_ref(), user.key().as_ref()], bump)]
	pub campaign: Account<'info, Campaign>,
	#[account(mut)]
	pub user: Signer<'info>,
	pub system_program: Program<'info, System>
}


#[derive(Accounts)]
pub struct Withdraw<'info> {
	#[account(mut)]
	pub campaign: Account<'info, Campaign>,
	#[account(mut)]
	pub user: Signer<'info>
}


#[derive(Accounts)]
pub struct Donate<'info> {
	#[account(mut)]
	pub campaign: Account<'info, Campaign>,
	#[account(mut)]
	pub user: Signer<'info>,
	pub system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct CreateNFT<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account( 
        init,
        payer = payer, 
        mint::decimals = 0,
        mint::authority = authority,
        mint::freeze_authority = authority,
        seeds = ["mint".as_bytes(), id.to_le_bytes().as_ref()], 
        bump,
    )]
    pub mint: Account<'info, Mint>,
    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = payer,
    )]
    pub token_account: Account<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub metadata_program: Program<'info, Metadata>,
    #[account(
        mut,
        seeds = [
            b"metadata".as_ref(),
            metadata_program.key().as_ref(),
            mint.key().as_ref(),
            b"edition".as_ref(),
        ],
        bump,
        seeds::program = metadata_program.key()
    )]
    /// CHECK:
    pub master_edition_account: UncheckedAccount<'info>,
    #[account(
        mut,
        seeds = [
            b"metadata".as_ref(),
            metadata_program.key().as_ref(),
            mint.key().as_ref(),
        ],
        bump,
        seeds::program = metadata_program.key()
    )]
    /// CHECK:
    pub nft_metadata: UncheckedAccount<'info>,
}

// get campaign
// get all campaigns


#[account]
pub struct Campaign {
	pub id : u8,
	pub admin: Pubkey,
	pub name: String,
	pub tags : Vec<String>,
	pub amount_required : u64,
	pub donation_complete : bool,
	pub description: String,
	pub amount_donated: u64,
}
