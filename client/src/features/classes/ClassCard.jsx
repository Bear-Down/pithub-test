import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ classData, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="class-card" onClick={() => navigate(`/class/${classData.id}`)}>
      <h3>{classData.name}</h3>
      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onEdit(classData)}>Edit</button>
        <button onClick={() => onDelete(classData.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ClassCard;
