import React, { useState } from "react";
import * as Components from "../../Components";
import "../../styles/auth.css";
import { toast } from "react-toastify";
import { changePasswordApi } from "../../apis/Apis";

function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePasswordApi(formData); // Assuming you implement this function in your API file
      toast.success("Password changed successfully");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to change password");
    }
  };

  const toggleShowPassword = (setShowPassword) => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Components.Wrapper>
      <Components.ChangePasswordContainer className="py-5">
        <Components.Form
          style={{
            width: "80%",
          }}
          onSubmit={handleSubmit}
        >
          <Components.Title className="font-primary mb-3">
            Change Password
          </Components.Title>

          <Components.Line>Enter your old password</Components.Line>
          <Components.InputContainer className="mb-2">
            <Components.Input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Old password"
              style={{ width: "100%" }}
            />
          </Components.InputContainer>

          <Components.Line>Enter your new password</Components.Line>
          <Components.InputContainer className="mb-2">
            <Components.Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New password"
              style={{ width: "100%" }}
            />
          </Components.InputContainer>

          <Components.Line>Confirm new password</Components.Line>
          <Components.InputContainer className="mb-2">
            <Components.Input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              style={{ width: "100%" }}
            />
          </Components.InputContainer>

          <Components.Button type="submit" className="mt-4">
            Submit
          </Components.Button>
        </Components.Form>
      </Components.ChangePasswordContainer>
    </Components.Wrapper>
  );
}

export default ChangePassword;
