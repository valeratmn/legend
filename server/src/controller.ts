import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  getCampaignsFromDB,
  insertCampaignIntoDB,
  updateCampaignInDB,
  deleteCampaignFromDB,
  getGiftsFromDB,
  countCampaignsFromDB,
} from "./database";
import { INTERNAL_SERVER_ERROR, INVALID_CAMPAIGN_ID, OK } from "./constants";
export const getCampaigns = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortField = req.query.sortField as string || 'name';
  const sortOrder = req.query.sortOrder as string || 'asc';
  const searchQuery = req.query.searchQuery as string || '';
  try {
    const total = await countCampaignsFromDB();
    const campaigns = await getCampaignsFromDB({ page, limit, sortField, sortOrder, searchQuery });
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({ total, campaigns });
  } catch (error) {
    console.error(error);
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newCampaign = await insertCampaignIntoDB(req.body);
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  const campaignId = parseInt(req.params.id, 10);
  if (isNaN(campaignId)) {
    return res.status(400).send(INVALID_CAMPAIGN_ID);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedCampaign = await updateCampaignInDB(campaignId, req.body);
    res.json(updatedCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  const campaignId = parseInt(req.params.id, 10);
  if (isNaN(campaignId)) {
    res.status(400).json(INVALID_CAMPAIGN_ID);
    return;
  }
  try {
    await deleteCampaignFromDB(campaignId);
    res.status(200).json(OK);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getGifts = async (req: Request, res: Response) => {
  try {
    const gifts = await getGiftsFromDB();
    res.json(gifts);
  } catch (error) {
    console.error(error);
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

