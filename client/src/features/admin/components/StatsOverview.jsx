import React from 'react';

/**
 * @file StatsOverview.jsx
 * @description Renders KPI cards for system statistics using scoped admin styles.
 */

const StatsOverview = ({ totalUsers, totalClasses, totalFiles, onRefresh }) => {
	const firebaseStorageConsoleLink = "https://console.firebase.google.com/u/0/project/pithub-test-kd/storage/pithub-test-kd.firebasestorage.app/files";

	return (
		<div style={{ marginBottom: '32px' }}>
		<div className="admin-flex admin-items-center admin-justify-between" style={{ marginBottom: '32px' }}>
			<div>
			<h2 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '4px' }}>Telemetry Overview</h2>
			<p style={{ fontSize: '12px', fontWeight: 700, opacity: 0.4 }}>Real-time service availability and network metrics.</p>
			</div>
			{onRefresh && (
			<button 
				onClick={onRefresh} 
				className="create-class-btn"
				style={{ padding: '8px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
			>
				Synchronize
			</button>
			)}
		</div>
		
		<div className="stats-grid">
			{/* Total Users */}
			<div className="stat-card">
			
			<div className="stat-label">Network Users</div>
			<div className="stat-value">{totalUsers.toLocaleString()}</div>
			<div className="admin-badge admin-badge-success" style={{ marginTop: '12px' }}>Active</div>
			</div>

			{/* Total Classes */}
			<div className="stat-card">
			
			<div className="stat-label">Total Classes</div>
			<div className="stat-value">{totalClasses.toLocaleString()}</div>
			<div className="admin-badge" style={{ marginTop: '12px', backgroundColor: 'rgba(0,0,0,0.05)', color: 'var(--admin-text-muted)' }}>Indexed</div>
			</div>

			{/* Total Files */}
			<div className="stat-card">
			
			<div className="stat-label">Storage Assets</div>
			<div className="stat-value">{totalFiles.toLocaleString()}</div>
			<div className="admin-badge admin-badge-warning" style={{ marginTop: '12px' }}>Optimized</div>
			</div>

			{/* System Status */}
			<div className="stat-card">
			
			<div className="stat-label">System Health</div>
			<div className="stat-value" style={{ color: 'var(--admin-success)', fontSize: '28px' }}>Good</div>
			<a href={firebaseStorageConsoleLink} target="_blank" rel="noopener noreferrer" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'var(--link-color)' }}>
				Open Firebase Console
				<svg style={{width:'12px',height:'12px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
			</a>
			</div>
		</div>
		</div>
	);
};

export default StatsOverview;
