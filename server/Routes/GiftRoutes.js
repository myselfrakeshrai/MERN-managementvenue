import express from "express";
import asyncHandler from "express-async-handler";
import Gift from "./../Models/GiftModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const giftRoute = express.Router();

// GET ALL GIFT
giftRoute.get(
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
    const count = await Gift.countDocuments({ ...keyword });
    const gifts = await Gift.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ gifts, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL GIFT WITHOUT SEARCH AND PEGINATION
giftRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const gifts = await Gift.find({}).sort({ _id: -1 });
    res.json(gifts);
  })
);

// GET SINGLE GIFT
giftRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const gift = await Gift.findById(req.params.id);
    if (gift) {
      res.json(gift);
    } else {
      res.status(404);
      throw new Error("Gift not Found");
    }
  })
);

// GIFT REVIEW
giftRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const gift = await Gift.findById(req.params.id);

    if (gift) {
      const alreadyReviewed = gift.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Gift already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      gift.reviews.push(review);
      gift.numReviews = gift.reviews.length;
      gift.rating =
        gift.reviews.reduce((acc, item) => item.rating + acc, 0) /
        gift.reviews.length;

      await gift.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Gift not Found");
    }
  })
);

// DELETE GIFT
giftRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const gift = await Gift.findById(req.params.id);
    if (gift) {
      await gift.remove();
      res.json({ message: "Gift deleted" });
    } else {
      res.status(404);
      throw new Error("Gift not Found");
    }
  })
);

// CREATE GIFT
giftRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const giftExist = await Gift.findOne({ name });
    if (giftExist) {
      res.status(400);
      throw new Error("Gift name already exist");
    } else {
      const gift = new Gift({
        name,
        price,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (gift) {
        const createdgift = await gift.save();
        res.status(201).json(createdgift);
      } else {
        res.status(400);
        throw new Error("Invalid gift data");
      }
    }
  })
);

// UPDATE GIFT
giftRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const gift = await Gift.findById(req.params.id);
    if (gift) {
      gift.name = name || gift.name;
      gift.price = price || gift.price;
      gift.description = description || gift.description;
      gift.image = image || gift.image;
      gift.countInStock = countInStock || gift.countInStock;

      const updatedGift = await gift.save();
      res.json(updatedGift);
    } else {
      res.status(404);
      throw new Error("Gift not found");
    }
  })
);
export default giftRoute;
