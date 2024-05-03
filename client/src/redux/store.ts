import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { campaignReducer, giftReducer } from "./slices";

const rootReducer = combineReducers({
    campaign: campaignReducer,
    gift: giftReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
