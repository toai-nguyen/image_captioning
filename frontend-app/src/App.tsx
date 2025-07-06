import '../src/css/App.css'

import NavigationBar from './components/partials/NavigationBar';
import FooterBar from './components/partials/FooterBar';
import MainLayout from './components/layouts/MainLayout';
import ImageCaptioning from './components/pages/ImageCaptioning';
import VideoQuery from './components/pages/QueryVideo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavigationBar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<ImageCaptioning />} />
          <Route path="/video-query" element={<VideoQuery />} />
        </Routes>
      </MainLayout>
      <FooterBar />
    </Router>
  )
}

export default App;
