import { Col, Flex, Row } from "antd";
import VideoPlayer from "../Components/VideoPlayer";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Detections = () => {
  const [valPan, setValPan] = useState<number>(0);
  const [loadingPan, setLoadingPan] = useState<boolean>(false);
  const [record, setRecord] = useState<boolean>(false);
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);
  const [reloadVideo, setReloadVideo] = useState<boolean>(false);
  const location = useLocation();
  // window.location.reload();
  const [hasReloaded, setHasReloaded] = useState(false);

  // const videoUrls = [
  //   "http://127.0.0.1:5002/detections/0",
  //   "http://127.0.0.1:5002/detections/1",
  //   "http://127.0.0.1:5002/detections/2",
  //   "http://127.0.0.1:5002/detections/3",
  // ];

  // const videoUrls = [
  //   { id: "0", link_rtsp: "http://127.0.0.1:5002/detections/0" },
  //   { id: "1", link_rtsp: "http://127.0.0.1:5002/detections/1" },
  //   { id: "2", link_rtsp: "http://127.0.0.1:5002/detections/2" },
  //   { id: "3", link_rtsp: "http://127.0.0.1:5002/detections/3" },
  // ];

  const videoUrls = [
    {
      id: "68ccf99d5def214f410f978f",
      link_rtsp: "http://127.0.0.1:5002/detections/68ccf99d5def214f410f978f",
    },
    {
      id: "68eaa7161a0f2f3a7e997773",
      link_rtsp: "http://127.0.0.1:5002/detections/68eaa7161a0f2f3a7e997773",
    },
    {
      id: "68eaa71d1a0f2f3a7e997774",
      link_rtsp: "http://127.0.0.1:5002/detections/68eaa71d1a0f2f3a7e997774",
    },
    {
      id: "68eaa7201a0f2f3a7e997775",
      link_rtsp: "http://127.0.0.1:5002/detections/68eaa7201a0f2f3a7e997775",
    },
  ];

  useEffect(() => {
    setReloadVideo(false);

    setTimeout(() => setReloadVideo(true), 100);

    return () => {
      setReloadVideo(false);
    };
  }, []);

  useEffect(() => {
    setReloadVideo(false);
    return () => {
      console.log("unmounted");
      setReloadVideo(false);
      // window.location.reload();
    };
  }, [location]);

  return (
    <>
      <div style={{ height: "360px" }}>
        <Row gutter={16}>
          {videoUrls.map((url, index) => (
            <Col span={12} style={{ marginBottom: "2vh" }} key={index}>
              {reloadVideo && (
                <VideoPlayer url={url.link_rtsp} uniqueId={index} id={url.id} />
              )}
            </Col>
          ))}
          {/* <Col span={12} style={{ marginBottom: "2vh" }}>
            {reloadVideo && (
              <VideoPlayer
                url="http://127.0.0.1:5002/detections/0"
                uniqueId={5}
              />
            )}
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            {reloadVideo && (
              <VideoPlayer
                url="http://127.0.0.1:5002/detections/1"
                uniqueId={6}
              />
            )}
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            {reloadVideo && (
              <VideoPlayer
                url="http://127.0.0.1:5002/detections/2"
                uniqueId={7}
              />
            )}
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            {reloadVideo && (
              <VideoPlayer
                url="http://127.0.0.1:5002/detections/3"
                uniqueId={8}
              />
            )}
          </Col> */}
        </Row>
      </div>

      {/* <VideoPlayer url="http://10.1.1.62:5001" /> */}
      {/* <VideoPlayer url="http://127.0.0.1:5002" /> */}
    </>
  );
};

export default Detections;
