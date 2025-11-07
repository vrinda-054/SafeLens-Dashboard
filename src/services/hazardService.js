import { database, ref, onValue, query, orderByChild } from './firebase';

// Mock data for development (replace with actual Firebase calls)
export const mockHazards = [
  {
    id: '1',
    type: 'pothole',
    severity: 'critical',
    latitude: 28.6139,
    longitude: 77.2090,
    location: 'Connaught Place, New Delhi',
    timestamp: new Date('2024-01-15T10:30:00').getTime(),
    reportedBy: 'User_A123',
    status: 'active',
    confidence: 0.92,
    description: 'Large pothole causing traffic disruption',
    imageUrl: null
  },
  {
    id: '2',
    type: 'debris',
    severity: 'high',
    latitude: 19.0760,
    longitude: 72.8777,
    location: 'Marine Drive, Mumbai',
    timestamp: new Date('2024-01-15T11:15:00').getTime(),
    reportedBy: 'User_B456',
    status: 'active',
    confidence: 0.87,
    description: 'Construction debris blocking right lane',
    imageUrl: null
  },
  {
    id: '3',
    type: 'vehicle',
    severity: 'medium',
    latitude: 12.9716,
    longitude: 77.5946,
    location: 'MG Road, Bangalore',
    timestamp: new Date('2024-01-15T09:45:00').getTime(),
    reportedBy: 'User_C789',
    status: 'resolved',
    confidence: 0.95,
    description: 'Stalled vehicle on main road',
    imageUrl: null
  },
  {
    id: '4',
    type: 'pothole',
    severity: 'high',
    latitude: 13.0827,
    longitude: 80.2707,
    location: 'Anna Salai, Chennai',
    timestamp: new Date('2024-01-15T08:20:00').getTime(),
    reportedBy: 'User_D012',
    status: 'active',
    confidence: 0.89,
    description: 'Multiple potholes in succession',
    imageUrl: null
  },
  {
    id: '5',
    type: 'debris',
    severity: 'medium',
    latitude: 22.5726,
    longitude: 88.3639,
    location: 'Park Street, Kolkata',
    timestamp: new Date('2024-01-15T12:00:00').getTime(),
    reportedBy: 'User_E345',
    status: 'active',
    confidence: 0.84,
    description: 'Fallen tree branches on road',
    imageUrl: null
  },
  {
    id: '6',
    type: 'vehicle',
    severity: 'critical',
    latitude: 17.3850,
    longitude: 78.4867,
    location: 'Hitech City, Hyderabad',
    timestamp: new Date('2024-01-15T13:30:00').getTime(),
    reportedBy: 'User_F678',
    status: 'active',
    confidence: 0.96,
    description: 'Accident blocking two lanes',
    imageUrl: null
  },
  {
    id: '7',
    type: 'pothole',
    severity: 'low',
    latitude: 23.0225,
    longitude: 72.5714,
    location: 'SG Highway, Ahmedabad',
    timestamp: new Date('2024-01-14T16:45:00').getTime(),
    reportedBy: 'User_G901',
    status: 'active',
    confidence: 0.78,
    description: 'Small pothole near junction',
    imageUrl: null
  },
  {
    id: '8',
    type: 'debris',
    severity: 'low',
    latitude: 26.9124,
    longitude: 75.7873,
    location: 'MI Road, Jaipur',
    timestamp: new Date('2024-01-14T14:20:00').getTime(),
    reportedBy: 'User_H234',
    status: 'resolved',
    confidence: 0.81,
    description: 'Minor debris cleared',
    imageUrl: null
  }
];

// Fetch all hazards
export const fetchHazards = (callback) => {
  // For development, use mock data
  setTimeout(() => {
    callback(mockHazards);
  }, 500);

  // Production code:
  // const hazardsRef = ref(database, 'hazards');
  // onValue(hazardsRef, (snapshot) => {
  //   const data = snapshot.val();
  //   const hazardsArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
  //   callback(hazardsArray);
  // });
};

// Filter hazards by criteria
export const filterHazards = (hazards, filters) => {
  return hazards.filter(hazard => {
    // Filter by type
    if (filters.type && filters.type !== 'all' && hazard.type !== filters.type) {
      return false;
    }

    // Filter by severity
    if (filters.severity && filters.severity !== 'all' && hazard.severity !== filters.severity) {
      return false;
    }

    // Filter by status
    if (filters.status && filters.status !== 'all' && hazard.status !== filters.status) {
      return false;
    }

    // Filter by time range
    if (filters.timeRange) {
      const now = Date.now();
      const hazardTime = hazard.timestamp;
      
      switch (filters.timeRange) {
        case '1h':
          if (now - hazardTime > 3600000) return false;
          break;
        case '6h':
          if (now - hazardTime > 21600000) return false;
          break;
        case '24h':
          if (now - hazardTime > 86400000) return false;
          break;
        case '7d':
          if (now - hazardTime > 604800000) return false;
          break;
        default:
          break;
      }
    }

    return true;
  });
};

// Get statistics
export const getHazardStats = (hazards) => {
  const stats = {
    total: hazards.length,
    active: hazards.filter(h => h.status === 'active').length,
    resolved: hazards.filter(h => h.status === 'resolved').length,
    bySeverity: {
      critical: hazards.filter(h => h.severity === 'critical').length,
      high: hazards.filter(h => h.severity === 'high').length,
      medium: hazards.filter(h => h.severity === 'medium').length,
      low: hazards.filter(h => h.severity === 'low').length
    },
    byType: {
      pothole: hazards.filter(h => h.type === 'pothole').length,
      debris: hazards.filter(h => h.type === 'debris').length,
      vehicle: hazards.filter(h => h.type === 'vehicle').length
    }
  };

  return stats;
};
