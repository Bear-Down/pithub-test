import React from 'react';
import { useVideos } from '../../hooks/useVideos';

export default function VideoList() {
	const { videos, loading, error } = useVideos();

	if (loading) return <div className="status">Loading videos...</div>;
	if (error) return <div className="status" style={{ color: 'red' }}>Error: {error}</div>;
	if (videos.length === 0) return <div className="status">No videos found.</div>;

	return (
		<ul className="file-list">
		{videos.map((video) => (
			<li key={video.id} className="file-item">
			<a href={video.url} target="_blank" rel="noreferrer" className="file-link">
				{video.name}
			</a>
			</li>
		))}
		</ul>
	);
}
