import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Map from './Map';
import Filters from './Filters';
import HazardList from './HazardList';
import Statistics from './Statistics';
import ExportPanel from './ExportPanel';
import { fetchHazards, filterHazards, getHazardStats } from '../services/hazardService';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('map');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allHazards, setAllHazards] = useState([]);
  const [filteredHazards, setFilteredHazards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHazard, setSelectedHazard] = useState(null);
  
  const [filters, setFilters] = useState({
    type: 'all',
    severity: 'all',
    status: 'all',
    timeRange: 'all'
  });

  // Fetch hazards on mount
  useEffect(() => {
    setLoading(true);
    fetchHazards((data) => {
      setAllHazards(data);
      setFilteredHazards(data);
      setLoading(false);
    });
  }, []);

  // Apply filters whenever filters or allHazards change
  useEffect(() => {
    const filtered = filterHazards(allHazards, filters);
    setFilteredHazards(filtered);
  }, [filters, allHazards]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      severity: 'all',
      status: 'all',
      timeRange: 'all'
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchHazards((data) => {
      setAllHazards(data);
      setLoading(false);
    });
  };

  const stats = getHazardStats(filteredHazards);

  return (
    <div className="flex min-h-screen bg-gradient-main">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="lg:ml-0 ml-16">
              <h2 className="text-3xl font-bold mb-2">
                {activeView === 'map' && 'Live Hazard Map'}
                {activeView === 'analytics' && 'Analytics Dashboard'}
                {activeView === 'reports' && 'Reports & Export'}
              </h2>
              <p className="text-white/70">
                {activeView === 'map' && 'Real-time visualization of road hazards across India'}
                {activeView === 'analytics' && 'Detailed statistics and insights'}
                {activeView === 'reports' && 'Generate and download reports for authorities'}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
              <div className="spinner mb-4 mx-auto"></div>
              <p className="text-white/70">Loading hazard data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Map View */}
            {activeView === 'map' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  <Filters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                  <ExportPanel hazards={filteredHazards} stats={stats} />
                </div>

                {/* Map */}
                <div className="lg:col-span-3 h-[calc(100vh-200px)]">
                  <Map
                    hazards={filteredHazards}
                    selectedHazard={selectedHazard}
                    onHazardClick={setSelectedHazard}
                  />
                </div>
              </div>
            )}

            {/* Analytics View */}
            {activeView === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <Filters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
                <div className="lg:col-span-3">
                  <Statistics stats={stats} hazards={filteredHazards} />
                </div>
              </div>
            )}

            {/* Reports View */}
            {activeView === 'reports' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Export Panel */}
                <div className="lg:col-span-1 space-y-6">
                  <Filters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                  <ExportPanel hazards={filteredHazards} stats={stats} />
                </div>

                {/* Hazard List */}
                <div className="lg:col-span-2 h-[calc(100vh-200px)]">
                  <HazardList
                    hazards={filteredHazards}
                    onHazardClick={setSelectedHazard}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
