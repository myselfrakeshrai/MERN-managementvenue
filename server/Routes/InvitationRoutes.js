import express from "express";
import asyncHandler from "express-async-handler";
import Invitation from "./../Models/InvitationModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const invitationRoute = express.Router();

// GET ALL INVITATION
invitationRoute.get(
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
    const count = await Invitation.countDocuments({ ...keyword });
    const invitations = await Invitation.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ invitations, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL INVITATION WITHOUT SEARCH AND PEGINATION
invitationRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const invitations = await Invitation.find({}).sort({ _id: -1 });
    res.json(invitations);
  })
);

// GET SINGLE INVITATION
invitationRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const invitation = await Invitation.findById(req.params.id);
    if (invitation) {
      res.json(invitation);
    } else {
      res.status(404);
      throw new Error("Invitation not Found");
    }
  })
);

// INVITATION REVIEW
invitationRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const invitation = await Invitation.findById(req.params.id);

    if (invitation) {
      const alreadyReviewed = invitation.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Invitation already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      invitation.reviews.push(review);
      invitation.numReviews = invitation.reviews.length;
      invitation.rating =
        invitation.reviews.reduce((acc, item) => item.rating + acc, 0) /
        invitation.reviews.length;

      await invitation.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Invitation not Found");
    }
  })
);

// DELETE INVITATION
invitationRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const invitation = await Invitation.findById(req.params.id);
    if (invitation) {
      await invitation.remove();
      res.json({ message: "Invitation deleted" });
    } else {
      res.status(404);
      throw new Error("Invitation not Found");
    }
  })
);

// CREATE INVITATION
invitationRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const invitationExist = await Invitation.findOne({ name });
    if (invitationExist) {
      res.status(400);
      throw new Error("Invitation name already exist");
    } else {
      const invitation = new Invitation({
        name,
        price,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (invitation) {
        const createdinvitation = await invitation.save();
        res.status(201).json(createdinvitation);
      } else {
        res.status(400);
        throw new Error("Invalid invitation data");
      }
    }
  })
);

// UPDATE INVITATION
invitationRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const invitation = await Invitation.findById(req.params.id);
    if (invitation) {
      invitation.name = name || invitation.name;
      invitation.price = price || invitation.price;
      invitation.description = description || invitation.description;
      invitation.image = image || invitation.image;
      invitation.countInStock = countInStock || invitation.countInStock;

      const updatedInvitation = await invitation.save();
      res.json(updatedInvitation);
    } else {
      res.status(404);
      throw new Error("Invitation not found");
    }
  })
);
export default invitationRoute;
