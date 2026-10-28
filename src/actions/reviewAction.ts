"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { actionCreator } from "@/actions/action-creator";
import { REVIEW_MESSAGES } from "@/constants/review.constants";
import { Review } from "@/db/models";
import Booking from "@/db/models/Booking.model";
import { connectToDatabase } from "@/db/mongoose";
import { auth } from "@/lib/auth";
import { ReviewInputSchema } from "@/lib/validationSchema/review.schema";

const createReviewSchema = ReviewInputSchema.extend({
  path: z.string().min(1, "Path is required."),
});

export const createReviewAction = actionCreator(createReviewSchema, async ({ path, ...reviewData }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error(REVIEW_MESSAGES.UNAUTHORIZED);
  }

  const { propertyId, bookingId } = reviewData;
  const { id: userId, name: authorName } = session.user;
  const authorAvatar = session.user.image ?? "";
  await connectToDatabase();

  const isEligible = await Booking.exists({
    _id: bookingId,
    propertyId,
    userId,
    status: "confirmed",
  });

  if (!isEligible) {
    throw new Error(REVIEW_MESSAGES.NOT_ELIGIBLE);
  }

  const alreadyReviewed = await Review.exists({ bookingId });
  if (alreadyReviewed) {
    throw new Error(REVIEW_MESSAGES.ALREADY_REVIEWED);
  }

  await Review.create({
    authorId: userId,
    authorName,
    authorAvatar,
    ...reviewData,
  });

  revalidatePath(path);

  return { message: REVIEW_MESSAGES.CREATE_SUCCESS };
});
