
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/hotel-details.css";

function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:3000/hotels/${id}`
        );

        if (!response.ok) {
          throw new Error("Hotel details not found");
        }

        const data = await response.json();
        setHotel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="hotel-details-message">
        Loading hotel details...
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="hotel-details-message">
        {error || "Hotel not found"}
        <button onClick={() => navigate("/")}>
          Back to Hotels
        </button>
      </div>
    );
  }

  // Three separate description points for each hotel
  const defaultDescriptions = [
    `Elegant rooms at ${hotel.title} with modern interiors and comfortable furnishings.`,
    "Convenient location with easy access to nearby attractions and important destinations.",
    "Excellent hospitality with a relaxing atmosphere and quality guest services."
  ];

  const descriptionPoints =
    Array.isArray(hotel.descriptionPoints) &&
    hotel.descriptionPoints.length >= 3
      ? hotel.descriptionPoints.slice(0, 3)
      : defaultDescriptions;

  // Hotel facilities
  const facilities = hotel.facilities || [
    "Swimming Pool",
    "Restaurant",
    "Free Wi-Fi",
    "Parking",
    "Room Service",
    "Air Conditioning"
  ];

  return (
    <div className="hotel-details-page">

      <div className="hotel-details-container">

        <button
          className="hotel-back-button"
          onClick={() => navigate(-1)}
        >
          ← Back to Hotels
        </button>

        <div className="hotel-details-heading">
          <h1>{hotel.title}</h1>
          <p>Explore complete information about this hotel</p>
        </div>

        <div className="hotel-details-card">

          {/* Hotel Image */}
          <div className="hotel-details-image-container">
            <img
              src={
                hotel.image ||
                "https://placehold.co/900x450?text=Hotel+Image"
              }
              alt={hotel.title}
              className="hotel-details-image"
            />
          </div>

          <div className="hotel-details-content">

            {/* Three-point Description */}
            <section className="hotel-info-section">
              <h2>Hotel Description</h2>

              <ul className="hotel-description-points">
                {descriptionPoints.map((point, index) => (
                  <li key={index}>
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            {/* Hotel Information */}
            <section className="hotel-info-section">
              <h2>Hotel Information</h2>

              <div className="hotel-info-grid">

                <div className="hotel-info-item">
                  <span>Hotel Name</span>
                  <strong>{hotel.title}</strong>
                </div>

                <div className="hotel-info-item">
                  <span>Price</span>
                  <strong>
                    ₹{Number(hotel.price).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="hotel-info-item">
                  <span>Latitude</span>
                  <strong>{hotel.latitude}</strong>
                </div>

                <div className="hotel-info-item">
                  <span>Longitude</span>
                  <strong>{hotel.longitude}</strong>
                </div>

              </div>
            </section>

            {/* Facilities */}
            <section className="hotel-info-section">
              <h2>Facilities</h2>

              <div className="hotel-facilities-grid">
                {facilities.map((facility, index) => (
                  <div
                    className="hotel-facility-item"
                    key={index}
                  >
                    <span className="facility-check">✓</span>
                    {facility}
                  </div>
                ))}
              </div>
            </section>

            {/* Hotel Location */}
            <section className="hotel-info-section">
              <h2>Hotel Location</h2>

              <div className="hotel-location-map">
                <iframe
                  title="Hotel Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${hotel.latitude},${hotel.longitude}`
                  )}&output=embed`}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <p className="hotel-location-coordinates">
                Location: {hotel.latitude}, {hotel.longitude}
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetailsPage;
