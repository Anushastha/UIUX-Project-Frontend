import React, { useState } from "react";
import { changePassword } from "../../apis/Apis";
import "../../styles/tailwind.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await changePassword(
        { currentPassword, newPassword, confirmNewPassword },
        token
      );
      setMessage(response.message);
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  return (
    <div className="tw-container tw-mx-auto tw-p-4">
      <div className="tw-card tw-shadow-lg tw-rounded-lg tw-bg-white">
        <div className="tw-card-body tw-p-6">
          <h2 className="tw-card-title tw-text-xl tw-font-bold tw-mb-4">
            Change Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="tw-mb-3">
              <label
                htmlFor="currentPassword"
                className="tw-form-label tw-block tw-font-medium tw-mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                className="tw-form-control tw-w-full tw-border tw-rounded-lg tw-py-2 tw-px-3"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="tw-mb-3">
              <label
                htmlFor="newPassword"
                className="tw-form-label tw-block tw-font-medium tw-mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                className="tw-form-control tw-w-full tw-border tw-rounded-lg tw-py-2 tw-px-3"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="tw-mb-3">
              <label
                htmlFor="confirmNewPassword"
                className="tw-form-label tw-block tw-font-medium tw-mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                className="tw-form-control tw-w-full tw-border tw-rounded-lg tw-py-2 tw-px-3"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="tw-btn tw-btn-primary tw-bg-blue-500 tw-text-black tw-py-2 tw-px-4 tw-rounded-lg"
            >
              Change Password
            </button>
          </form>
          {message && (
            <div className="tw-alert tw-alert-info tw-mt-3 tw-bg-blue-100 tw-text-blue-700 tw-p-3 tw-rounded-lg">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
