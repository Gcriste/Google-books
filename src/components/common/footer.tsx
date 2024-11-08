import Box from "./box";
import Flex from "./flex";

const Footer = () => {
  return (
    <Flex direction="col" className="min-h-full">
      <footer className="bg-secondary text-white py-4">
        <Box className="max-w-screen-xl mx-auto text-center">
          <Box>&copy; Griffin</Box>
          <Box className="mt-2 text-sm">All rights reserved</Box>
        </Box>
      </footer>
    </Flex>
  );
};

export default Footer;