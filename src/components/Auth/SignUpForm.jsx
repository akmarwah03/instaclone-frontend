import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useRef, useEffect } from "react";
import Spinner from "../UI/Spinner";
import { API_LINK } from "../../../API_LINK";

const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [profileBg, setProfileBg] = useState("");
  const [username, setUsername] = useState("");
  const [userError, setUserError] = useState("");
  const formRef = useRef();

  const signUpHandler = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("profileImage", profileImage);
    formData.append("profileBg", profileBg);
    const response = await fetch(API_LINK + "/auth/signup", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      dispatch(
        authActions.loginViaToken({ token: data.token, userId: data.userId })
      );
    } else {
      formRef.current.setErrors({
        profileImage: "Only images allowed",
        profileBg: "Only images allowed",
      });
    }
  };

  useEffect(() => {
    if (profileBg || profileImage) {
      formRef.current.validateForm();
    }
  }, [profileImage, profileBg]);

  return (
    <div className="h-9/12 mt-8">
      <Formik
        validateOnChange={false}
        innerRef={formRef}
        initialValues={{ username: "", password: "", profileImage, profileBg }}
        validate={async (values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          } else {
            if (username !== values.username) {
              const response = await fetch(API_LINK + "/auth/checkUsername", {
                method: "POST",
                body: JSON.stringify({
                  username: values.username,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              });
              const data = await response.json();
              setUsername(values.username);
              if (!data.unique) {
                errors.username = "Username already in use";
                setUserError("Username already in use");
              } else {
                setUserError("");
              }
            } else if (userError) {
              errors.username = userError;
            }
          }
          if (!values.password) {
            errors.password = "Required";
          } else {
            if (values.password.length < 8) {
              errors.password = "Minimum 8 characters required";
            }
          }
          if (!profileImage) {
            errors.profileImage = "Profile Image Required";
          }
          if (!profileBg) {
            errors.profileBg = "Profile Bg Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await signUpHandler(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className=" grid justify-items-center w-screen">
            {isSubmitting ? (
              <Spinner />
            ) : (
              <>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className=" w-10/12 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 h-12 z-10"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  style={{ marginTop: "-15px" }}
                  className=" pt-4 pb-1 px-2 w-10/12 bg-red-100 border-2 border-red-500 text-red-500 text-center rounded-lg"
                />
                <Field
                  type="password"
                  name="password"
                  className="w-10/12 mt-6 z-10 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 h-12"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ marginTop: "-15px" }}
                  className=" pt-4 pb-1 px-2 w-10/12 bg-red-100 border-2 border-red-500 text-red-500 text-center rounded-lg"
                />
                <label
                  htmlFor="profileImage"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  className="w-10/12 z-10  mt-6 bg-indigo-500 text-white py-2 px-4 rounded-xl text-lg text-center"
                >
                  {profileImage ? profileImage.name : "Select Profile Image"}
                </label>
                <Field
                  type="file"
                  name="profileImage"
                  accept=".jpg,.png"
                  id="profileImage"
                  onChange={(event) => {
                    setProfileImage(event.currentTarget.files[0]);
                  }}
                  style={{
                    width: "0.1px",
                    height: "0.1px",
                    opacity: "0",
                    overflow: "hidden",
                    position: "absolute",
                    zIndex: "-1",
                  }}
                />
                <ErrorMessage
                  name="profileImage"
                  component="div"
                  style={{ marginTop: "-15px" }}
                  className=" pt-4 pb-1 px-2 w-10/12 bg-red-100 border-2 border-red-500 text-red-500 text-center rounded-lg"
                />
                <Field
                  type="file"
                  name="profileBg"
                  accept=".jpg,.png"
                  id="profileBg"
                  onChange={(event) => {
                    setProfileBg(event.currentTarget.files[0]);
                  }}
                  style={{
                    width: "0.1px",
                    height: "0.1px",
                    opacity: "0",
                    overflow: "hidden",
                    position: "absolute",
                    zIndex: "-1",
                  }}
                />
                <label
                  htmlFor="profileBg"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  className="w-10/12 z-10 mt-6 bg-indigo-500 text-white py-2 px-4 rounded-xl text-lg text-center"
                >
                  {profileBg ? profileBg.name : "Select Profile Background"}
                </label>
                <ErrorMessage
                  name="profileBg"
                  component="div"
                  style={{ marginTop: "-15px" }}
                  className=" pt-4 pb-1 px-2 w-10/12 bg-red-100 border-2 border-red-500 text-red-500 text-center rounded-lg"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 w-10/12 bg-indigo-500 h-12 px-4 py-3 rounded-lg border border-indigo-500 text-white"
                >
                  Submit
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
      )
    </div>
  );
};

export default SignUpForm;
