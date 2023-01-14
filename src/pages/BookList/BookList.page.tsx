import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import BookInfo from '../../components/BookInfo';
import { useGetAllBooksQuery } from '../../redux/bookSlice';

const BookList = (): JSX.Element => {
  const {
    //isLoading,
    //isFetching,
    //isError,
    isSuccess,
    data: bookList,
  } = useGetAllBooksQuery(
    { page: 1 },
    { refetchOnFocus: true, refetchOnReconnect: true }
  );

  console.log(bookList);

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
          <Link to={'/new-book'}>
            <Button paddingX="3rem">Add</Button>
          </Link>
        </Box>
        <Box rounded="md" bg="purple.500" color="white" px="15px" py="15px">
          <Stack spacing={8}>
            {isSuccess &&
              bookList.map((book) => (
                <BookInfo
                  key={book.bookId}
                  title={book.title}
                  author={book.author}
                  bookId={book.bookId}
                />
              ))}
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default BookList;
