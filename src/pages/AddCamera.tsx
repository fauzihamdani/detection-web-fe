import { Button, Flex, Form, Input, Table, type FormProps } from "antd";
import { useState } from "react";
import instance from "../library/axios";

type CameraProps = {
  rtsp_url: string;
  ipOnvif?: string;
  username?: string;
  name?: string;
  password?: string;
  port?: number;
};

const AddCamera = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGet, setLoadingGet] = useState<boolean>(false);
  const [cameras, setCameras] = useState<{ [k: string]: any }[]>([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rtsp Url",
      dataIndex: "rtsp_url",
      key: "rtsp_url",
    },
  ];
  const getCameras = async () => {
    try {
      setLoadingGet(true);
      const getCameras = await fetch(`http://localhost:3005/api/cameras`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const camerasData = await getCameras.json();

      setCameras([...camerasData]);
    } catch (error) {}
  };

  const onFinish: FormProps<CameraProps>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      if (values.port) {
        values.port = parseInt(values.port as unknown as string, 10); // Converts the port to a number
      }
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== "" && value !== undefined
        )
      );
      const response = await instance.post("/camera", filteredValues);

      const responsePython = await instance.post(
        "http://127.0.0.1:5002/add-camera",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        }
      );
      console.log(responsePython);
      console.log(response);
    } catch (error) {
      console.log("error =>", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<CameraProps>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Success:", errorInfo);
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<CameraProps>
          label="Camera Name"
          name={"name"}
          rules={[{ required: true, message: "Please input your camera name" }]}
        >
          <Input placeholder="Name your camera" />
        </Form.Item>

        <Form.Item<CameraProps>
          label="Rtsp"
          name={"rtsp_url"}
          rules={[{ required: true, message: "Please input your Rtsp url" }]}
        >
          <Input placeholder="Place your RTSP here" />
        </Form.Item>

        <Form.Item<CameraProps> label="Ip Onvif" name={"ipOnvif"}>
          <Input placeholder="Place your Onvif IP here" />
        </Form.Item>

        <Form.Item<CameraProps> label="Onvif User" name={"username"}>
          <Input placeholder="Place your Onvif User here" />
        </Form.Item>

        <Form.Item<CameraProps> label="Onvif Password" name={"password"}>
          <Input.Password placeholder="Your Onvif password" />
        </Form.Item>

        <Form.Item<CameraProps> label="Port" name={"port"}>
          <Input placeholder="Place your Onvif User here" />
        </Form.Item>

        <Flex justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Flex>
      </Form>

      <Table columns={columns} />
    </>
  );
};

export default AddCamera;
