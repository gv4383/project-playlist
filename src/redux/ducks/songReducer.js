import axios from 'axios';

/****** INITIAL STATE ******/
const initialState = {
  songs: [],
  isLoading: false,
  error: ''
}

/****** ACTION TYPES ******/
const GET_SONGS = 'GET_SONGS';

// gets list of songs from server
export function getSongs() {
  return {
    type: GET_SONGS,
    payload: axios.get('/api/songs')
  };
}

/****** REDUCER ******/
export default function songReducer(state = initialState, action) {
  switch(action.type) {
    // GET
    case 'GET_SONGS_PENDING':
      return {
        ...state,
        isLoading: true
    };
    case 'GET_SONGS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        songs: action.payload.data
      };
    case 'GET_SONGS_REJECTED':
      return {
        ...state,
        isLoading: true,
        error: action.payload
      };

    // DEFAULT
    default:
      return state;
  }
}