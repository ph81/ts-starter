import { Link } from 'react-router-dom';
import { Button, Flex, Box, Text } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      as="nav"
      p={4}
      mx="auto"
      maxWidth="1150px"
      marginBottom="10px"
    >
      <Box>
        <Link to="/">
          <Button
            fontWeight={['medium', 'medium', 'medium']}
            fontSize={['xs', 'sm', 'lg', 'xl']}
            variant="ghost"
            _hover={{ bg: 'rgba(0,0,0,.2)' }}
            padding="1"
            color="white"
            letterSpacing="0.65px"
          >
            <Text fontSize={['xl', '2xl', '2xl', '2xl']} mr={2}>
              🗄️
            </Text>
            User Directory
          </Button>
        </Link>
      </Box>

      <Box>
        <Link to="/">
          <Button
            fontWeight={['medium', 'medium', 'medium']}
            fontSize={['xs', 'sm', 'lg', 'xl']}
            variant="ghost"
            _hover={{ bg: 'rgba(0,0,0,.2)' }}
            p={[1, 4]}
            color="white"
          >
            Users
          </Button>
        </Link>
        <Link to="/new-user">
          <Button
            fontWeight={['medium', 'medium', 'medium']}
            fontSize={['xs', 'sm', 'lg', 'xl']}
            variant="ghost"
            _hover={{ bg: 'rgba(0,0,0,.2)' }}
            p={[1, 4]}
            color="white"
          >
            Add User
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
