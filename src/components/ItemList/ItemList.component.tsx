import { Link } from 'react-router-dom';
import UserInfo from '../../components/UserInfo';
import Error from '../Error';
import Loading from '../Loading';
import { useGetAllUsersQuery } from '../../redux/userSlice';
import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';

const ItemList = (): JSX.Element => {
  const {
    isLoading,
    isError,
    isSuccess,
    data: userList,
  } = useGetAllUsersQuery(
    { page: 1 },
    { refetchOnFocus: true, refetchOnReconnect: true }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      paddingTop="10px"
      paddingBottom="30px"
    >
      <Box width="50%">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="10px"
        >
          <Heading color="white">Users</Heading>
          <Link to={'/new-user'}>
            <Button paddingX="3rem">Add</Button>
          </Link>
        </Box>
        <Box rounded="md" bg="purple.500" color="white" px="15px" py="15px">
          <Stack spacing={8}>
            {isSuccess &&
              userList.map((user) => (
                <UserInfo
                  key={user.userId}
                  userId={user.userId}
                  name={user.name}
                  email={user.email}
                  avatar={user.avatar}
                />
              ))}
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default ItemList;
