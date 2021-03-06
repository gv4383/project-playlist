import axios from 'axios';

/****** INITIAL STATE ******/
const initialState = {
  songs: [],
  playlists: [],
  editedPlaylist: {},
  isLoading: false,
  error: '',
  accessToken: '',
  refreshToken: '',
  country: '',
  email: '',
  username: ''
}

/****** ACTION TYPES ******/
const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
const GET_REFRESH_TOKEN = 'GET_REFRESH_TOKEN';
const STORE_COUNTRY = 'STORE_COUNTRY';
const STORE_EMAIL = 'STORE_EMAIL';
const STORE_USERNAME = 'STORE_USERNAME';

const GET_SONGS = 'GET_SONGS';
const ADD_SONG = 'ADD_SONG';
const REMOVE_SONG = 'REMOVE_SONG';

const GET_PLAYLISTS = 'GET_PLAYLISTS';
const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
const EDIT_PLAYLIST = 'EDIT_PLAYLIST';


/****** ACTION CREATORS ******/

// retrieves access token and stores it in reducer
export function getAccessToken(accessToken) {
  return {
    type: GET_ACCESS_TOKEN,
    payload: accessToken
  }
}

// retrieves refresh token and stores it in reducer
export function getRefreshToken(refreshToken) {
  return {
    type: GET_REFRESH_TOKEN,
    payload: refreshToken
  }
}

// stores country associated with user's spotify account in reducer
export function storeCountry(country) {
  return {
    type: STORE_COUNTRY,
    payload: country
  }
}

// stores user's email  in reducer
export function storeEmail(email) {
  return {
    type: STORE_EMAIL,
    payload: email
  }
}

// stores user's username in reducer
export function storeUsername(username) {
  return {
    type: STORE_USERNAME,
    payload: username
  }
}

// gets list of songs from server
export function getSongs(id) {
  return {
    type: GET_SONGS,
    payload: axios.get(`/api/songs/${ id }`)
  };
}

// adds a song to a playlist in database
export function addSong(obj) {
  alert('Song added to playlist!');
  return {
    type: ADD_SONG,
    payload: axios.post('/api/songs', obj)
  }
}

// removes a song's association to a playist in database
export function removeSong(id) {
  alert('Song removed from playlist!');
  return {
    type: REMOVE_SONG,
    payload: axios.delete(`/api/songs/${ id }`)
  }
}


// gets list of playlists from server
export function getPlaylists(username) {
  return {
    type: GET_PLAYLISTS,
    payload: axios.get(`/api/playlists/${ username }`)
  };
}

// adds a new playlist to server/database
export function createPlaylist(obj) {
  return {
    type: CREATE_PLAYLIST,
    payload: axios.post('/api/playlists', obj)
  }
}

// deletes a playlist entry within the server/database
export function deletePlaylist(id) {
  return {
    type: DELETE_PLAYLIST,
    payload: axios.delete(`/api/playlists/${ id }`)
  }
}

// edits a current playlist's description
export function editPlaylist(id, obj) {
  return {
    type: EDIT_PLAYLIST,
    payload: axios.put(`/api/playlists/${ id }`, obj)
  }
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
    // GET USER'S COUNTRY
    case 'STORE_COUNTRY':
      return {
        ...state,
        country: action.payload
    };
    // GET USER'S EMAIL
    case 'STORE_EMAIL':
      return {
        ...state,
        email: action.payload
    };
    // GET USER'S USERNAME
    case 'STORE_USERNAME':
      return {
        ...state,
        username: action.payload
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

    // ADD SONG
    case 'ADD_SONG_PENDING':
      return {
        ...state,
        isLoading: true
    };
    case 'ADD_SONG_FULFILLED':
      return {
        ...state,
        isLoading: false,
        songs: [...state.songs, action.payload.data]
    };
    case 'ADD_SONG_REJECTED':
      return {
        ...state,
        isLoading: true,
        error: action.payload
    };

    // REMOVE SONG
    case 'REMOVE_SONG_PENDING':
      return {
        ...state,
        isLoading: true
    };
    case 'REMOVE_SONG_FULFILLED':
      return {
        ...state,
        isLoading: false,
        songs: [...state.songs]
    };
    case 'REMOVE_SONG_REJECTED':
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

    // CREATE/ADD PLAYLIST
    case 'CREATE_PLAYLIST_PENDING':
      return {
        ...state,
        isLoading: true
    };
    case 'CREATE_PLAYLIST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        playlists: [...state.playlists, action.payload.data]
    };
    case 'CREATE_PLAYLIST_REJECTED':
      return {
        ...state,
        isLoading: true,
        error: action.payload
    };

    // DELETE PLAYLIST
    case 'DELETE_PLAYLIST_PENDING':
      return  {
        ...state,
        isLoading: true
    };
    case 'DELETE_PLAYLIST_FULFILLED':
      return  {
        ...state,
        isLoading: false,
        playlists: [...state.playlists]
    };
    case 'DELETE_PLAYLIST_REJECTED':
      return  {
        ...state,
        isLoading: true,
        error: action.payload
    };

    // EDIT PLAYLIST
    case 'EDIT_PLAYLIST_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'EDIT_PLAYLIST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        editedPlaylist: action.payload.data[0]
      };
    case 'EDIT_PLAYLIST_REJECTED':
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