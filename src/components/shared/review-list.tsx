import Link from "next/link";
import { Box, Divider, Flex, Text } from "../common";
import { Review } from "@/app/types";
import { usePathname } from "next/navigation";
import Rating from "./rating";
type OwnProps = {
  bookId: string
  reviews?: Review[];
  hasViewAllReviews: boolean;

};

const ReviewList = ({ bookId, reviews, hasViewAllReviews }: OwnProps) => {
  const pathname = usePathname();

  const reviewList = hasViewAllReviews ? reviews : [reviews?.[0] as Review];
  return reviewList?.map(({ id, rating, title, lastUpdated, message }, idx) => (
    <Box key={id} >
      {/* {idx !== 0 && reviewList.length > 1 ? <Divider /> : null} */}
      <Flex direction="col">
        <Flex align="center" justify="between">
          <Flex align="center">
            <Rating rating={Number(rating ?? "0")} pointerOnHover />
            <Text variant="heading">{title}</Text>
          </Flex>
          <Text>Last updated: {lastUpdated}</Text>
        </Flex>

        <Flex justify="between">
          <Text>{message}</Text>
          {hasViewAllReviews && idx === reviewList.length -1 && (
            <Link
              href={`${pathname.replace('/detail.*/', '')}/reviews/${bookId}`}
              className="hover:blue-300 text-primary font-bold"
            >
              View all reviews
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  ));
};

export default ReviewList;
