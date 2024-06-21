import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Components from "../Components";
import "../styles/auth.css";
import { loginApi, registerApi } from "../apis/Apis";
import { toast } from "react-toastify";

function LoginRegister() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");
  const initialSignInState = mode === "login";
  const [signIn, setSignIn] = useState(initialSignInState);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-register-body");

    return () => {
      document.body.classList.remove("login-register-body");
    };
  }, []);

  const changeFirstName = (e) => setFirstName(e.target.value);
  const changeLastName = (e) => setLastName(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const data = { firstName, lastName, email, password };

    registerApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };

    loginApi(data)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          const isAdmin = res.data.isAdmin;
          navigate(isAdmin ? "/admin/dashboard" : "/user/colleges");
          localStorage.setItem("user", JSON.stringify(res.data.userData));
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server Error!");
      });
  };

  const toggleSignIn = (value) => setSignIn(value);

  return (
    <Components.Wrapper>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleRegisterSubmit}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="First Name"
              onChange={changeFirstName}
            />
            <Components.Input
              type="text"
              placeholder="Last Name"
              onChange={changeLastName}
            />
            <Components.Input
              type="email"
              placeholder="Email"
              onChange={changeEmail}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              onChange={changePassword}
            />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleLoginSubmit}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              onChange={changeEmail}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              onChange={changePassword}
            />
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggleSignIn(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggleSignIn(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Components.Wrapper>
  );
}

export default LoginRegister;
