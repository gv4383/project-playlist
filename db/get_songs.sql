SELECT * FROM songs s
JOIN playlists p
ON p.playlist_id = s.playlist_id
WHERE p.playlist_id = $1;