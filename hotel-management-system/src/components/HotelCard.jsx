function HotelCard({ hotel, onView, onEdit, onDelete }) {
  return (
    <article className="hotel-card">

      <div className="hotel-card-image">
        <img
          src={hotel.image}
          alt={hotel.title}
        />
      </div>

      <div className="hotel-card-content">

        <h2>{hotel.title}</h2>

        <p>{hotel.description}</p>

        <h3>
          ₹{Number(hotel.price).toLocaleString("en-IN")} / night
        </h3>

        <div className="hotel-card-actions">

          <button
            type="button"
            className="view-button"
            onClick={() => onView(hotel.id)}
          >
            View
          </button>

          <button
            type="button"
            className="edit-button"
            onClick={() => onEdit(hotel)}
          >
            Edit
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(hotel.id)}
          >
            Delete
          </button>

        </div>

      </div>
    </article>
  );
}

export default HotelCard;
