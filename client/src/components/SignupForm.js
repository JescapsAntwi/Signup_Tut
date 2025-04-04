import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

//Validation schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignupForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  //Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      //Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = values;

      //Register password
      await register(userData);

      //Redirect to dashboard on success
      navigate("/dashboard");
    } catch (error) {
      //Handle registration error
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Create an Account</h2>

      {error && <div className="error-message">{error}</div>}

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form">
            <div className="form-group">
              <label htmlFor="firstName"> First Name</label>
              <Field type="text" name="firstName" id="firstName" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error-text"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName"> Last Name</label>
              <Field type="text" name="lastName" id="lastName" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error-text"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email"> Email</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-text"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password"> Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-text"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword"> Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-text"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;

//React components names must start with an uppercase letter
