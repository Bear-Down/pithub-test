import React from 'react';
import { useVideos } from '../../hooks/useVideos';

export default function VideoList() {
	const { videos, loading, error, nextPage, prevPage, page, hasNext } = useVideos();

	if (loading) return <div className="status">Loading videos...</div>;
	if (error) return <div className="status" style={{ color: 'red' }}>Error: {error}</div>;
	if (videos.length === 0) return <div className="status">No videos found.</div>;

	return (
		<>
			<ul className="file-list">
			{videos.map((video) => (
				<li key={video.id} className="file-item">
				<a href={video.url} target="_blank" rel="noreferrer" className="file-link">
					{video.name}
				</a>
				</li>
			))}
			</ul>
			<div className="pagination-controls">
				<button 
					className="pagination-btn" 
					onClick={prevPage} 
					disabled={page === 1}
				>
					Previous
				</button>
				<span className="page-indicator">Page {page}</span>
				<button 
					className="pagination-btn" 
					onClick={nextPage} 
					disabled={!hasNext}
				>
					Next
				</button>
			</div>
		</>
	);
}
