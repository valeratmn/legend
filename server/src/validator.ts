import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const createCampaignValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .notEmpty()
    .withMessage("Description is required"),
  body("giftsCount")
    .isInt()
    .withMessage("Gifts count must be an integer")
    .notEmpty()
    .withMessage("Gift count is required"),
  body("daysToTakeGift")
    .isInt()
    .withMessage("Day to take must be an integer")
    .notEmpty()
    .withMessage("Day to take is required"),
  body("daysToReceiveGift")
    .isInt()
    .withMessage("Day to receive must be an integer")
    .notEmpty()
    .withMessage("Day to receive is required"),
  body("cardNumbers")
    .notEmpty()
    .withMessage("Card numbers are required"),
  body("giftId").isInt().notEmpty().withMessage("Gift id is required"),
];

const allowedFields = [
  "name",
  "description",
  "giftsCount",
  "daysToTakeGift",
  "daysToReceiveGift",
  "cardNumbers",
  "giftId",
  "id",
];

export const updateCampaignValidator = [
  body().custom((body) => {
    const keys = Object.keys(body);
    const invalidKeys = keys.filter((key) => !allowedFields.includes(key));
    if (invalidKeys.length > 0) {
      throw new Error(`Invalid fields provided: ${invalidKeys.join(", ")}`);
    }
    return true;
  }),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("giftCount")
    .optional()
    .isInt()
    .withMessage("Gift count must be an integer"),
  body("dayToTake")
    .optional()
    .isInt()
    .withMessage("Day to take must be an integer"),
  body("dayToReceive")
    .optional()
    .isInt()
    .withMessage("Day to receive must be an integer"),
  body("cardNumbers")
    .optional(),
];

export const validateUpdateCampaign = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
