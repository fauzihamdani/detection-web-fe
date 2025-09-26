import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./layout/Layout";
import VideoPlayer from "./Components/VideoPlayer";
import NotFound from "./pages/NotFound";
import { Button, Flex } from "antd";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import VideosDashboard from "./pages/VideosDashboard";

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
