import { Box, Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useCreateBookMutation } from '../../redux/bookSlice';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CreateItem = (): JSX.Element => {
  const navigate = useHistory();

  const [title, setTitle] = useState<string | undefined>('');
  const [author, setAuthor] = useState<string | undefined>('');

  const [createBook, { isLoading, isError, isSuccess }] =
    useCreateBookMutation();

  const handleOnSubmit = () => {
    const data = {
      bookId: uuidv4(),
      author,
      title,
    };
    createBook(data);
    clearInputs();
    navigate.push('/');
  };

  const clearInputs = () => {
    setTitle('');
    setAuthor('');
  };

  const loading = isLoading;
  if (loading) return <h3>loading...</h3>;
  if (isError) return <h3>error!</h3>;
  if (isSuccess) return <h3>success!</h3>;

  return (
    <>
      <Flex
        height="100vh"
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
            <Heading color="white">Add Book</Heading>
          </Box>
          <FormLabel color="white">Title</FormLabel>
          <Input
            value={title}
            color="white"
            placeholder="The Lord of the Rings"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <FormLabel color="white" marginTop={4}>
            Author
          </FormLabel>
          <Input
            value={author}
            color="white"
            placeholder="J.R.R Tolkien"
            onChange={(e) => setAuthor(e.currentTarget.value)}
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
