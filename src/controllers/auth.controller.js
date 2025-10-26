import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ok, created } from "../utils/response.js";

const sign = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw { status: 400, message: "Thiếu trường bắt buộc" };
    const existed = await User.findOne({ email });
    if (existed) throw { status: 400, message: "Email đã tồn tại" };
    const user = await User.create({ name, email, password });
    return created(res, { id: user._id, email: user.email }, "Đăng ký thành công");
  } catch (e) { next(e); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      throw { status: 400, message: "Sai email hoặc mật khẩu" };
    const token = sign(user);
    return ok(res, { token, user: { id: user._id, name: user.name, role: user.role } }, "Đăng nhập thành công");
  } catch (e) { next(e); }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return ok(res, user);
  } catch (e) { next(e); }
};
