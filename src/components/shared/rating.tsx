import { FieldErrors, useForm } from "react-hook-form";
import { Button, Flex } from "../common";
import { FormValues } from "@/app/types";

type OwnProps = {
  rating: number;
  handleRatingClick?: (selectedRating: number) => void;
  pointerOnHover?: boolean;
};

const Rating = ({ rating, handleRatingClick, pointerOnHover }: OwnProps) => {
  return (
    <Flex align="center" gap="gap-1">
      {[1, 2, 3, 4, 5].map((num) => (
        <Button
          key={num}
          variant="ghost"
          size="none"
          pointerOnHover={pointerOnHover}
          className={`text-2xl ${
            num <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleRatingClick?.(num)}
        >
          ★
        </Button>
      ))}
    </Flex>
  );
};

export default Rating;
