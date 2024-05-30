import { Formik, Form, Field, FormikErrors } from "formik";

interface CreateStudentFormValues {
  email: string;
  cpr: string;
  fullName: string;
  phone: string;
}

export default function CreateStudent() {
  const initialValues: CreateStudentFormValues = {
    email: "",
    cpr: "",
    fullName: "",
    phone: "",
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Create a new student info</h1>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: FormikErrors<CreateStudentFormValues> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form className="container flex flex-col mx-auto">
            <label className="label">Email</label>
            <Field
              type="email"
              name="email"
              title="email"
              placeholder="Email"
              className={`input input-bordered input-primary ${
                errors.email && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <label className="label-text-alt text-error">
              {errors.email && touched.email && errors.email}
            </label>

            <button
              className="my-3 text-white btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
