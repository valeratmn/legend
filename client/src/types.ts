export interface CampaignData {
  name: string;
  giftsCount: number;
  daysToTakeGift: number;
  daysToReceiveGift: number;
  description: string;
  cardNumbers: string;
  createdAt?: Date;
  giftId: number;
}

export interface Campaign extends CampaignData {
  id: number;
}

export interface Gift {
  name: string;
  balance: number;
  dateUntil: Date;
  nominal: number;
  id: number;
}

export interface QueryParams {
  page: number;
  limit: number;
  sortField: string;
  sortOrder: string;
  searchQuery: string;
}

export interface CampaignFormValues {
  id?: number;
  name: string;
  description: string;
  giftsCount: number;
  daysToTakeGift: number;
  daysToReceiveGift: number;
  cardNumbers: string;
  giftId: number | null;
}