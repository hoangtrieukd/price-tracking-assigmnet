import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarketScreen from '../screens/market/MarketScreen';

export default function RouteContainer() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MarketScreen />} />
      </Routes>
    </Router>
  );
}
