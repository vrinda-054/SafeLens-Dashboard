import React from 'react';
import HazardCard from './HazardCard';
import { List } from 'lucide-react';

const HazardList = ({ hazards, onHazardClick }) => {
  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <List className="w-5 h-5 text-primary-orange" />
        <h2 className="text-xl font-bold">Hazard List</h2>
        <span className="ml-auto px-3 py-1 rounded-full bg-primary-orange text-sm font-semibold">
          {hazards.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
        {hazards.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <List className="w-10 h-10 text-white/30" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No hazards found</h3>
            <p className="text-sm text-white/60">Try adjusting your filters</p>
          </div>
        ) : (
          hazards.map((hazard) => (
            <HazardCard
              key={hazard.id}
              hazard={hazard}
              onClick={onHazardClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HazardList;
