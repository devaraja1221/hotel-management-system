function DeleteConfirmation({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      className="delete-modal-overlay"
      onClick={onCancel}
    >
      <div
        className="delete-modal-content"
        onClick={(event) => event.stopPropagation()}
      >

        <div className="delete-icon">!</div>

        <h2>Confirm Delete</h2>

        <p>
          Are you sure you want to delete this hotel?
          This action cannot be undone.
        </p>

        <div className="delete-modal-actions">

          <button
            type="button"
            className="cancel-delete-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="confirm-delete-button"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmation;
