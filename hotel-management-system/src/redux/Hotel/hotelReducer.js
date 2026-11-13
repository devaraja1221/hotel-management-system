import {
  FETCH_HOTELS_REQUEST,
  FETCH_HOTELS_SUCCESS,
  FETCH_HOTELS_FAILURE,
  ADD_HOTEL,
  UPDATE_HOTEL,
  DELETE_HOTEL
} from "./hotelActionTypes";

const initialState = {
  hotels: [],
  loading: false,
  error: null
};

function hotelReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_HOTELS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_HOTELS_SUCCESS:
      return {
        ...state,
        loading: false,
        hotels: action.payload
      };

    case FETCH_HOTELS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ADD_HOTEL:
      return {
        ...state,
        hotels: [...state.hotels, action.payload]
      };

    case UPDATE_HOTEL:
      return {
        ...state,
        hotels: state.hotels.map((hotel) =>
          String(hotel.id) === String(action.payload.id)
            ? action.payload
            : hotel
        )
      };

    case DELETE_HOTEL:
      return {
        ...state,
        hotels: state.hotels.filter(
          (hotel) => String(hotel.id) !== String(action.payload)
        )
      };

    default:
      return state;
  }
}

export default hotelReducer;
