import express from "express";
import User from "./Models/UserModel.js";
import users from "./data/users.js";
import Product from "./Models/ProductModel.js";
import products from "./data/Products.js";
import asyncHandler from "express-async-handler";
import Invitation from "./Models/InvitationModel.js";
import invitations from "./data/Invitations.js";
import Vendor from "./Models/VendorModel.js";
import invitations from "./data/Vendor.js";
import Gift from "./Models/GiftModel.js";
import Gift from "./Models/Gift.js";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
  })
);

ImportData.post(
  "/invitations",
  asyncHandler(async (req, res) => {
    await Invitation.remove({});
    const importInvitations = await Invitation.insertMany(invitations);
    res.send({ importInvitations });
  })
);

ImportData.post(
  "/vendors",
  asyncHandler(async (req, res) => {
    await Vendor.remove({});
    const importVendor = await Vendor.insertMany(vendors);
    res.send({ importVendor });
  })
);

ImportData.post(
  "/vendors",
  asyncHandler(async (req, res) => {
    await Vendor.remove({});
    const importGift = await Vendor.insertMany(invitations);
    res.send({ importGift });
  })
);

export default ImportData;
