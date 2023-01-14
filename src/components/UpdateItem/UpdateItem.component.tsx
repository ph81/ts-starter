import { Box, Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';
import {
  useGetAllBooksQuery,
  useUpdateBookMutation,
} from '../../redux/bookSlice';
import { useHistory, useParams } from 'react-router-dom';

const UpdateItem = (): JSX.Element => {
  const navigate = useHistory();
  const { bookId } = useParams<{ bookId: string }>();

  const { data: booklist, isLoading } = useGetAllBooksQuery(
    { page: 1 },
    { refetchOnFocus: true, refetchOnReconnect: true }
  );

  const itemToEdit = booklist?.find((book) => book.bookId === bookId);
  const [title, setTitle] = useState<string | undefined>(itemToEdit?.title);
  const [author, setAuthor] = useState<string | undefined>(itemToEdit?.author);
  console.log(itemToEdit);
  console.log(isLoading ? 'data:' : booklist);

  const [updateBook] = useUpdateBookMutation();

  const handleOnSubmit = () => {
    const book = {
      title,
      author,
    };
    updateBook({ bookId, book });
    clearInputs();
    navigate.push('/', { replace: true });
  };

  const clearInputs = () => {
    setTitle('');
    setAuthor('');
  };

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
            <Heading color="white">Update Book</Heading>
          </Box>
          <FormLabel color="white">Title</FormLabel>
          <Input
            value={title}
            color="white"
            //placeholder="The Lord of the Rings"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <FormLabel color="white" marginTop={4}>
            Author
          </FormLabel>
          <Input
            value={author}
            color="white"
            //placeholder="J.R.R Tolkien"
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

export default UpdateItem;
