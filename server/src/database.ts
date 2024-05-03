import mysql from "mysql2";
import { Campaign, CampaignData, Gift, QueryParams } from "./types";
import { OK, QUERIES, sortFields, sortOrders } from "./constants";
import { connection as database } from "./index";

export const getCampaignsFromDB = async ({
  page,
  limit,
  sortField,
  sortOrder,
  searchQuery,
}: QueryParams): Promise<Campaign[]> => {
  const offset = (page - 1) * limit;
  try {
    return new Promise((resolve, reject) => {
      let query = `${QUERIES.QUERY_CAMPAIGNS} ${
        sortOrders[sortOrder as keyof typeof sortOrders]
      } LIMIT ? OFFSET ?`;
      const queryParams = [
        `%${searchQuery}%`,
        sortFields[sortField as keyof typeof sortFields],
        limit,
        offset,
      ];
      database.query(query, queryParams, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results as Campaign[]);
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching campaigns");
  }
};

export const insertCampaignIntoDB = async (
  campaignData: CampaignData
): Promise<{ id: number; message: string }> => {
  try {
    return new Promise((resolve, reject) => {
      database.query(
        QUERIES.QUERY_INSERT_CAMPAIGN,
        campaignData,
        (error, results) => {
          if (error) {
            return reject(error);
          }
          const header = results as mysql.ResultSetHeader;
          resolve({ id: header.insertId, ...OK });
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error inserting campaign");
  }
};

export const updateCampaignInDB = async (
  id: number,
  campaignData: CampaignData
): Promise<{ message: string }> => {
  try {
    return new Promise((resolve, reject) => {
      database.query(
        QUERIES.QUERY_UPDATE_CAMPAIGN,
        [campaignData, id],
        (error) => {
          if (error) {
            return reject(error);
          }
          resolve(OK);
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error updating campaign");
  }
};

export const deleteCampaignFromDB = async (
  id: number
): Promise<{ message: string }> => {
  try {
    return new Promise((resolve, reject) => {
      database.query(QUERIES.QUERY_DELETE_CAMPAIGN, id, (error) => {
        if (error) {
          return reject(error);
        }
        resolve(OK);
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting campaign");
  }
};

export const getGiftsFromDB = async (): Promise<Gift[]> => {
  try {
    return new Promise((resolve, reject) => {
      database.query(QUERIES.QUERY_GIFTS, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results as Gift[]);
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching gifts");
  }
};

export const countCampaignsFromDB = async (): Promise<number> => {
  try {
    return new Promise((resolve, reject) => {
      database.query(
        QUERIES.QUERY_TOTAL_COUNT,
        (error, results: mysql.RowDataPacket[]) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0].total);
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error counting campaigns");
  }
};
