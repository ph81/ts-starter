import { useState } from 'react';
import { useCreateUserMutation } from '../../redux/userSlice';
import { useHistory } from 'react-router-dom';
import Error from '../Error';
import Loading from '../Loading';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';

const CreateItem = (): JSX.Element => {
  const navigate = useHistory();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [avatar, setAvatar] = useState<string | undefined>('');
  const [createUser, { isLoading, isError }] = useCreateUserMutation();

  const handleOnSubmit = () => {
    const data = {
      userId: uuidv4(),
      name,
      email,
      avatar,
    };
    createUser(data);
    clearInputs();
    navigate.push('/');
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
    setAvatar('');
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

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
            placeholder="Sarah Manning"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <FormLabel color="white" marginTop={4}>
            Email
          </FormLabel>
          <Input
            value={email}
            color="white"
            placeholder="sarah.manning@ob.org"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <FormLabel color="white" marginTop={4}>
            Avatar
          </FormLabel>
          <Input
            value={avatar}
            color="white"
            placeholder="image url"
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

export default CreateItem;
