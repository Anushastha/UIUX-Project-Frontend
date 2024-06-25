// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getSingleCollegeApi, getSingleCourseApi, updateCollegeApi } from "../../apis/Apis";
// import { toast } from "react-toastify";

// const AdminEditCollege = () => {
//   //Receive product id from URL
//   const { id } = useParams();

//   //useEffect (details haru aafai import huna lai)
//   useEffect(() => {
//     getSingleCollegeApi(id).then((res) => {
//       console.log(res.data);
//       setCollegeName(res.data.college.collegeName);
//       setCollegeDescription(res.data.college.collegeDescription);
//       setCollegeFees(res.data.college.collegeFees);
//       setCollegeType(res.data.college.collegeType);
//       setOldImage(res.data.college.collegeImageUrl);
//     });
//   }, [id]); //useEffect chalauna lai id chaincha chaincha

//   // Make useState
//   const [collegeName, setCollegeName] = useState("");
//   const [collegeDescription, setCollegeDescription] = useState("");
//   const [collegeFees, setCollegeFees] = useState("");
//   const [collegeType, setCollegeType] = useState("");
//   const [collegeImageUrl, setOldImage] = useState("");

//   // make useState for image
//   const [collegeImage, setCollegeImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     console.log(file);
//     setCollegeImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   //handle submit function
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("collegeName", collegeName);
//     formData.append("collegeDescription", collegeDescription);
//     formData.append("collegeFees", collegeFees);
//     formData.append("collegeType", collegeType);
//     formData.append("collegeImage", collegeImage);

//     //make a api call
//     updateProductApi(id, formData)
//       .then((res) => {
//         if (res.data.success == false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message);
//           navigate("/admin/dashboard");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Internal server Error!");
//       });
//   };
//   return (
//     <>
//       <div className="container mt-4">
//         <div className="row">
//           {/* Form Column */}
//           <div className="col-md-4 bg-white p-4 shadow">
//             <p className="text-center fs-4 fw-bold mb-4">
//               Editing Product -{" "}
//               <span className="text-indigo">{productName}</span>
//             </p>
//             <form>
//               <label className="form-label">Product Name</label>
//               <input
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 className="form-control mb-2"
//                 type="text"
//                 placeholder="Enter product name"
//               />

//               <label className="form-label">Product Description</label>
//               <textarea
//                 value={productDescription}
//                 onChange={(e) => setProductDescription(e.target.value)}
//                 className="form-control mb-2"
//                 placeholder="Enter description"
//                 rows="4"
//               ></textarea>

//               <label className="form-label">Price</label>
//               <input
//                 value={productPrice}
//                 onChange={(e) => setProductPrice(e.target.value)}
//                 type="number"
//                 className="form-control mb-2"
//                 placeholder="Enter your price"
//               />

//               <label className="form-label">Select category</label>
//               <select
//                 value={productCategory}
//                 onChange={(e) => setProductCategory(e.target.value)}
//                 className="form-control mb-2"
//               >
//                 <option value="Lights">Lights</option>
//                 <option value="Rugs">Rugs</option>
//                 <option value="Beds">Beds</option>
//                 <option value="Couch">Couch</option>
//               </select>

//               <label className="form-label">Product Image</label>
//               <input
//                 onChange={handleImageUpload}
//                 type="file"
//                 className="form-control mb-2"
//               />

//               <button
//                 onClick={handleSubmit}
//                 className="btn btn-indigo w-100 mt-2"
//               >
//                 Update Product
//               </button>
//             </form>
//           </div>

//           {/* Old Image Preview Column */}
//           <div className="col-md-4">
//             <div>
//               <h6 className="mb-3">Old Image Preview</h6>
//               <img
//                 className="img-fluid rounded-4 object-fit-cover"
//                 src={oldImage}
//                 alt=""
//               />
//             </div>
//           </div>

//           {/* New Image Preview Column */}
//           <div className="col-md-4">
//             <div>
//               <h6 className="mb-3">New Image</h6>
//               {previewImage ? (
//                 <img
//                   src={previewImage}
//                   alt="product Image"
//                   className="img-fluid rounded-4 object-fit-cover"
//                 />
//               ) : (
//                 <p className="text-danger">No new image selected</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       ;
//     </>
//   );
// };

// export default AdminEditCollege;
