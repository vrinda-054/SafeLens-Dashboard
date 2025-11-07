import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { format } from 'date-fns';
import { Navigation, AlertTriangle, Construction, Car } from 'lucide-react';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons based on hazard type and severity
const createCustomIcon = (type, severity) => {
  const colors = {
    critical: '#EF4444',
    high: '#F97316',
    medium: '#F59E0B',
    low: '#10B981'
  };

  const icons = {
    pothole: '🕳️',
    debris: '🚧',
    vehicle: '🚗'
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="hazard-marker ${severity}" style="background-color: ${colors[severity]}">
        <span style="font-size: 20px;">${icons[type]}</span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

// Component to handle map bounds
const MapBounds = ({ hazards }) => {
  const map = useMap();

  useEffect(() => {
    if (hazards.length > 0) {
      const bounds = L.latLngBounds(
        hazards.map(h => [h.latitude, h.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [hazards, map]);

  return null;
};

const Map = ({ hazards, selectedHazard, onHazardClick }) => {
  const mapRef = useRef(null);
  const center = [20.5937, 78.9629]; // Center of India

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'text-hazard-critical',
      high: 'text-hazard-high',
      medium: 'text-hazard-medium',
      low: 'text-hazard-low'
    };
    return colors[severity] || 'text-white';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pothole':
        return <AlertTriangle className="w-5 h-5" />;
      case 'debris':
        return <Construction className="w-5 h-5" />;
      case 'vehicle':
        return <Car className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
      <MapContainer
        center={center}
        zoom={5}
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapBounds hazards={hazards} />

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
        >
          {hazards.map((hazard) => (
            <Marker
              key={hazard.id}
              position={[hazard.latitude, hazard.longitude]}
              icon={createCustomIcon(hazard.type, hazard.severity)}
              eventHandlers={{
                click: () => onHazardClick && onHazardClick(hazard)
              }}
            >
              <Popup className="custom-popup">
                <div className="min-w-[250px] p-2">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(hazard.type)}
                    <h3 className="text-lg font-bold text-gray-800 capitalize">
                      {hazard.type}
                    </h3>
                    <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(hazard.severity)} bg-gray-100`}>
                      {hazard.severity}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Location:</strong> {hazard.location}</p>
                    <p><strong>Status:</strong> <span className={hazard.status === 'active' ? 'text-red-600' : 'text-green-600'}>{hazard.status}</span></p>
                    <p><strong>Time:</strong> {format(new Date(hazard.timestamp), 'MMM dd, yyyy HH:mm')}</p>
                    <p><strong>Confidence:</strong> {(hazard.confidence * 100).toFixed(1)}%</p>
                    <p><strong>Description:</strong> {hazard.description}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-6 right-6 glass-card p-4 z-[1000]">
        <h4 className="text-sm font-bold mb-2">Severity Levels</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-hazard-critical"></div>
            <span className="text-xs">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-hazard-high"></div>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-hazard-medium"></div>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-hazard-low"></div>
            <span className="text-xs">Low</span>
          </div>
        </div>
      </div>

      {/* Hazard counter */}
      <div className="absolute top-6 left-6 glass-card px-4 py-2 z-[1000]">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary-orange" />
          <span className="font-semibold">{hazards.length} Active Hazards</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
