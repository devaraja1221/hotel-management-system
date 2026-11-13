function MapView({ latitude, longitude }) {
  return (
    <div className="map-container">

      <h3 className="map-title">Hotel Location</h3>

      {latitude && longitude ? (
        <iframe
          className="hotel-map"
          title="Hotel Location Map"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`}
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        />
      ) : (
        <p className="map-message">
          Location information is not available.
        </p>
      )}

    </div>
  );
}

export default MapView;