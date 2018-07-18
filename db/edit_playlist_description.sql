UPDATE playlists
SET description = $1
WHERE playlist_id = $2
RETURNING *;