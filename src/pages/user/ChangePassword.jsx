import React, { useState } from "react";
import * as Components from "../../Components";
import "../../styles/auth.css";
import { changePasswordApi } from "../../apis/Apis";
import { toast } from "react-toastify";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      if (newPassword === currentPassword) {
        throw new Error(
          "New password should be different from the current password."
        );
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error("New password and confirmation password do not match.");
      }

      const response = await changePasswordApi({
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        toast.success("Password changed successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error.message);
      toast.error(error.message);
    }
  };

  const toggleShowPassword = (setShowPassword) => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Components.Wrapper>
      <Components.ChangePasswordContainer className="py-5">
        <Components.Form
          onSubmit={handlePasswordChange}
          style={{
            width: "80%",
          }}
        >
          <Components.Title className="font-primary mb-3">
            Change Password
          </Components.Title>

          <Components.Line>Enter your old password</Components.Line>
          <Components.InputContainer className="mb-2">
            <Components.Input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Old password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Components.IconWrapper
              onClick={() => toggleShowPassword(setShowCurrentPassword)}
            >
              <img
                src={`/assets/svg/${
                  showCurrentPassword ? "eye" : "eye-crossed"
                }.svg`}
                alt="eye"
                style={{ height: "25px", cursor: "pointer" }}
              />
            </Components.IconWrapper>
          </Components.InputContainer>

          <Components.Line>Enter your new password</Components.Line>
          <Components.InputContainer className="mb-2">
            <Components.Input
              type={showNewPassword ? "text" : "password"}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Components.IconWrapper
              onClick={() => toggleShowPassword(setShowNewPassword)}
            >
              <img
                src={`/assets/svg/${
                  showNewPassword ? "eye" : "eye-crossed"
                }.svg`}
                alt="eye"
                style={{ height: "25px", cursor: "pointer" }}
              />
            </Components.IconWrapper>
          </Components.InputContainer>

          <Components.Line>Confirm new password</Components.Line>
          <Components.InputContainer className="mb-2">
            <Components.Input
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <Components.IconWrapper
              onClick={() => toggleShowPassword(setShowConfirmNewPassword)}
            >
              <img
                src={`/assets/svg/${
                  showConfirmNewPassword ? "eye" : "eye-crossed"
                }.svg`}
                alt="eye"
                style={{ height: "25px", cursor: "pointer" }}
              />
            </Components.IconWrapper>
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
