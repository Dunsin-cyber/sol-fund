use anchor_lang::prelude::*;

declare_id!("C6i6SQDkP8nbL3ie1PacW2t3Z62zsrbbJE5YiJR7D9u8");

#[program]
pub mod solfund {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
