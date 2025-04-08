import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HeroSection from "./components/heroSection/HeroSection";
import StorySection from "./components/storySection/StorySection";
import Footer from "./components/footer/Footer";
import TextsSection from "./components/textsSection/TextsSection";
import StoryDetail from "./components/storyDetail/StoryDetail";
import ReadingMode from "./components/readingMode/ReadingMode";
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import TextDetailPage from "./components/textDetailPage/TextDetailPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <HeroSection />
              <StorySection />
              <TextsSection />
              <Footer />
            </>
          } />
          <Route path="/story/:id" element={
            <>
              <Navbar />
              <StoryDetail />
              <Footer />
            </>
          }/>
          <Route path="/story/:id/read" element={
            <ReadingMode />
          }/>
          <Route path="/details/:id" element={
            <TextDetailPage />
          }/>
        </Routes>
      </div>
      <ScrollToTop />
    </Router>
  );
}

export default App;