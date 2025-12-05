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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import GiverNav from "./GiverNav";
import { useNavigate } from "react-router-dom";

const GiverForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    amount: "",
    duration: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  // Check if giver already has a listing
  useEffect(() => {
    const checkExistingListing = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          navigate("/login");
          return;
        }

        const res = await fetch(`http://localhost:5000/api/giver/my-leases/${userId}`);
        const data = await res.json();
        
        if (data.length > 0) {
          alert("You already have an active listing. Please delete your existing listing before creating a new one.");
          const username = sessionStorage.getItem("username");
          if (username) {
            navigate(`/${username}/listings`);
          } else {
            navigate("/login");
          }
          return;
        }
      } catch (err) {
        console.error("Error checking existing listing:", err);
      } finally {
        setChecking(false);
      }
    };

    checkExistingListing();
  }, [navigate]);

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end <= start) return "";
    
    // Calculate months difference more accurately
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    
    let months = (endYear - startYear) * 12 + (endMonth - startMonth);
    
    // If end day is before start day, it's not a full month
    if (end.getDate() < start.getDate()) {
      months--;
    }
    
    // Add 1 to include both start and end months
    return months + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    
    // Auto-calculate duration when dates change
    if (name === "startDate" || name === "endDate") {
      if (updatedFormData.startDate && updatedFormData.endDate) {
        const start = new Date(updatedFormData.startDate);
        const end = new Date(updatedFormData.endDate);
        
        if (end <= start) {
          updatedFormData.duration = "";
          if (name === "endDate") {
            alert("End date must be after start date");
          }
        } else {
          const duration = calculateDuration(updatedFormData.startDate, updatedFormData.endDate);
          updatedFormData.duration = duration > 0 ? duration : "";
        }
      } else {
        updatedFormData.duration = "";
      }
    }
    
    setFormData(updatedFormData);
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const giverId = sessionStorage.getItem("userId");
      if (!giverId) {
        alert("Login expired. Please log in again.");
        navigate("/login");
        return;
      }

      // Validate dates
      if (!formData.startDate || !formData.endDate) {
        alert("Please select both start and end dates");
        setLoading(false);
        return;
      }

      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate <= startDate) {
        alert("End date must be after start date");
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append("title", formData.title);
      form.append("location", formData.location);
      form.append("amount", formData.amount);
      form.append("duration", formData.duration);
      form.append("startDate", formData.startDate);
      form.append("endDate", formData.endDate);
      form.append("description", formData.description);
      form.append("giverId", giverId);

      for (let i = 0; i < photos.length; i++) {
        form.append("photos", photos[i]);
      }

      const res = await fetch("http://localhost:5000/api/giver/create", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!data.success || !res.ok) {
        alert(data.message || "Something went wrong while creating the listing");
        if (res.status === 400 && data.message) {
          // If it's a validation error (like already has listing), navigate back
          const username = sessionStorage.getItem("username");
          if (username) {
            navigate(`/${username}/listings`);
          } else {
            navigate("/login");
          }
        }
        return;
      }

      alert("Listing created successfully! 🎉");
      const username = sessionStorage.getItem("username");
      if (username) {
        navigate(`/${username}/listings`);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error creating listing:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while checking for existing listing
  if (checking) {
    return (
      <div style={{ background: "rgba(255, 255, 255, 0.95)", minHeight: "100vh" }}>
        <GiverNav />
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <div className="text-center">
            <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
            <p className="mt-3 text-muted">Checking your listings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "rgba(255, 255, 255, 0.95)", minHeight: "100vh" }}>
      <GiverNav />
      <Container className="py-5 fade-in" style={{ maxWidth: "800px" }}>
        <div className="card shadow-lg">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h2
                style={{
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "8px",
                }}
              >
                Create New Listing
              </h2>
              <p className="text-muted">Fill in the details to list your sublease</p>
            </div>

            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "#333" }}>
                      Listing Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Cozy 2BR Apartment"
                      required
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "#333" }}>
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., College Station, TX"
                      required
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "#333" }}>
                      Monthly Rent ($) *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        name="amount"
                        className="form-control"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "#333" }}>
                      Duration (months) *
                    </label>
                    <input
                      type="number"
                      name="duration"
                      className="form-control"
                      value={formData.duration}
                      readOnly
                      style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
                      placeholder="Auto-calculated from dates"
                    />
                    <small className="text-muted">Automatically calculated from start and end dates</small>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "#333" }}>
                      Sublease Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      className="form-control"
                      value={formData.startDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "#333" }}>
                      Sublease End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      className="form-control"
                      value={formData.endDate}
                      onChange={handleChange}
                      min={
                        formData.startDate 
                          ? new Date(new Date(formData.startDate).getTime() + 86400000).toISOString().split('T')[0] // Next day after start
                          : new Date().toISOString().split('T')[0]
                      }
                      required
                    />
                  </div>
                </Col>
              </Row>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#333" }}>
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property, amenities, nearby facilities, etc."
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: "#333" }}>
                  Upload Photos (up to 10) *
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="form-control"
                  onChange={handlePhotos}
                  required
                />
                <small className="text-muted">Select multiple images to showcase your property</small>

                {photoPreviews.length > 0 && (
                  <div className="mt-3">
                    <p className="mb-2 fw-semibold">Preview ({photoPreviews.length} photos):</p>
                    <div className="d-flex flex-wrap gap-2">
                      {photoPreviews.map((preview, index) => (
                        <div
                          key={index}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "2px solid #e0e0e0",
                          }}
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{
                    minWidth: "200px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating...
                    </>
                  ) : (
                    "✨ Create Listing"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GiverForm;
