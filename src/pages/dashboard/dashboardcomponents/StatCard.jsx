import { ReactNode } from 'react';


const StatCard = ({ title, value, icon }) => {
  return (
    <div className="card stat-card p-3">
      <h3 className="stat-title">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="stat-value">{value}</span>
        {icon && <div className="text-primary-light">{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;