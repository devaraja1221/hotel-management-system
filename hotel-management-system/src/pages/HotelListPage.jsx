import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";
import HotelModal from "../components/HotelModal";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FilterSidebar from "../components/FilterSidebar";

import {
  fetchHotels,
  addHotel,
  updateHotel,
  deleteHotel
} from "../redux/Hotel/hotelActions";

function HotelListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  


  const hotels = useSelector((state) => state.hotels);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  


  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  


  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  


  const filteredHotels = hotels.filter((hotel) => {
    const title = (hotel.title || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    const price = Number(hotel.price);

    const matchesSearch = title.includes(search);

    const matchesMinPrice =
      minPrice === "" || price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  


  function handleAdd() {
    setSelectedHotel(null);
    setIsModalOpen(true);
  }

  


  function handleEdit(hotel) {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  }

  


  async function handleFormSubmit(data) {
    const success = selectedHotel
      ? await dispatch(updateHotel(selectedHotel.id, data))
      : await dispatch(addHotel(data));

    if (success) {
      setIsModalOpen(false);
      setSelectedHotel(null);
    }
  }

  


  function handleDeleteRequest(id) {
    setDeleteId(id);
  }



  async function handleDelete() {
    if (deleteId === null || isDeleting) return;

    setIsDeleting(true);

    try {
      const success = await dispatch(deleteHotel(deleteId));

      if (success) {
        setDeleteId(null);
      }
    } finally {
      setIsDeleting(false);
    }
  }

  

  function handleCancelDelete() {
    if (!isDeleting) {
      setDeleteId(null);
    }
  }

  

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedHotel(null);
  }

 

  function handleView(id) {
    navigate(`/hotel/${id}`);
  }

  return (
    <div className="hotel-list-page">

      <Header />

      <main className="hotel-main-container">

        <div className="hotel-page-header">
          <div>
            <h1 className="page-title">Hotel List</h1>
            <p className="page-subtitle">
              Manage and explore your hotels
            </p>
          </div>

          <button
            type="button"
            className="add-hotel-button"
            onClick={handleAdd}
          >
            + Add New Hotel
          </button>
        </div>

        <div className="hotel-content-layout">

          <aside className="hotel-filter-column">

            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <FilterSidebar
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />

          </aside>

          <section className="hotel-list-section">

            {loading && (
              <p className="loading-message">
                Loading hotels...
              </p>
            )}

            {error && (
              <p className="error-message">{error}</p>
            )}

            {!loading && !error && (
              <>
                <div className="hotel-results-heading">
                  <h2>Available Hotels</h2>
                  <span>
                    {filteredHotels.length} hotels found
                  </span>
                </div>

                <div className="hotel-grid">
                  {filteredHotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDeleteRequest}
                    />
                  ))}
                </div>

                {filteredHotels.length === 0 && (
                  <p className="empty-message">
                    No hotels found. Try changing your search or filters.
                  </p>
                )}
              </>
            )}

          </section>
        </div>
      </main>

      

      <HotelModal
        isOpen={isModalOpen}
        initialData={selectedHotel}
        onSubmit={handleFormSubmit}
        onClose={handleCloseModal}
      />

      

      <DeleteConfirmation
        isOpen={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />

    </div>
  );
}

export default HotelListPage;
