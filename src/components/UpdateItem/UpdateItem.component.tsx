import { useState } from 'react';
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../redux/userSlice';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../Loading';
import Error from '../Error';
import { Box, Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';

const UpdateItem = (): JSX.Element => {
  const navigate = useHistory();
  const { userId } = useParams<{ userId: string }>();

  const { data: users, isFetching } = useGetAllUsersQuery(
    { page: 1 },
    { refetchOnFocus: true, refetchOnReconnect: true }
  );

  const itemToEdit = users?.find((user) => user.userId === userId);
  const [name, setName] = useState<string | undefined>(itemToEdit?.name);
  const [email, setEmail] = useState<string | undefined>(itemToEdit?.email);
  const [avatar, setAvatar] = useState<string | undefined>(itemToEdit?.avatar);
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();
  const loading = isFetching || isLoading;

  const handleOnSubmit = () => {
    const user = {
      name,
      email,
      avatar,
    };
    updateUser({ userId, user });
    clearInputs();
    navigate.push('/');
  };

  if (loading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const clearInputs = () => {
    setName('');
    setEmail('');
    setAvatar('');
  };

  return (
    <>
      <Flex
        height="50vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box width="50%">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            marginBottom="20px"
          >
            <Heading color="white">Add User</Heading>
          </Box>
          <FormLabel color="white">Name</FormLabel>
          <Input
            value={name}
            color="white"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <FormLabel color="white" marginTop={4}>
            Email
          </FormLabel>
          <Input
            value={email}
            color="white"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <FormLabel color="white" marginTop={4}>
            Avatar
          </FormLabel>
          <Input
            value={avatar}
            color="white"
            onChange={(e) => setAvatar(e.currentTarget.value)}
          />
          <Button
            marginTop={4}
            colorScheme="teal"
            type="submit"
            onClick={handleOnSubmit}
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default UpdateItem;
