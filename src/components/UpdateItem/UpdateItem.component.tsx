import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../redux/userSlice';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import validationSchema from '../../utils/validationSchema';
import Loading from '../Loading';
import Error from '../Error';
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Alert,
  AlertTitle,
} from '@chakra-ui/react';

interface EditValues {
  name: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
}

const UpdateItem = (): JSX.Element => {
  const navigate = useHistory();
  const { userId } = useParams<{ userId: string }>();

  const { data: users, isFetching } = useGetAllUsersQuery(
    { page: 1 },
    { refetchOnFocus: true, refetchOnReconnect: true }
  );

  const itemToEdit = users?.find((user) => user.userId === userId);
  const initialValues: EditValues = {
    name: itemToEdit?.name,
    email: itemToEdit?.email,
    avatar: itemToEdit?.avatar,
  };
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();
  const loading = isFetching || isLoading;

  const onSubmit = (values: EditValues) => {
    const user = {
      name: values.name,
      email: values.email,
      avatar: values.avatar,
    };
    //alert(JSON.stringify(user, null, 2));
    updateUser({ userId, user });
    navigate.push('/');
  };

  if (loading) {
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
            <Heading color="white">Edit User</Heading>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => {
              const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                isValid,
              } = formik;
              return (
                <Form onSubmit={handleSubmit}>
                  <FormLabel color="white">Name</FormLabel>
                  <Input
                    id="name"
                    value={values.name}
                    color="white"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <Alert status="error" mt={4}>
                      <AlertTitle>{errors.name}</AlertTitle>
                    </Alert>
                  )}
                  <FormLabel color="white" marginTop={4}>
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    value={values.email}
                    color="white"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <Alert status="error" mt={4}>
                      <AlertTitle>{errors.email}</AlertTitle>
                    </Alert>
                  )}
                  <FormLabel color="white" marginTop={4}>
                    Avatar
                  </FormLabel>
                  <Input
                    id="avatar"
                    value={values.avatar}
                    color="white"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.avatar && touched.avatar && (
                    <Alert status="error" mt={4}>
                      <AlertTitle>{errors.avatar}</AlertTitle>
                    </Alert>
                  )}
                  <Button
                    marginTop={4}
                    colorScheme="teal"
                    type="submit"
                    disabled={!isValid}
                  >
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Flex>
    </>
  );
};

export default UpdateItem;
