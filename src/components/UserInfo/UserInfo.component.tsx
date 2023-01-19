import { useDeleteUserMutation } from '../../redux/userSlice';
import { useHistory } from 'react-router-dom';
import Error from '../Error';
import Loading from '../Loading';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Text, Avatar } from '@chakra-ui/react';

const UserInfo = ({
  userId,
  name,
  email,
  avatar,
  ...rest
}: {
  name: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  userId: string;
}) => {
  const [deleteUser, { isLoading, isError }] = useDeleteUserMutation();
  const history = useHistory();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const onDeleteHandler = (user_id: string) => {
    if (window.confirm('Are you sure')) {
      deleteUser(user_id);
    }
  };

  const redirect = (user_id: string) => {
    history.push(`/update-user/${user_id}`);
  };

  return (
    <Box
      p={5}
      justifyContent="space-between"
      display="flex"
      shadow="md"
      borderWidth="1px"
      {...rest}
    >
      <Box display="flex" flexDirection="column">
        <Avatar src={avatar} />
        <Heading fontSize="xl">{name}</Heading>
        <Text mt={4}>{email}</Text>
      </Box>
      <Box>
        <IconButton
          color="#1a202c"
          aria-label=""
          icon={<DeleteIcon />}
          marginRight="1rem"
          onClick={() => onDeleteHandler(userId)}
        />
        <IconButton
          color="#1a202c"
          aria-label=""
          icon={<EditIcon />}
          onClick={() => redirect(userId)}
        />
      </Box>
    </Box>
  );
};

export default UserInfo;
