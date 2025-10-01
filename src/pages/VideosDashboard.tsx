import { Button, Flex } from "antd";
import VideoPlayer from "../Components/VideoPlayer";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const VideosDashboard = () => {
  const [valPan, setValPan] = useState<number>(0);
  const [loadingPan, setLoadingPan] = useState<boolean>(false);
  const [record, setRecord] = useState<boolean>(false);

  const handleRecord = async () => {
    try {
      if (record === true) {
        await fetch(
          "http://127.0.0.1:5002/stop-recording" /* "http://10.1.1.62:500/move" */,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({}),
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
            // body: JSON.stringify({}),
          }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
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
      <div>
        <Flex justify="space-evenly" gap={"10px"}>
          <VideoPlayer url="http://127.0.0.1:5002/obj-detection" />
          <VideoPlayer url="http://127.0.0.1:5002" />
        </Flex>

        {/* <VideoPlayer url="http://10.1.1.62:5001/obj-detection" /> */}

        <Flex align="center" justify="space-evenly">
          <div
            style={{
              width: "100px",
              height: "140px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Button
                loading={loadingPan}
                disabled={loadingPan}
                onClick={() => handlePan(0, 0.1, 0)}
                icon={<ArrowUpOutlined />}
              ></Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
              }}
            >
              <Button
                loading={loadingPan}
                disabled={loadingPan}
                onClick={() => handlePan(-0.05, 0, 0)}
                icon={<ArrowLeftOutlined />}
              ></Button>
              <Button
                loading={loadingPan}
                disabled={loadingPan}
                onClick={() => handlePan(0.05, 0, 0)}
                icon={<ArrowRightOutlined />}
              ></Button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button
                loading={loadingPan}
                disabled={loadingPan}
                onClick={() => handlePan(0, -0.1, 0)}
                icon={<ArrowDownOutlined />}
              ></Button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
            }}
          >
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
          </div>

          <div>
            <Button
              loading={loadingPan}
              disabled={loadingPan}
              onClick={handleRecord}
            >
              {record ? "Stop Recording" : "Record"}
            </Button>
          </div>
        </Flex>
      </div>

      {/* <VideoPlayer url="http://10.1.1.62:5001" /> */}
      {/* <VideoPlayer url="http://127.0.0.1:5002" /> */}
    </>
  );
};

export default VideosDashboard;
