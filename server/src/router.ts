import { Router } from 'express';
import { getCampaigns, createCampaign, updateCampaign, deleteCampaign, getGifts } from './controller';
import { createCampaignValidator, updateCampaignValidator, validateUpdateCampaign } from './validator';

const router = Router();

router.get('/campaigns', getCampaigns);
router.post('/campaigns', createCampaignValidator, createCampaign);
router.put('/campaigns/:id', updateCampaignValidator, validateUpdateCampaign, updateCampaign);
router.delete('/campaigns/:id', deleteCampaign);
router.get('/gifts', getGifts);

export default router;

