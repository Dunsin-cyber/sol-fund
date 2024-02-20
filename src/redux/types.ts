export type RecipientT = {
  name: string;
  publicKey: any;
  amountDonated: number;
  amountRequired: number;
  description: string;
  donationComplete: boolean;
};

export type CampaignT = {
  pubKey: string;
  name: string;
  amountDonated: number;
  amountRequired: number;
  description: string;
  donationComplete: boolean;
  id: number;
};
