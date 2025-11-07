import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const Statistics = ({ stats, hazards }) => {
  // Prepare data for charts
  const severityData = [
    { name: 'Critical', value: stats.bySeverity.critical, color: '#EF4444' },
    { name: 'High', value: stats.bySeverity.high, color: '#F97316' },
    { name: 'Medium', value: stats.bySeverity.medium, color: '#F59E0B' },
    { name: 'Low', value: stats.bySeverity.low, color: '#10B981' }
  ];

  const typeData = [
    { name: 'Potholes', value: stats.byType.pothole, color: '#DB6A00' },
    { name: 'Debris', value: stats.byType.debris, color: '#001F54' },
    { name: 'Vehicles', value: stats.byType.vehicle, color: '#FF8C42' }
  ];

  const statusData = [
    { name: 'Active', value: stats.active },
    { name: 'Resolved', value: stats.resolved }
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-primary-orange">{payload[0].value} hazards</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary-orange/20">
              <Activity className="w-6 h-6 text-primary-orange" />
            </div>
            <span className="text-3xl font-bold">{stats.total}</span>
          </div>
          <h3 className="text-sm text-white/70">Total Hazards</h3>
          <p className="text-xs text-white/50 mt-1">All time</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-3xl font-bold text-red-400">{stats.active}</span>
          </div>
          <h3 className="text-sm text-white/70">Active Hazards</h3>
          <p className="text-xs text-white/50 mt-1">Require attention</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500/20">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-3xl font-bold text-green-400">{stats.resolved}</span>
          </div>
          <h3 className="text-sm text-white/70">Resolved</h3>
          <p className="text-xs text-white/50 mt-1">Successfully handled</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-hazard-critical/20">
              <TrendingUp className="w-6 h-6 text-hazard-critical" />
            </div>
            <span className="text-3xl font-bold text-hazard-critical">{stats.bySeverity.critical}</span>
          </div>
          <h3 className="text-sm text-white/70">Critical Severity</h3>
          <p className="text-xs text-white/50 mt-1">Urgent action needed</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution Pie Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Type Distribution Bar Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Hazard Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Comparison */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Active vs Resolved</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#fff" />
              <YAxis type="category" dataKey="name" stroke="#fff" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#DB6A00" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Breakdown Table */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Detailed Breakdown</h3>
          <div className="space-y-4">
            {severityData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">{item.value}</span>
                  <span className="text-sm text-white/60">
                    {stats.total > 0 ? ((item.value / stats.total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">By Type</span>
              </div>
              {typeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-2">
                  <span className="text-sm text-white/70">{item.name}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
