import {
  FETCH_HOTELS_REQUEST,
  FETCH_HOTELS_SUCCESS,
  FETCH_HOTELS_FAILURE,
  ADD_HOTEL,
  UPDATE_HOTEL,
  DELETE_HOTEL
} from "./hotelActionTypes";

const API_URL = "http://localhost:3000/hotels";

// FETCH HOTELS
export const fetchHotels = () => async (dispatch) => {
  dispatch({ type: FETCH_HOTELS_REQUEST });

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to fetch hotels");
    }

    const data = await response.json();

    dispatch({
      type: FETCH_HOTELS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: FETCH_HOTELS_FAILURE,
      payload: error.message
    });
  }
};



export const addHotel = (hotelData) => async (dispatch) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(hotelData)
    });

    if (!response.ok) {
      throw new Error("Unable to add hotel");
    }

    const newHotel = await response.json();

    dispatch({
      type: ADD_HOTEL,
      payload: newHotel
    });

    return true;

  } catch (error) {
    console.error("Add error:", error);
    alert(error.message);
    return false;
  }
};



export const updateHotel = (id, hotelData) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(hotelData)
    });

    if (!response.ok) {
      throw new Error("Unable to update hotel");
    }

    const updatedHotel = await response.json();

    dispatch({
      type: UPDATE_HOTEL,
      payload: updatedHotel
    });

    return true;

  } catch (error) {
    console.error("Update error:", error);
    alert(error.message);
    return false;
  }
};



export const deleteHotel = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Unable to delete hotel");
    }

    dispatch({
      type: DELETE_HOTEL,
      payload: id
    });

    return true;

  } catch (error) {
    console.error("Delete error:", error);
    alert(error.message);
    return false;
  }
};
