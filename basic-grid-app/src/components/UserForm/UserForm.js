import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { STATUS } from "../../utils/utils";
import useGridStore from "../../utils/store";
import "./UserForm.css";

const UserForm = ({ closeModal }) => {
  const { addUser, editUser, existingUser } = useGridStore(); // zustand store
  return (
    <div>
      <Formik
        initialValues={{
          userId: "",
          firstName: "",
          lastName: "",
          email: "",
          status: "",
          createdOn: new Date(),
        }}
        validate={(values) => {
          const errors = {};
          if (!values.userId) {
            errors.userId = "UserId required";
          }
          if (!values.firstName) {
            errors.firstName = "First name required";
          }
          if (!values.lastName) {
            errors.lastName = "Last name required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.status) {
            errors.status = "Status required";
          } else if (!STATUS[values.status]) {
            return (errors.status = `Choose from [${Object.values(
              STATUS
            ).toString()}]`);
          }
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            existingUser ? editUser(values) : addUser(values);
            closeModal();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {!existingUser ? (
              <>
                <Field type="text" name="userId" />
                <ErrorMessage name="userId" component="div" />
              </>
            ) : null}
            <Field type="text" name="firstName" />
            <ErrorMessage name="firstName" component="div" />
            <Field type="text" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="text" name="status" />
            <ErrorMessage name="status" component="div" />
            <button className="submit" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
