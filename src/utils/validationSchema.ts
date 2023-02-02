import * as yup from 'yup';

const isRequiredMessage = 'This field is required';

export default yup.object().shape({
  name: yup.string().required(isRequiredMessage).min(2),
  email: yup.string().required(isRequiredMessage).email(),
  //avatar: yup.string().url(),
});
