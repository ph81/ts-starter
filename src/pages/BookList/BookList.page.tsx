import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import BookInfo from '../../components/BookInfo';
import { fetchBooks } from '../../redux/bookSlice';
import { useEffect } from 'react';

const BookList = () => {
  const bookList = useAppSelector((state) => state.book.bookList);
  const dispatch = useAppDispatch();
  console.log(bookList);

  useEffect(() => {
    if (bookList.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch]);

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      paddingTop="10px"
    >
      <Box width="50%">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="10px"
        >
          <Heading color="white">Book List</Heading>
          <Link to="/new-book">
            <Button paddingX="3rem">Add</Button>
          </Link>
        </Box>
        <Box rounded="md" bg="purple.500" color="white" px="15px" py="15px">
          <Stack spacing={8}>
            {bookList.map((book) => (
              <BookInfo
                key={book.id}
                title={book.title}
                author={book.author}
                id={book.id}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default BookList;
