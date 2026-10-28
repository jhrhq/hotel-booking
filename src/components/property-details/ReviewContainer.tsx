import Link from "next/link";
import { AUTH_CONFIG } from "@/constants/auth.constants";
import { getReviewsForProperty } from "../../db/queries";
import ReviewModal from "../ReviewModal";
import ReviewBody from "./ReviewBody";

interface ReviewContainerProps {
  bookingId?: string;
  propertyId: string;
  userId?: string;
  isHost: boolean;
}

const ReviewContainer = async ({ userId, bookingId, propertyId, isHost }: ReviewContainerProps) => {
  const reviews = await getReviewsForProperty(propertyId);
  const isCurrentUserReview = reviews.some((review) => review.authorId.toString() === userId);
  const currentPath = AUTH_CONFIG.ROUTES.PROPERTY(propertyId);

  return (
    <>
      <div className=" flex md:justify-end mb-4">
        {!userId ? (
          <Link
            className="px-4 py-2 rounded-lg border-border bg-background text-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 transition-colors"
            href={`${AUTH_CONFIG.ROUTES.SIGN_IN}?callbackUrl=${currentPath}`}
          >
            Write a Review
          </Link>
        ) : !isHost ? (
          <ReviewModal propertyId={propertyId} bookingId={bookingId} isCurrentUserReview={isCurrentUserReview} />
        ) : null}
      </div>

      <ReviewBody reviews={reviews} />
    </>
  );
};

export default ReviewContainer;
