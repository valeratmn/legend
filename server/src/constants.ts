export const INVALID_REQUEST = {message: "Invalid request"};
export const INVALID_CAMPAIGN_ID = {message: "Invalid campaign ID"};
export const INTERNAL_SERVER_ERROR = {message: "Internal server error"};
export const OK = {message: "Ok"};

export const sortFields = {
    name: "name",
    createdAt: "createdAt",
    giftsCount: "giftsCount",
}

export const sortOrders = {
    asc: "ASC",
    desc: "DESC",
}

export const QUERIES = {
    QUERY_CAMPAIGNS: "SELECT * FROM campaigns WHERE name LIKE ? ORDER BY ??",
    QUERY_INSERT_CAMPAIGN: "INSERT INTO campaigns SET ?",
    QUERY_UPDATE_CAMPAIGN: "UPDATE campaigns SET ? WHERE id = ?",
    QUERY_DELETE_CAMPAIGN: "DELETE FROM campaigns WHERE id = ?",
    QUERY_GIFTS: "SELECT * FROM gifts",
    QUERY_TOTAL_COUNT: "SELECT COUNT(*) AS total FROM campaigns",
}

