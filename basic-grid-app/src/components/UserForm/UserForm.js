import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useGridStore from "../../utils/store";
import "./UserForm.css";

const UserForm = ({ closeModal }) => {
  const { addUser, editUser, existingUser, currentUserId } = useGridStore(); // zustand store
  return (
    <div>
      <Formik
        initialValues={{
          userId: currentUserId,
          firstName: "",
          lastName: "",
          email: "",
          status: "",
          createdOn: new Date(),
        }}
        validate={(values) => {
          const errors = {};
          if (!values.userId.length) {
            errors.userId = "UserId required";
          }
          if (!values.firstName.length) {
            errors.firstName = "First name required";
          }
          if (!values.lastName.length) {
            errors.lastName = "Last name required";
          }
          if (!values.email.length) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.status.length) {
            errors.status = "Status required";
          } else if (!/^[A-Z]+$/.test(values.status)) {
            errors.status =
              "Invalid status. Use one word with capital letters only";
          }
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // console.log(JSON.stringify(values, null, 2));
            existingUser ? editUser(values) : addUser(values);
            closeModal();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {!existingUser ? (
              <div className="label-field-pair w-120">
                <label htmlFor="userId">User ID</label>
                <Field type="text" name="userId" />
                <ErrorMessage name="userId" component="div" />
              </div>
            ) : null}
            <div className="label-field-pair w-120">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </div>
            <div className="label-field-pair w-120">
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>
            <div className="label-field-pair w-120">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="label-field-pair w-120">
              <label htmlFor="status">Status</label>
              <Field type="text" name="status" />
              <ErrorMessage name="status" component="div" />
            </div>
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
