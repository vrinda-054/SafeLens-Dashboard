import React from 'react';
import { Filter, X } from 'lucide-react';

const Filters = ({ filters, onFilterChange, onClearFilters }) => {
  const hasActiveFilters = 
    filters.type !== 'all' || 
    filters.severity !== 'all' || 
    filters.status !== 'all' || 
    filters.timeRange !== 'all';

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-orange" />
          <h2 className="text-xl font-bold">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-primary-orange hover:text-primary-light transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Hazard Type Filter */}
        <div>
          <label className="block text-sm font-semibold mb-3">Hazard Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onFilterChange('type', 'all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.type === 'all'
                  ? 'bg-primary-orange text-white shadow-glow-orange'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange('type', 'pothole')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.type === 'pothole'
                  ? 'bg-primary-orange text-white shadow-glow-orange'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              🕳️ Pothole
            </button>
            <button
              onClick={() => onFilterChange('type', 'debris')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.type === 'debris'
                  ? 'bg-primary-orange text-white shadow-glow-orange'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              🚧 Debris
            </button>
            <button
              onClick={() => onFilterChange('type', 'vehicle')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.type === 'vehicle'
                  ? 'bg-primary-orange text-white shadow-glow-orange'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              🚗 Vehicle
            </button>
          </div>
        </div>

        {/* Severity Filter */}
        <div>
          <label className="block text-sm font-semibold mb-3">Severity Level</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onFilterChange('severity', 'all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.severity === 'all'
                  ? 'bg-primary-orange text-white shadow-glow-orange'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange('severity', 'critical')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.severity === 'critical'
                  ? 'bg-hazard-critical text-white'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => onFilterChange('severity', 'high')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.severity === 'high'
                  ? 'bg-hazard-high text-white'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              High
            </button>
            <button
              onClick={() => onFilterChange('severity', 'medium')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.severity === 'medium'
                  ? 'bg-hazard-medium text-white'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => onFilterChange('severity', 'low')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.severity === 'low'
                  ? 'bg-hazard-low text-white'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              Low
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-semibold mb-3">Status</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onFilterChange('status', 'all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.status === 'all'
                  ? 'bg-primary-orange text-white shadow-glow-orange'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange('status', 'active')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.status === 'active'
                  ? 'bg-primary-orange text-white shadow-glow-orange'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => onFilterChange('status', 'resolved')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filters.status === 'resolved'
                  ? 'bg-primary-orange text-white shadow-glow-orange'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Time Range Filter */}
        <div>
          <label className="block text-sm font-semibold mb-3">Time Range</label>
          <select
            value={filters.timeRange}
            onChange={(e) => onFilterChange('timeRange', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-primary-orange focus:outline-none focus:ring-2 focus:ring-primary-orange/50 transition-all"
          >
            <option value="all" className="bg-primary-blue">All Time</option>
            <option value="1h" className="bg-primary-blue">Last Hour</option>
            <option value="6h" className="bg-primary-blue">Last 6 Hours</option>
            <option value="24h" className="bg-primary-blue">Last 24 Hours</option>
            <option value="7d" className="bg-primary-blue">Last 7 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
