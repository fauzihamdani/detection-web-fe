import { Col, Flex, Row } from "antd";
import VideoPlayer from "../Components/VideoPlayer";

import { useState } from "react";

const VideosDashboard = () => {
  const [valPan, setValPan] = useState<number>(0);
  const [loadingPan, setLoadingPan] = useState<boolean>(false);
  const [record, setRecord] = useState<boolean>(false);
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);

  const handleRecord = async () => {
    try {
      setLoadingRecord(true);
      if (record === true) {
        await fetch(
          "http://127.0.0.1:5002/stop-recording" /* "http://10.1.1.62:500/move" */,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await fetch(
          "http://127.0.0.1:5002/start-recording" /* "http://10.1.1.62:500/move" */,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRecord(false);
      setRecord(!record);
    }
  };

  const handlePan = async (
    valPanParam: number,
    valTilitParam: number,
    valzoomParam: number
  ) => {
    try {
      setLoadingPan(true);
      console.log("valPan => ", valPan);
      const res = await fetch(
        "http://127.0.0.1:5002/move",
        // "http://10.1.1.62:5001/move",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pan: valPanParam,
            tilt: valTilitParam,
            zoom: valzoomParam,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setValPan(0);
      setLoadingPan(false);
    }
  };
  return (
    <>
      <div style={{ height: "360px" }}>
        <Row gutter={16}>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            <VideoPlayer url="http://127.0.0.1:5002/stream/0" uniqueId={1} />
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            <VideoPlayer url="http://127.0.0.1:5002/stream/1" uniqueId={2} />
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            <VideoPlayer url="http://127.0.0.1:5002/stream/2" uniqueId={3} />
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            <VideoPlayer url="http://127.0.0.1:5002/stream/3" uniqueId={4} />
          </Col>
        </Row>
      </div>

      {/* <VideoPlayer url="http://10.1.1.62:5001" /> */}
      {/* <VideoPlayer url="http://127.0.0.1:5002" /> */}
    </>
  );
};

export default VideosDashboard;
