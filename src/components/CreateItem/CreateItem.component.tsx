import { useCreateUserMutation } from '../../redux/userSlice';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import validationSchema from '../../utils/validationSchema';
import { v4 as uuidv4 } from 'uuid';
import Error from '../Error';
import Loading from '../Loading';
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

interface FormValues {
  name: string;
  email: string;
  avatar: string;
}

const CreateItem = (): JSX.Element => {
  const navigate = useHistory();
  const [createUser, { isLoading, isError }] = useCreateUserMutation();

  const initialValues: FormValues = {
    name: '',
    email: '',
    avatar: '',
  };

  const onSubmit = (values: FormValues) => {
    const data = {
      userId: uuidv4(),
      name: values.name,
      email: values.email,
      avatar: values.avatar,
    };
    //alert(JSON.stringify(data, null, 2));
    createUser(data);
    navigate.push('/');
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
                dirty,
              } = formik;
              return (
                <Form onSubmit={handleSubmit}>
                  <FormLabel color="white">Name</FormLabel>
                  <Input
                    id="name"
                    value={values.name}
                    color="white"
                    placeholder="Sarah Manning"
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
                    placeholder="sarah.manning@ob.org"
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
                    placeholder="image url"
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
                    className={dirty && isValid ? '' : 'disabled-btn'}
                    disabled={!(dirty && isValid)}
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

export default CreateItem;
