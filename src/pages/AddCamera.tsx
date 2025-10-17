import { Button, Flex, Form, Input, Table, type FormProps } from "antd";
import { useEffect, useState } from "react";
import instance from "../library/axios";
import CameraEditModal from "../Components/CameraEditModal";
import CameraDeleteModal from "../Components/CameraDeleteModal";

interface CameraProps {
  rtsp_url: string;
  ipOnvif?: string | null;
  username?: string | null;
  name: string;
  password?: string | null;
  port?: number | null;
}

const AddCamera = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGet, setLoadingGet] = useState<boolean>(false);
  const [cameras, setCameras] = useState<{ [k: string]: any }[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [selectedCamera, setSelectedCamera] = useState<CameraProps>({
    rtsp_url: "",
    name: "",
    ipOnvif: null,
    username: null,
    password: null,
    port: null,
  });

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
    {
      title: "Ip Onvif",
      dataIndex: "ipOnvif",
      key: "ipOnvif",
      render: (value: string | null | undefined) =>
        value ? value : <span> - </span>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Flex>
          <Button
            type="link"
            onClick={() => handleOpenEdit(record._id, record)}
          >
            Edit
          </Button>

          <Button
            danger
            type="link"
            onClick={() => handleOpenDelete(record._id)}
          >
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  const handleOpenEdit = (id: string, camera: CameraProps) => {
    setSelectedCamera(() => ({
      name: camera.name,
      rtsp_url: camera.rtsp_url,
      ipOnvif: camera.ipOnvif,
      username: camera.username,
      password: camera.password,
      port: camera.port,
    }));
    setModalOpenEdit(true);
    setSelectedId(id);
  };

  const handleOpenDelete = (id: string) => {
    setModalOpenDelete(true);
    setSelectedId(id);
  };

  const handleCloseEdit = () => {
    setModalOpenEdit(false);
    console.log("modal closed");
  };

  const handleCloseDelete = () => {
    setModalOpenDelete(false);
    console.log("modal closed");
  };

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

      setCameras(camerasData.data);
      setLoadingGet(false);
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoadingGet(false);
    }
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

      await instance.post("http://127.0.0.1:5002/add-camera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
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

  useEffect(() => {
    getCameras();
  }, []);

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
      <Table columns={columns} dataSource={cameras} loading={loadingGet} />
      <CameraEditModal
        id={selectedId as string}
        modalOpen={modalOpenEdit}
        handleModalClose={handleCloseEdit}
        selectedCamera={selectedCamera}
        getCamera={getCameras}
      />
      <CameraDeleteModal
        id={selectedId as string}
        modalOpen={modalOpenDelete}
        handleModalClose={handleCloseDelete}
      />
    </>
  );
};

export default AddCamera;
