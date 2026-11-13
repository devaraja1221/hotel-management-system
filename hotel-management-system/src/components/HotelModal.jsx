import HotelForm from "./HotelForm";

function HotelModal({
  isOpen,
  initialData,
  onSubmit,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div
      className="hotel-modal-overlay"
      onClick={onClose}
    >
      <div
        className="hotel-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hotel-modal-header">
          <h2>
            {initialData ? "Edit Hotel" : "Add New Hotel"}
          </h2>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <HotelForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

export default HotelModal;
