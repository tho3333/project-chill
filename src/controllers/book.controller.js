import Book from "../models/book.model.js";
import { ok, created } from "../utils/response.js";

export const listBooks = async (req, res, next) => {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    const data = await Book.find(filter).populate("category", "name").sort({ createdAt: -1 });
    return ok(res, data);
  } catch (e) { next(e); }
};

export const getBook = async (req, res, next) => {
  try {
    const data = await Book.findById(req.params.id).populate("category", "name");
    return ok(res, data);
  } catch (e) { next(e); }
};

export const createBook = async (req, res, next) => {
  try {
    const data = await Book.create(req.body);
    return created(res, data, "Tạo sách thành công");
  } catch (e) { next(e); }
};

export const updateBook = async (req, res, next) => {
  try {
    const data = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return ok(res, data, "Cập nhật sách thành công");
  } catch (e) { next(e); }
};

export const deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    return ok(res, null, "Xoá sách thành công");
  } catch (e) { next(e); }
};
