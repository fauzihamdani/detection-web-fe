import { Button, Flex } from "antd";
import VideoPlayer from "../Components/VideoPlayer";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
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
    // // const selectedSlug = slug === 'pan' &&
    // const newValPan =
    //   flag === "add"
    //     ? slug === "pan"
    //       ? valPan + 0.05
    //       : valTilt + 0.05
    //     : slug === "tilt"
    //     ? valPan - 0.05
    //     : valTilt - 0.05;
    // setValPan(newValPan);
    try {
      setLoadingPan(true);
      // setValPan((prev) => {
      //   const newVal = prev + 0.1;
      //   // console.log(newVal);
      //   return newVal;
      // });
      console.log("valPan => ", valPan);
      const res = await fetch(
        "http://127.0.0.1:5002/move" /* "http://10.1.1.62:500/move" */,
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
      <Flex gap={"middle"} align="space-between">
        <VideoPlayer url="http://127.0.0.1:5002/obj-detection" />
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

      <VideoPlayer url="http://127.0.0.1:5002" />
      <VideoPlayer url="http://127.0.0.1:5002" />
    </>
  );
};

export default VideosDashboard;
