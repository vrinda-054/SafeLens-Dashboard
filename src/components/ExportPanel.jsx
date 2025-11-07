import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';
import { exportToCSV, exportToPDF, exportStatsJSON } from '../utils/exportUtils';

const ExportPanel = ({ hazards, stats }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async (type) => {
    setExporting(true);
    try {
      switch (type) {
        case 'csv':
          exportToCSV(hazards);
          break;
        case 'pdf':
          exportToPDF(hazards, stats);
          break;
        case 'json':
          exportStatsJSON(stats);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Download className="w-5 h-5 text-primary-orange" />
        <h2 className="text-xl font-bold">Export Reports</h2>
      </div>

      <p className="text-sm text-white/70 mb-6">
        Generate and download reports for authorities and analysis
      </p>

      <div className="space-y-4">
        {/* PDF Export */}
        <button
          onClick={() => handleExport('pdf')}
          disabled={exporting || hazards.length === 0}
          className="w-full flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-primary-orange disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="p-3 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-all">
            <FileText className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold">PDF Report</h3>
            <p className="text-xs text-white/60">
              Comprehensive report with statistics and hazard details
            </p>
          </div>
          <Download className="w-5 h-5 text-white/40 group-hover:text-primary-orange transition-colors" />
        </button>

        {/* CSV Export */}
        <button
          onClick={() => handleExport('csv')}
          disabled={exporting || hazards.length === 0}
          className="w-full flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-primary-orange disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="p-3 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-all">
            <FileSpreadsheet className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold">CSV Export</h3>
            <p className="text-xs text-white/60">
              Spreadsheet format for data analysis and processing
            </p>
          </div>
          <Download className="w-5 h-5 text-white/40 group-hover:text-primary-orange transition-colors" />
        </button>

        {/* JSON Export */}
        <button
          onClick={() => handleExport('json')}
          disabled={exporting || hazards.length === 0}
          className="w-full flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-primary-orange disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="p-3 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-all">
            <FileJson className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold">JSON Statistics</h3>
            <p className="text-xs text-white/60">
              Statistics data in JSON format for API integration
            </p>
          </div>
          <Download className="w-5 h-5 text-white/40 group-hover:text-primary-orange transition-colors" />
        </button>
      </div>

      {hazards.length === 0 && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-xs text-yellow-200">
            No data available to export. Please check your filters.
          </p>
        </div>
      )}

      {exporting && (
        <div className="mt-4 flex items-center justify-center gap-2 text-primary-orange">
          <div className="spinner"></div>
          <span className="text-sm">Generating report...</span>
        </div>
      )}
    </div>
  );
};

export default ExportPanel;
