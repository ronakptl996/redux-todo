import * as Yup from "yup";

export const validationSchema = Yup.object({
  userId: Yup.number().required("Please enter your userId"),
  title: Yup.string().min(10).required("Please enter title"),
  body: Yup.string().min(20).required("Please enter description"),
});

export const modalValidationSchema = Yup.object({
  title: Yup.string().min(10).required("Please enter title"),
  body: Yup.string().min(20).required("Please enter description"),
});
