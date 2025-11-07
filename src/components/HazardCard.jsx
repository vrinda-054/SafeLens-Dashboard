import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Construction, Car, MapPin, Clock, Activity, User } from 'lucide-react';

const HazardCard = ({ hazard, onClick }) => {
  const getSeverityBadge = (severity) => {
    const styles = {
      critical: 'bg-hazard-critical',
      high: 'bg-hazard-high',
      medium: 'bg-hazard-medium',
      low: 'bg-hazard-low'
    };
    return styles[severity] || 'bg-gray-500';
  };

  const getTypeIcon = (type) => {
    const iconClass = "w-6 h-6";
    switch (type) {
      case 'pothole':
        return <AlertTriangle className={iconClass} />;
      case 'debris':
        return <Construction className={iconClass} />;
      case 'vehicle':
        return <Car className={iconClass} />;
      default:
        return <AlertTriangle className={iconClass} />;
    }
  };

  return (
    <div
      onClick={() => onClick && onClick(hazard)}
      className="glass-card-hover p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${getSeverityBadge(hazard.severity)}`}>
            {getTypeIcon(hazard.type)}
          </div>
          <div>
            <h3 className="text-lg font-bold capitalize">{hazard.type}</h3>
            <p className="text-sm text-white/70">ID: {hazard.id}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityBadge(hazard.severity)}`}>
            {hazard.severity.toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            hazard.status === 'active' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
          }`}>
            {hazard.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-2">
        <MapPin className="w-4 h-4 mt-1 text-primary-orange flex-shrink-0" />
        <p className="text-sm">{hazard.location}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-white/80">{hazard.description}</p>

      {/* Meta Information */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary-orange" />
          <div className="text-xs">
            <p className="text-white/60">Reported</p>
            <p className="font-semibold">{format(new Date(hazard.timestamp), 'MMM dd, HH:mm')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary-orange" />
          <div className="text-xs">
            <p className="text-white/60">Confidence</p>
            <p className="font-semibold">{(hazard.confidence * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Reporter */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
        <User className="w-4 h-4 text-white/60" />
        <span className="text-xs text-white/60">Reported by: <span className="text-white font-medium">{hazard.reportedBy}</span></span>
      </div>
    </div>
  );
};

export default HazardCard;
