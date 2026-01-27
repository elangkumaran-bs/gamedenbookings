import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import SnowfallBackground from './components/SnowfallBackground';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <SnowfallBackground />
        <div className="relative z-10">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
