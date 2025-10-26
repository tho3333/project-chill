import { ok } from "../utils/response.js";

export const listMyOrders = async (req, res, next) => {
  try {
    // TODO: sẽ triển khai sau
    return ok(res, []);
  } catch (e) { next(e); }
};
