import { Col, Flex, Row } from "antd";
import VideoPlayer from "../Components/VideoPlayer";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Detections = () => {
  // const [reloadVideo, setReloadVideo] = useState<boolean>(false);
  // const location = useLocation();
  const [videoUrls, setVideoUrls] = useState<{ [k: string]: any }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCamsid = async () => {
    try {
      const getCams = await fetch(`http://localhost:3005/api/cameras`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const camsData = await getCams.json();
      const ids = camsData.data.map((camera: { [k: string]: any }) => ({
        _id: camera._id,
        name: camera.name,
      }));
      setVideoUrls(ids);
      console.log("getCams => ", camsData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCamsid();
  }, []);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <Row gutter={16}>
          {videoUrls.map((data, index) => (
            <Col span={12} style={{ marginBottom: "2vh" }} key={index}>
              <>
                <VideoPlayer
                  url={`http://127.0.0.1:5002/detections/${data._id}`}
                  id={data._id}
                  uniqueId={index}
                  name={data.name}
                />
              </>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Detections;
