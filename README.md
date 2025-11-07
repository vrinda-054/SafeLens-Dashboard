# HazardSense Dashboard

A real-time road hazard detection and visualization dashboard built with React, Tailwind CSS, and Leaflet.

## 🚀 Features

- **Live Map View**: Real-time visualization of road hazards across India using Leaflet maps
- **Advanced Filtering**: Filter hazards by type (pothole, debris, vehicle), severity (critical, high, medium, low), status, and time range
- **Analytics Dashboard**: Comprehensive statistics with interactive charts and graphs
- **Report Generation**: Export data in PDF, CSV, and JSON formats for authorities
- **Responsive Design**: Fully responsive with mobile-friendly navigation
- **Real-time Updates**: Firebase integration for live data streaming
- **Beautiful UI**: Glassmorphism design with gradient theme (#DB6A00 to #001F54)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for production use)

## 🛠️ Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd SafeLens-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase** (Optional - for production)
   
   Edit `src/services/firebase.js` and replace the placeholder values with your Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     databaseURL: "YOUR_DATABASE_URL",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
SafeLens-Dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Main dashboard container
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── Map.jsx            # Leaflet map component
│   │   ├── Filters.jsx        # Filter controls
│   │   ├── HazardCard.jsx     # Individual hazard card
│   │   ├── HazardList.jsx     # List of hazards
│   │   ├── Statistics.jsx     # Analytics charts
│   │   └── ExportPanel.jsx    # Export functionality
│   ├── services/
│   │   ├── firebase.js        # Firebase configuration
│   │   └── hazardService.js   # Hazard data service
│   ├── utils/
│   │   └── exportUtils.js     # Export utilities (PDF, CSV, JSON)
│   ├── App.jsx                # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## 🎨 Color Scheme

- **Primary Gradient**: `linear-gradient(135deg, #DB6A00, #001F54)`
- **Primary Orange**: `#DB6A00`
- **Primary Blue**: `#001F54`
- **Critical**: `#EF4444` (Red)
- **High**: `#F97316` (Orange)
- **Medium**: `#F59E0B` (Amber)
- **Low**: `#10B981` (Green)

## 📊 Mock Data

The dashboard currently uses mock data for development. The mock data includes:
- 8 sample hazards across major Indian cities
- Mix of potholes, debris, and vehicle hazards
- Various severity levels and statuses

To switch to production Firebase data:
1. Configure Firebase as mentioned above
2. Uncomment the production code in `src/services/hazardService.js`
3. Comment out the mock data implementation

## 🗺️ Map Features

- **Marker Clustering**: Automatically groups nearby hazards
- **Custom Icons**: Color-coded markers based on severity
- **Interactive Popups**: Detailed information on click
- **Auto-fit Bounds**: Automatically adjusts to show all hazards
- **Legend**: Visual guide for severity levels

## 📈 Analytics Features

- **Severity Distribution**: Pie chart showing hazard breakdown
- **Type Distribution**: Bar chart of hazard types
- **Status Comparison**: Active vs resolved hazards
- **Detailed Statistics**: Real-time counts and percentages

## 📤 Export Options

1. **PDF Report**: Comprehensive report with statistics and hazard table
2. **CSV Export**: Spreadsheet format for data analysis
3. **JSON Statistics**: Machine-readable format for API integration

## 🚀 Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🔧 Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Leaflet**: Interactive maps
- **React-Leaflet**: React wrapper for Leaflet
- **Recharts**: Chart library
- **Firebase**: Real-time database
- **jsPDF**: PDF generation
- **date-fns**: Date formatting
- **Lucide React**: Icon library

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Real-time notifications
- [ ] Hazard verification workflow
- [ ] Historical data analysis
- [ ] Heatmap visualization
- [ ] Admin panel for hazard management
- [ ] Integration with navigation apps

## 📝 License

This project is part of the HazardSense road safety initiative.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📧 Contact

For questions or support, please contact the HazardSense team.

---

**Built with ❤️ for safer roads in India**
