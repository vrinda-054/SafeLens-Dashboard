# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to `http://localhost:3000`

---

## 🎨 What You'll See

The dashboard includes three main views:

### 1. **Live Map** 
- Interactive Leaflet map centered on India
- 8 mock hazards across major cities
- Color-coded markers by severity
- Click markers for detailed popups
- Auto-clustering for nearby hazards

### 2. **Analytics**
- Real-time statistics cards
- Pie chart for severity distribution
- Bar charts for hazard types
- Active vs Resolved comparison
- Detailed breakdown table

### 3. **Reports**
- Export to PDF (comprehensive report)
- Export to CSV (spreadsheet)
- Export to JSON (statistics)
- Filterable hazard list

---

## 🎯 Features to Try

1. **Filter hazards** by:
   - Type: Pothole, Debris, Vehicle
   - Severity: Critical, High, Medium, Low
   - Status: Active, Resolved
   - Time Range: Last hour to All time

2. **Export reports**:
   - Click Export buttons in Reports view
   - Downloads will save automatically

3. **View details**:
   - Click any marker on the map
   - Click hazard cards in list view

---

## 🔧 Configuration

### Firebase (Optional for Production)

Edit `src/services/firebase.js`:

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

### Mock Data

Currently using mock data in `src/services/hazardService.js`

To switch to Firebase:
1. Configure Firebase above
2. Uncomment production code in hazardService.js
3. Comment out mock data section

---

## 📱 Responsive Design

- **Desktop**: Full sidebar + main content
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu + stack layout

---

## 🎨 Theme Colors

The gradient theme runs from:
- Orange: `#DB6A00`
- To Blue: `#001F54`

All components use glassmorphism with this gradient as background.

---

## ⚡ Tech Stack

- React 18 + Vite
- Tailwind CSS
- Leaflet Maps
- Recharts
- Firebase
- jsPDF

---

## 🐛 Troubleshooting

**Issue**: Port 3000 already in use
**Solution**: Change port in `vite.config.js`

**Issue**: Map not loading
**Solution**: Check internet connection (map tiles load from CDN)

**Issue**: Dependencies error
**Solution**: Delete `node_modules` and run `npm install` again

---

## 📞 Need Help?

Check the full README.md for detailed documentation.

---

**Happy Coding! 🚀**
