import axios from "axios";
import { Campaign, QueryParams } from "../types";

const baseUrl = "http://localhost:3000/api";

export const fetchCampaigns = async ({
  page,
  limit,
  sortField,
  sortOrder,
  searchQuery,
}: QueryParams) => {
  try {
    const response = await axios.get(`${baseUrl}/campaigns`, {
      params: { page, limit, sortField, sortOrder, searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении кампаний:", error);
    throw error;
  }
};

export const createCampaign = async (campaignData: Campaign) => {
  try {
    const response = await axios.post(`${baseUrl}/campaigns`, campaignData);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании кампании:", error);
    throw error;
  }
};

export const updateCampaign = async (id: number, campaignData: Campaign) => {
  try {
    const response = await axios.put(
      `${baseUrl}/campaigns/${id}`,
      campaignData
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении кампании:", error);
    throw error;
  }
};

export const deleteCampaign = async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении кампании:", error);
    throw error;
  }
};

export const fetchGifts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/gifts`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении подарков:", error);
    throw error;
  }
};
