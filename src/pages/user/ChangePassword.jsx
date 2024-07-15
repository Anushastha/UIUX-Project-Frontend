import React, { useState } from "react";
import { changePassword } from "../../apis/Apis";
import "../../styles/tailwind.css";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await changePassword(
        { currentPassword, newPassword, confirmNewPassword },
        token
      );
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div
      className="container flex items-center justify-center min-h-screen"
      style={{
        overflow: "hidden",
        width: "max-content",
      }}
    >
      <div
        className="tw-bg-white tw-p-8 tw-max-w-4xl tw-mx-4 md:tw-mx-auto tw-relative"
        style={{
          marginTop: "60px",
        }}
      >
        <p className="tw-font-primary tw-text-blue tw-text-center tw-text-3xl tw-mb-5">
          <u>Change Password</u>
        </p>
        <form
          onSubmit={handleSubmit}
          id="info"
          className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-4 tw-mx-10"
        >
          <div id="password-details">
            <div className="tw-mb-4">
              <p className="tw-text-blue tw-font-secondary">
                Enter your old password
              </p>
              <div className="tw-flex tw-items-center">
                <input
                  className="tw-border-none tw-p-2 focus:tw-outline-none"
                  style={{
                    backgroundColor: "#F3F4F4",
                    color: "#A8AAAA",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  type="password"
                  placeholder="Old Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <div
                  className="bg-gray-100"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3F4F4",
                    padding: "5px",
                  }}
                >
                  <img
                    src="/assets/svg/eye.svg"
                    style={{
                      height: "20px",
                    }}
                    alt="eye Icon"
                  />
                </div>
              </div>
            </div>
            <div className="tw-mb-4">
              <p className="tw-text-blue tw-font-secondary">
                Enter new Password
              </p>
              <div className="tw-flex tw-items-center">
                <input
                  className="tw-border-none tw-p-2 focus:tw-outline-none"
                  style={{
                    backgroundColor: "#F3F4F4",
                    color: "#A8AAAA",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <div
                  className="bg-gray-100"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3F4F4",
                    padding: "5px",
                  }}
                >
                  <img
                    src="/assets/svg/eye.svg"
                    style={{
                      height: "20px",
                    }}
                    alt="eye Icon"
                  />
                </div>
              </div>
            </div>
            <div className="tw-mb-4">
              <p className="tw-text-blue tw-font-secondary">
                Confirm new password
              </p>
              <div className="tw-flex tw-items-center">
                <input
                  className="tw-border-none tw-p-2 focus:tw-outline-none"
                  style={{
                    backgroundColor: "#F3F4F4",
                    color: "#A8AAAA",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                <div
                  className="bg-gray-100"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3F4F4",
                    padding: "5px",
                  }}
                >
                  <img
                    src="/assets/svg/eye.svg"
                    style={{
                      height: "20px",
                    }}
                    alt="eye Icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-blue" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
