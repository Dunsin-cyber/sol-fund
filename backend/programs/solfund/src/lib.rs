use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

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
}

#[derive(Accounts)]
pub struct Create<'info> {
	#[account(init, payer=user, space = 9000, seeds=[b"COMPAIGN_DEMO".as_ref(), user.key().as_ref()], bump)]
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
