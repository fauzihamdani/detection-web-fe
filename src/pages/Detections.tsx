import { Col, Flex, Row } from "antd";
import VideoPlayer from "../Components/VideoPlayer";

import { useEffect, useState } from "react";

const Detections = () => {
  const [valPan, setValPan] = useState<number>(0);
  const [loadingPan, setLoadingPan] = useState<boolean>(false);
  const [record, setRecord] = useState<boolean>(false);
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);
  const [reloadVideo, setReloadVideo] = useState<boolean>(false);

  useEffect(() => {
    setReloadVideo(false);

    setTimeout(() => setReloadVideo(true), 100);

    return () => {
      setReloadVideo(false);
    };
  }, []);

  return (
    <>
      <div style={{ height: "360px" }}>
        <Row gutter={16}>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            <VideoPlayer
              url="http://127.0.0.1:5002/detections/0"
              uniqueId={1}
            />
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            <VideoPlayer
              url="http://127.0.0.1:5002/detections/1"
              uniqueId={2}
            />
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            <VideoPlayer
              url="http://127.0.0.1:5002/detections/2"
              uniqueId={3}
            />
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            <VideoPlayer
              url="http://127.0.0.1:5002/detections/3"
              uniqueId={4}
            />
          </Col>
        </Row>
      </div>

      {/* <VideoPlayer url="http://10.1.1.62:5001" /> */}
      {/* <VideoPlayer url="http://127.0.0.1:5002" /> */}
    </>
  );
};

export default Detections;
