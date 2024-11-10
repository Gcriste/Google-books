import { Box, Flex } from "../common";

type OwnProps = {
  isDetails?: boolean;
};

const BookSkeleton = ({ isDetails }: OwnProps) => {
  return (
    <Box className="animate-pulse space-y-4">
      <Flex justify="between" align="start" gap="gap-4">
        <div className="bg-gray-300 w-32 h-48 rounded-md" />

        <Box className="space-y-4">
          <div className="bg-gray-300 w-32 h-8 rounded-md" />
        </Box>
      </Flex>

      <Flex direction="col" gap="gap-2">
        <div className="bg-gray-300 w-3/4 h-6 rounded-md" />
        <div className="bg-gray-300 w-1/2 h-4 rounded-md" />

        <div className="bg-gray-300 w-2/3 h-4 rounded-md" />

        <div className="bg-gray-300 w-full h-12 rounded-md" />
      </Flex>

      {isDetails && (
        <Flex direction="col" gap="gap-2">
          <div className="bg-gray-300 w-32 h-4 rounded-md" />
          <div className="bg-gray-300 w-24 h-4 rounded-md" />
        </Flex>
      )}
    </Box>
  );
};

export default BookSkeleton;
