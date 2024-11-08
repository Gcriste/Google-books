import Link from "next/link";
import { Box, Divider, Flex, Text } from "../common";
import { BookType, Review } from "@/app/types";
import { usePathname } from "next/navigation";
import Rating from "./rating";
import ReviewForm from "../review-form";
import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/api";
import { useState } from "react";
type OwnProps = {
  bookId: string;
  reviews?: Review[];
  hasViewAllReviews: boolean;
};

const ReviewContainer = ({ bookId, reviews, hasViewAllReviews,  }: OwnProps) => {
  const { updateBook } = useApi();
  const [reviewList, setReviewList] = useState<Review[]>(
    hasViewAllReviews ? [reviews?.[0] as Review] : reviews || []
  );
  const { mutate: updateBookFromStorage } = useMutation({
    mutationFn: updateBook, // Now returns a Promise<updatedBooks>
    onSuccess: (updatedBooks) => {
      console.log('does this run', {updatedBooks})
      setReviewList(updatedBooks[bookId]?.reviews || []);
    },
  });

  console.log("reviewList", reviewList)
  return (
    <>
      <Flex direction="col" gap="gap-2">
        <Text variant="heading" size="xLarge">
          Reviews
        </Text>
        <Flex direction="col">
          {reviewList && reviewList.length > 0 ? (
            reviewList?.map(
              ({ id, rating, title, lastUpdated, message }, idx) => (
                <Box key={id}>
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
                    </Flex>
                  </Flex>
                </Box>
              )
            )
          ) : (
            <Text>No reviews written yet</Text>
          )}
        </Flex>
      </Flex>
    <ReviewForm updateBookFromStorage={updateBookFromStorage}/>
    </>
  );
};

export default ReviewContainer;
