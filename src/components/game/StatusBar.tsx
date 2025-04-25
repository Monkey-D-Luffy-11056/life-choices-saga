
import React from 'react';

interface StatusBarProps {
  value: number;
  color: string;
  icon?: React.ReactNode;
  label?: string;
  showValue?: boolean;
  className?: string; // Added className prop
}

const StatusBar: React.FC<StatusBarProps> = ({ value, color, icon, label, showValue = false, className }) => {
  return (
    <div className={`w-full ${className || ''}`}>
      {(label || icon) && (
        <div className="flex items-center mb-1">
          {icon && <span className="mr-1.5">{icon}</span>}
          {label && <span className="text-sm font-medium">{label}</span>}
          {showValue && <span className="text-xs text-gray-500 ml-auto">{value}%</span>}
        </div>
      )}
      <div className="stat-bar">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatusBar;
