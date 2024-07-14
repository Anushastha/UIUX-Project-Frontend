import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserProfileApi, updateUserProfileApi } from "../../apis/Apis";
import {jwtDecode} from "jwt-decode"; // Corrected import statement for jwtDecode

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found. Please log in.");
        }

        const decodedUserId = decodeTokenAndGetUserId(token);
        if (!decodedUserId) {
          throw new Error(
            "Unable to verify your identity. Please log in again."
          );
        }

        if (id !== decodedUserId) {
          throw new Error("You are not authorized to edit this profile.");
        }

        const response = await getUserProfileApi(id);
        if (response.data.success) {
          setUserData(response.data.userProfile);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  const decodeTokenAndGetUserId = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", userData.fullName);
      formData.append("email", userData.email);
      formData.append("phoneNumber", userData.phoneNumber);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await updateUserProfileApi(id, formData);
      if (response.data.success) {
        toast.success("Profile updated successfully");
        setUserData(response.data.userProfile);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating user profile");
    }
  };

  if (loading) {
    return <p className="loading-text">Loading user data...</p>;
  }

  if (!userData) {
    return (
      <p className="error-text">
        Unable to fetch user data. Please try again later.
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="bg-white p-8 w-full max-w-4xl mx-4 md:mx-auto relative"
        style={{
          marginTop: "60px",
        }}
      >
        <p className="font-primary text-blue text-center text-3xl mb-5">
          <u>Profile</u>
        </p>
        <div
          id="info"
          className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 p-4"
        >
          <div
            id="img-container"
            className="flex justify-center items-center mb-4 md:mb-0"
          >
            <input type="file" onChange={handleProfileImageUpload} />
            {profileImage && (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile Preview"
                className="profile-image-preview"
                style={{ objectFit: "cover", maxWidth: 300, maxHeight: 300 }}
              />
            )}
          </div>

          <div id="profile-details">
            <div className="mb-4">
              <p className="text-blue font-secondary">Full name</p>
              <div className="flex items-center">
                <input
                  className="form-control border-none p-2 focus:outline-none"
                  style={{
                    backgroundColor: "#F3F4F4",
                    color: "#A8AAAA",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  value={userData.fullName}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
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
                    src="/assets/svg/user.svg"
                    style={{
                      height: "20px",
                    }}
                    alt="User Icon"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-blue font-secondary">Email address</p>
              <div className="flex items-center">
                <input
                  className="form-control border-none p-2 focus:outline-none"
                  style={{
                    backgroundColor: "#F3F4F4",
                    color: "#A8AAAA",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
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
                    src="/assets/svg/mail.svg"
                    style={{
                      height: "20px",
                    }}
                    alt="Mail Icon"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-blue font-secondary">Phone number</p>
              <div className="flex items-center">
                <input
                  className="form-control border-none p-2 focus:outline-none"
                  style={{
                    backgroundColor: "#F3F4F4",
                    color: "#A8AAAA",
                    border: "none",
                    marginRight: "2px",
                    padding: "3px 10px",
                    width: "250px",
                  }}
                  value={userData.phoneNumber}
                  onChange={(e) =>
                    setUserData({ ...userData, phoneNumber: e.target.value })
                  }
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
                    src="/assets/svg/phone-blue.svg"
                    style={{
                      height: "20px",
                    }}
                    alt="Phone Icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn btn-blue" onClick={handleSaveProfile}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
