import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./layout/Layout";
import NotFound from "./pages/NotFound";
import VideosDashboard from "./pages/VideosDashboard";
import ScanOnvif from "./pages/ScanOnvif";
import Records from "./pages/Records";
import AddCamera from "./pages/AddCamera";
import WebRtc from "./pages/WebRtc";
import Detections from "./pages/Detections";

// http://10.1.1.62:5000/

function App() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (imgRef.current) {
        imgRef.current.src = "http://10.1.1.62:5000/";
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <UserLayout>
              <VideosDashboard />
            </UserLayout>
          }
        />
        <Route
          path="/scan-onvif"
          element={
            <UserLayout>
              <ScanOnvif />
            </UserLayout>
          }
        />
        <Route
          path="/records"
          element={
            <UserLayout>
              <Records />
            </UserLayout>
          }
        />
        <Route
          path="/add-camera"
          element={
            <UserLayout>
              <AddCamera />
            </UserLayout>
          }
        />
        <Route
          path="/web-rtc"
          element={
            <UserLayout>
              <WebRtc />
            </UserLayout>
          }
        />
        <Route
          path="/detections"
          element={
            <UserLayout>
              <Detections />
            </UserLayout>
          }
        />
        <Route
          path="*"
          element={
            <UserLayout>
              <NotFound />
            </UserLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
