import { useEffect, useRef, useState } from "react";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import CameraModal from "./CameraModal";

interface VideoPlayerProps {
  url: string;
  uniqueId: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, uniqueId }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [valPan, setValPan] = useState<number>(0);
  const [loadingPan, setLoadingPan] = useState<boolean>(false);
  const [record, setRecord] = useState<boolean>(false);
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedIniqueId, setSelectedUniqueId] = useState<number>(0);
  const [selectedUrl, setSelectedUrl] = useState<string>("");

  useEffect(() => {
    setSelectedUniqueId(uniqueId);
    setSelectedUrl(url);
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
    setSelectedUrl(url);
    setSelectedUniqueId(uniqueId);
    console.log("modal open opened");
  };

  const handleModalClose = () => {
    setModalOpen(false);
    console.log("modal open closed");
  };
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (imgRef.current) {
        imgRef.current.src = url;
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const handleMouseEnter = () => {
    console.log(`mouse enter ${uniqueId}`);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleImageLoading = () => {
    setLoading(false);
  };
  return (
    <div style={{ height: "100%" }}>
      {loading && (
        <div>
          <h1>loading..</h1>
        </div>
      )}
      <div
        style={{ position: "relative", zIndex: "1", height: "100%" }}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          alt="Video stream"
          style={{
            width: "100%",
            border: "1px solid black",
            position: "relative",
            zIndex: "1",
            height: "100%",
          }}
          // width="" // Adjust as necessary
          // height="360"
          onLoad={handleImageLoading}
        />

        <div
          style={{
            display: isOpen ? "" : "none",
            position: "absolute", // Absolute positioning relative to parent
            right: "0", // Start from the left of the container
            top: "0",
            width: "20%", // Make the text div span the full width of the image
            backgroundColor: "rgba(67, 63, 65, 0.5)", // Semi-transparent red background
            color: "white", // Text color
            padding: "5px", // Padding around the text
            textAlign: "center", // Center the text
            zIndex: 2, // Text will appear on top of the image
            height: "25%",
          }}
        >
          <Flex align="center" justify="space-evenly">
            <div
              style={{
                width: "70px",
                height: "85px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5px",
                }}
              >
                <Button
                  loading={loadingPan}
                  disabled={loadingPan}
                  onClick={() => handlePan(0, 0.1, 0)}
                  icon={<ArrowUpOutlined />}
                  size="small"
                ></Button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Button
                  loading={loadingPan}
                  disabled={loadingPan}
                  onClick={() => handlePan(-0.05, 0, 0)}
                  icon={<ArrowLeftOutlined />}
                  size="small"
                ></Button>
                <Button
                  loading={loadingPan}
                  disabled={loadingPan}
                  onClick={() => handlePan(0.05, 0, 0)}
                  icon={<ArrowRightOutlined />}
                  size="small"
                ></Button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <Button
                  loading={loadingPan}
                  disabled={loadingPan}
                  onClick={() => handlePan(0, -0.1, 0)}
                  icon={<ArrowDownOutlined />}
                  size="small"
                ></Button>
              </div>
            </div>
          </Flex>
        </div>
        <div
          style={{
            display: isOpen ? "" : "none",
            position: "absolute", // Absolute positioning relative to parent
            // top: "0", // Place the text at the top of the image container
            left: "0", // Start from the left of the container
            bottom: "0",
            width: "100%", // Make the text div span the full width of the image
            backgroundColor: "rgba(67, 63, 65, 0.5)", // Semi-transparent red background
            color: "white", // Text color
            padding: "5px", // Padding around the text
            textAlign: "center", // Center the text
            zIndex: 2, // Text will appear on top of the image
          }}
        >
          {/* test */}
          <div style={{ width: "100%" }}>
            <Flex align="center" justify="space-evenly">
              <Flex gap={10}>
                <Button
                  loading={loadingPan}
                  disabled={loadingPan}
                  onClick={() => handlePan(0, 0, -0.05)}
                  icon={<ZoomOutOutlined />}
                ></Button>
                <Button
                  loading={loadingPan}
                  disabled={loadingPan}
                  onClick={() => handlePan(0, 0, 0.05)}
                  icon={<ZoomInOutlined />}
                ></Button>
              </Flex>

              <div>
                <Button
                  loading={loadingRecord}
                  disabled={loadingRecord}
                  onClick={handleRecord}
                  size="small"
                >
                  {record ? "Stop Recording" : "Record"}
                </Button>
              </div>
              {/* {modalOpen && ( */}
              <div>
                <Button
                  onClick={handleModalOpen}
                  size="small"
                  disabled={modalOpen}
                >
                  full
                </Button>
              </div>
              {/* // )} */}
            </Flex>
          </div>
        </div>
      </div>

      <CameraModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        videoTitle="Test Title"
        url={selectedUrl}
        uniqueId={selectedIniqueId}
      />
    </div>
  );
};

export default VideoPlayer;
