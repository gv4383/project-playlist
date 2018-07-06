import axios from 'axios';

/****** INITIAL STATE ******/
const initialState = {
  songs: [],
  isLoading: false,
  error: '',
  accessToken: '',
  refreshToken: '',
  thisIsA: "error"
}

/****** ACTION TYPES ******/
const GET_SONGS = 'GET_SONGS';
const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
const GET_REFRESH_TOKEN = 'GET_REFRESH_TOKEN';

// gets list of songs from server
export function getSongs() {
  return {
    type: GET_SONGS,
    payload: axios.get('/api/songs')
  };
}

export function getAccessToken(accessToken) {
  return {
    type: GET_ACCESS_TOKEN,
    payload: accessToken
  }
}

export function getRefreshToken(refreshToken) {
  return {
    type: GET_REFRESH_TOKEN,
    payload: refreshToken
  }
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

    case 'GET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload
      };

      case 'GET_REFRESH_TOKEN':
        return {
          ...state,
          refreshToken: action.payload
      };

    // DEFAULT
    default:
      return state;
  }
}