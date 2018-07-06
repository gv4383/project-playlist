import axios from 'axios';

/****** INITIAL STATE ******/
const initialState = {
  songs: [],
  playlists: [],
  isLoading: false,
  error: '',
  accessToken: '',
  refreshToken: ''
}

/****** ACTION TYPES ******/
const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
const GET_REFRESH_TOKEN = 'GET_REFRESH_TOKEN';

const GET_SONGS = 'GET_SONGS';
const GET_PLAYLISTS = 'GET_PLAYLISTS';

/****** ACTION CREATORS ******/
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

// gets list of songs from server
export function getSongs() {
  return {
    type: GET_SONGS,
    payload: axios.get('/api/songs')
  };
}

export function getPlaylists() {
  return {
    type: GET_PLAYLISTS,
    payload: axios.get('/api/playlists')
  };
}

/****** REDUCER ******/
export default function songReducer(state = initialState, action) {
  switch(action.type) {
    // GET ACCESS TOKEN
    case 'GET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload
      };
    // GET REFRESH TOKEN
    case 'GET_REFRESH_TOKEN':
      return {
        ...state,
        refreshToken: action.payload
    };

    // GET SONGS
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

    // GET PLAYLISTS
    case 'GET_PLAYLISTS_PENDING':
      return {
        ...state,
        isLoading: true,
    };
    case 'GET_PLAYLISTS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        playlists: action.payload.data
    };
    case 'GET_PLAYLISTS_REJECTED':
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