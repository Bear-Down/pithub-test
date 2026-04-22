import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ classData, onEdit, onDelete }) => {
	const navigate = useNavigate();

	return (
		<div className="class-card" onClick={() => navigate(`/class/${classData.id}`)}>
			<h3>{classData.name}</h3>
			{/* Stop onclick() bubble up the DOM */}
			<div className="card-actions" onClick={(e) => e.stopPropagation()}>
				<button className="edit-btn" onClick={() => onEdit(classData)}>Edit</button>
				<button className="delete-btn" onClick={() => onDelete(classData)}>Delete</button>
			</div>
		</div>
	);
};

export default ClassCard;
