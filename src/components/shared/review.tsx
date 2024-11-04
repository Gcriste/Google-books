import Link from "next/link";
import { Box, Flex, Text } from "../common";
import { Review } from "@/app/types";
import { usePathname } from "next/navigation";
import Rating from "./rating";
type OwnProps = {
  id: string;
  reviews?: Review[];
};

const Review = ({ id, reviews }: OwnProps) => {
  const pathname = usePathname();
  const { rating, title, message, lastUpdated } = reviews?.[0] || {};
  return (
    <Flex direction="col">
      <Flex align="center" justify="between">
        <Flex align="center">
          <Rating rating={Number(rating ?? "0")} pointerOnHover/>
          <Text variant="heading">{title}</Text>
        </Flex>
        <Text>Last updated: {lastUpdated}</Text>
      </Flex>

      <Flex justify="between">
      <Text>{message}</Text>
        <Link
          href={`/${pathname}/reviews/${id}`}
          className="hover:blue-300 text-primary font-bold"
        >
          View all reviews
        </Link>
      </Flex>
    </Flex>
  );
};

export default Review;
