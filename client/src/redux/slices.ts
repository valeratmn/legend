import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Campaign, Gift } from "../types";

interface IInitialState {
  campaigns: Campaign[] | [];
  total: number;
  selectedCampaign: Campaign | null;
}

const campaignState: IInitialState = {
  campaigns: [],
  total: 0,
  selectedCampaign: null,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState: campaignState,
  reducers: {
    setCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    deleteCampaign: (state, action) => {
      state.campaigns = state.campaigns.filter(
        (campaign) => campaign.id !== action.payload
      );
    },
    selectCampaign: (state, action) => {
      state.selectedCampaign = action.payload;
    },
    addCampaign: (state, action: PayloadAction<Campaign>) => {
      state.campaigns = [...state.campaigns, {...action.payload, createdAt: new Date()}];
    },
    updateCampaign: (state, action: PayloadAction<Campaign>) => {
      state.campaigns = state.campaigns.map((campaign) =>
        campaign.id === action.payload.id ? action.payload : campaign
      );
    },
  },
});

export const {
  setCampaigns,
  setTotal,
  deleteCampaign,
  selectCampaign,
  addCampaign,
  updateCampaign,
} = campaignSlice.actions;

export const campaignReducer = campaignSlice.reducer;




interface GiftsState {
  gifts: Gift[];
  loading: boolean;
}

const giftState: GiftsState = {
  gifts: [],
  loading: false,
};

const giftsSlice = createSlice({
  name: 'gifts',
  initialState: giftState,
  reducers: {
    setGifts(state, action: PayloadAction<Gift[]>) {
      state.gifts = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setGifts, setLoading } = giftsSlice.actions;
export const giftReducer = giftsSlice.reducer;

