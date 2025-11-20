// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import GiverNav from "./GiverNav";

// const GiverForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     amount: "",
//     duration: "",
//     description: "",
//     photos: null,
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, photos: e.target.files });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const giverId = localStorage.getItem("userId");

//       const formDataToSend = new FormData();
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("location", formData.location);
//       formDataToSend.append("amount", formData.amount);
//       formDataToSend.append("duration", formData.duration);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("giverId", giverId);

//       if (formData.photos) {
//         for (let i = 0; i < formData.photos.length; i++) {
//           formDataToSend.append("photos", formData.photos[i]);
//         }
//       }

//       const res = await fetch("http://localhost:5000/api/giver/create", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Error creating listing");

//       alert("Listing created successfully");
//       navigate("/giver");
//     } catch (err) {
//       console.error("Error submitting listing:", err);
//       alert("Something went wrong while creating the listing");
//     }
//   };

//   return (
//     <div className="container py-4">
//       <GiverNav />
//       <div className="card shadow mt-4">
//         <div className="card-body">
//           <h3 className="card-title mb-3 text-center">Create Sublease Listing</h3>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 className="form-control"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 className="form-control"
//                 value={formData.location}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Rent per month</label>
//               <input
//                 type="number"
//                 name="amount"
//                 className="form-control"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Duration in months</label>
//               <input
//                 type="number"
//                 name="duration"
//                 className="form-control"
//                 value={formData.duration}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 name="description"
//                 className="form-control"
//                 rows="3"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Upload Photos</label>
//               <input
//                 type="file"
//                 name="photos"
//                 className="form-control"
//                 multiple
//                 accept="image/*"
//                 onChange={handleFileChange}
//               />
//             </div>

//             <div className="text-center">
//               <button type="submit" className="btn btn-primary w-50">
//                 Create Listing
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GiverForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GiverNav from "./GiverNav";

const GiverForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    amount: "",
    duration: "",
    description: "",
  });

  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotos = (e) => {
    setPhotos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const giverId = localStorage.getItem("userId");
      if (!giverId) {
        alert("Login expired");
        return;
      }

      const form = new FormData();
      form.append("title", formData.title);
      form.append("location", formData.location);
      form.append("amount", formData.amount);
      form.append("duration", formData.duration);
      form.append("description", formData.description);
      form.append("giverId", giverId);

      for (let i = 0; i < photos.length; i++) {
        form.append("photos", photos[i]); // MULTIPLE FILES
      }

      const res = await fetch("http://localhost:5000/api/giver/create", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!data.success) {
        alert("Something went wrong while creating the listing");
        return;
      }

      alert("Listing created successfully!");
      navigate("/giver");
    } catch (err) {
      console.error("Error creating listing:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container py-4">
      <GiverNav />
      <div className="card shadow mt-4">
        <div className="card-body">
          <h3 className="card-title mb-3 text-center">Create Sublease Listing</h3>

          <form onSubmit={handleSubmit}>
            {/* title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" name="title" className="form-control"
                value={formData.title} onChange={handleChange} required />
            </div>

            {/* location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input type="text" name="location" className="form-control"
                value={formData.location} onChange={handleChange} required />
            </div>

            {/* amount */}
            <div className="mb-3">
              <label className="form-label">Rent ($/month)</label>
              <input type="number" name="amount" className="form-control"
                value={formData.amount} onChange={handleChange} required />
            </div>

            {/* duration */}
            <div className="mb-3">
              <label className="form-label">Duration (months)</label>
              <input type="number" name="duration" className="form-control"
                value={formData.duration} onChange={handleChange} required />
            </div>

            {/* description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control"
                rows="3" value={formData.description} onChange={handleChange} />
            </div>

            {/* photos */}
            <div className="mb-3">
              <label className="form-label">Upload Photos (multiple allowed)</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="form-control"
                onChange={handlePhotos}
              />
            </div>

            {/* submit */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-50">
                Create Listing
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default GiverForm;
