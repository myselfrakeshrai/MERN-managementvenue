import express from "express";
import asyncHandler from "express-async-handler";
import Vendor from "./../Models/VendorModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const vendorRoute = express.Router();

// GET ALL VENDOR
vendorRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Vendor.countDocuments({ ...keyword });
    const vendors = await Vendor.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ vendors, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL VENDOR WITHOUT SEARCH AND PEGINATION
vendorRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const vendors = await Vendor.find({}).sort({ _id: -1 });
    res.json(vendors);
  })
);

// GET SINGLE VENDOR
vendorRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    if (vendor) {
      res.json(vendor);
    } else {
      res.status(404);
      throw new Error("Vendor not Found");
    }
  })
);

// VENDOR REVIEW
vendorRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const vendor = await Vendor.findById(req.params.id);

    if (vendor) {
      const alreadyReviewed = vendor.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Vendor already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      vendor.reviews.push(review);
      vendor.numReviews = vendor.reviews.length;
      vendor.rating =
        vendor.reviews.reduce((acc, item) => item.rating + acc, 0) /
        vendor.reviews.length;

      await vendor.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Vendor not Found");
    }
  })
);

// DELETE VENDOR
vendorRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    if (vendor) {
      await vendor.remove();
      res.json({ message: "Vendor deleted" });
    } else {
      res.status(404);
      throw new Error("Vendor not Found");
    }
  })
);

// CREATE VENDOR
vendorRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const vendorExist = await Vendor.findOne({ name });
    if (vendorExist) {
      res.status(400);
      throw new Error("Vendor name already exist");
    } else {
      const vendor = new Vendor({
        name,
        price,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (vendor) {
        const createdvendor = await vendor.save();
        res.status(201).json(createdvendor);
      } else {
        res.status(400);
        throw new Error("Invalid vendor data");
      }
    }
  })
);

// UPDATE VENDOR
vendorRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const vendor = await Vendor.findById(req.params.id);
    if (vendor) {
      vendor.name = name || vendor.name;
      vendor.price = price || vendor.price;
      vendor.description = description || vendor.description;
      vendor.image = image || vendor.image;
      vendor.countInStock = countInStock || vendor.countInStock;

      const updatedVendor = await vendor.save();
      res.json(updatedVendor);
    } else {
      res.status(404);
      throw new Error("Vendor not found");
    }
  })
);
export default vendorRoute;
