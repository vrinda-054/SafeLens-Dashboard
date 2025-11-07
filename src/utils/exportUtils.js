import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

// Export hazards data as CSV
export const exportToCSV = (hazards, filename = 'hazards-report') => {
  const headers = ['ID', 'Type', 'Severity', 'Location', 'Status', 'Timestamp', 'Confidence', 'Reported By', 'Description'];
  
  const rows = hazards.map(hazard => [
    hazard.id,
    hazard.type,
    hazard.severity,
    hazard.location,
    hazard.status,
    format(new Date(hazard.timestamp), 'yyyy-MM-dd HH:mm:ss'),
    `${(hazard.confidence * 100).toFixed(1)}%`,
    hazard.reportedBy,
    hazard.description
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export hazards data as PDF
export const exportToPDF = (hazards, stats, filename = 'hazards-report') => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(219, 106, 0);
  doc.text('SafeLens Report', 14, 20);
  
  // Add generation date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy HH:mm')}`, 14, 28);
  
  // Add statistics summary
  doc.setFontSize(14);
  doc.setTextColor(0, 31, 84);
  doc.text('Summary Statistics', 14, 40);
  
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(`Total Hazards: ${stats.total}`, 14, 48);
  doc.text(`Active: ${stats.active}`, 14, 54);
  doc.text(`Resolved: ${stats.resolved}`, 14, 60);
  
  doc.text(`Critical: ${stats.bySeverity.critical}`, 80, 48);
  doc.text(`High: ${stats.bySeverity.high}`, 80, 54);
  doc.text(`Medium: ${stats.bySeverity.medium}`, 80, 60);
  doc.text(`Low: ${stats.bySeverity.low}`, 80, 66);
  
  doc.text(`Potholes: ${stats.byType.pothole}`, 140, 48);
  doc.text(`Debris: ${stats.byType.debris}`, 140, 54);
  doc.text(`Vehicles: ${stats.byType.vehicle}`, 140, 60);
  
  // Add hazards table
  const tableData = hazards.map(hazard => [
    hazard.id,
    hazard.type,
    hazard.severity,
    hazard.location,
    hazard.status,
    format(new Date(hazard.timestamp), 'yyyy-MM-dd HH:mm'),
    `${(hazard.confidence * 100).toFixed(1)}%`
  ]);
  
  doc.autoTable({
    startY: 75,
    head: [['ID', 'Type', 'Severity', 'Location', 'Status', 'Time', 'Confidence']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [219, 106, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    styles: {
      fontSize: 8,
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 50 },
      4: { cellWidth: 20 },
      5: { cellWidth: 35 },
      6: { cellWidth: 20 }
    }
  });
  
  // Save PDF
  doc.save(`${filename}-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

// Export statistics as JSON
export const exportStatsJSON = (stats, filename = 'hazards-stats') => {
  const jsonContent = JSON.stringify(stats, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${format(new Date(), 'yyyy-MM-dd')}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
