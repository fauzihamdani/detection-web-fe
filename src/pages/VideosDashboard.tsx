import { Col, Flex, Row } from "antd";
import VideoPlayer from "../Components/VideoPlayer";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VideosDashboard = () => {
  const [valPan, setValPan] = useState<number>(0);
  const [loadingPan, setLoadingPan] = useState<boolean>(false);
  const [record, setRecord] = useState<boolean>(false);
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);
  const [reloadVideo, setReloadVideo] = useState<boolean>(false);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const location = useLocation();
  // const videoUrls = [
  //   {
  //     id: "68ccf99d5def214f410f978f",
  //     link_rtsp: "http://127.0.0.1:5002/stream/68ccf99d5def214f410f978f",
  //   },
  //   {
  //     id: "68eaa7161a0f2f3a7e997773",
  //     link_rtsp: "http://127.0.0.1:5002/stream/68eaa7161a0f2f3a7e997773",
  //   },
  //   {
  //     id: "68eaa71d1a0f2f3a7e997774",
  //     link_rtsp: "http://127.0.0.1:5002/stream/68eaa71d1a0f2f3a7e997774",
  //   },
  //   {
  //     id: "68eaa7201a0f2f3a7e997775",
  //     link_rtsp: "http://127.0.0.1:5002/stream/68eaa7201a0f2f3a7e997775",
  //   },
  // ];

  const getCamsid = async () => {
    const getCams = await fetch(`http://localhost:3005/api/cameras`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const camsData = await getCams.json();
    const ids = camsData.data.map((camera: { [k: string]: any }) => camera._id);
    setVideoUrls(ids);
    console.log("getCams => ", camsData);
  };

  useEffect(() => {
    getCamsid();
  }, []);

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
    };
  }, [location]);
  return (
    <>
      <div style={{ height: "360px" }}>
        {/*         
        {videoUrls.map((url, index) => (
          <>
            <h1>{url}</h1>
          </>
        ))} */}
        <Row gutter={16}>
          {videoUrls.map((url, index) => (
            <Col span={12} style={{ marginBottom: "2vh" }} key={index}>
              {reloadVideo && (
                <>
                  <VideoPlayer
                    url={`http://127.0.0.1:5002/stream/${url}`}
                    id={url}
                    uniqueId={index}
                  />
                </>
              )}
            </Col>
          ))}
          {/* <Col span={12} style={{ marginBottom: "2vh" }}>
            {reloadVideo && (
              <VideoPlayer url="http://127.0.0.1:5002/stream/0" uniqueId={1} />
            )}
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            {reloadVideo && (
              <VideoPlayer url="http://127.0.0.1:5002/stream/1" uniqueId={2} />
            )}
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            {reloadVideo && (
              <VideoPlayer url="http://127.0.0.1:5002/stream/2" uniqueId={3} />
            )}
          </Col>
          <Col span={12} style={{ marginBottom: "2vh" }}>
            {reloadVideo && (
              <VideoPlayer url="http://127.0.0.1:5002/stream/3" uniqueId={4} />
            )}
          </Col> */}
        </Row>
      </div>

      {/* <VideoPlayer url="http://10.1.1.62:5001" /> */}
      {/* <VideoPlayer url="http://127.0.0.1:5002" /> */}
    </>
  );
};

export default VideosDashboard;
