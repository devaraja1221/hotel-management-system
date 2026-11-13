
import React, { useState, useEffect } from "react";

function HotelForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  // Load existing hotel details when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        latitude: initialData.latitude ?? "",
        longitude: initialData.longitude ?? "",
        price: initialData.price ?? "",
        image: initialData.image || "",
      });

      setImagePreview(initialData.image || "");
    } else {
      setFormData({
        title: "",
        description: "",
        latitude: "",
        longitude: "",
        price: "",
        image: "",
      });

      setImagePreview("");
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);

        setFormData((previousData) => ({
          ...previousData,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  // Submit hotel details
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>

      {/* Hotel Image */}
      <div className="form-group">
        <label htmlFor="hotel-image">Hotel Image</label>

        <input
          type="file"
          id="hotel-image"
          accept="image/jpeg"
          onChange={handleImageChange}
        />

        {imagePreview && (
          <div className="image-preview">
            <img
              src={imagePreview}
              alt="Hotel Preview"
              style={{
                width: "100%",
                maxHeight: "180px",
                objectFit: "cover",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
      </div>

      {/* Hotel Title */}
      <div className="form-group">
        <label htmlFor="hotel-title">Hotel Title</label>

        <input
          type="text"
          id="hotel-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter hotel name"
          required
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="hotel-description">Description</label>

        <textarea
          id="hotel-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter hotel description"
          required
        />
      </div>

      {/* Latitude */}
      <div className="form-group">
        <label htmlFor="hotel-latitude">Latitude</label>

        <input
          type="number"
          step="any"
          id="hotel-latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          placeholder="Enter latitude"
          required
        />
      </div>

      {/* Longitude */}
      <div className="form-group">
        <label htmlFor="hotel-longitude">Longitude</label>

        <input
          type="number"
          step="any"
          id="hotel-longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          placeholder="Enter longitude"
          required
        />
      </div>

      {/* Price */}
      <div className="form-group">
        <label htmlFor="hotel-price">Price</label>

        <input
          type="number"
          id="hotel-price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter hotel price"
          min="1"
          required
        />
      </div>

      {/* Form Buttons */}
      <div className="hotel-form__actions">

        <button
          type="submit"
          className="hotel-form__save-button"
        >
          Save Hotel
        </button>

        <button
          type="button"
          className="hotel-form__cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>

      </div>

    </form>
  );
}

export default HotelForm;
