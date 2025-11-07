import React from 'react';
import { MapPin, BarChart3, FileText, Shield, Menu, X } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'map', label: 'Live Map', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 rounded-lg glass-card"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-72 glass-card
          transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col p-6
        `}
      >
        {/* Logo / Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary-orange to-primary-blue">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">SafeLens</h1>
              <p className="text-xs text-white/60">Real-time Safety Network</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-300 font-medium
                  ${
                    activeView === item.id
                      ? 'bg-primary-orange text-white shadow-glow-orange'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-white/60 mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow"></div>
            <span className="text-sm font-semibold text-green-400">Live</span>
          </div>
          <p className="text-xs text-white/40 mt-2">
            Real-time data from Firebase
          </p>
        </div>

        {/* Version */}
        <div className="mt-4 text-center text-xs text-white/40">
          v1.0.0 - Dashboard
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
