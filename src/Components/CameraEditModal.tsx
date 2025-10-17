import { Button, Flex, Form, Input, Modal, type FormProps } from "antd";
import { useEffect, useState } from "react";
import instance from "../library/axios";

interface CameraProps {
  rtsp_url: string;
  ipOnvif?: string | null;
  username?: string | null;
  name: string;
  password?: string | null;
  port?: number | null;
}

interface CameraUpdateProps {
  id: string;
  modalOpen: boolean;
  handleModalClose: () => void;
  selectedCamera: CameraProps;
  getCamera: () => void;
}

const CameraEditModal: React.FC<CameraUpdateProps> = ({
  id,
  modalOpen,
  handleModalClose,
  selectedCamera,
  getCamera,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldValue("name", selectedCamera.name);
    form.setFieldValue("rtsp_url", selectedCamera.rtsp_url);
    form.setFieldValue("ipOnvif", selectedCamera.ipOnvif);
    form.setFieldValue("username", selectedCamera.username);
    form.setFieldValue("password", selectedCamera.password);
    form.setFieldValue("port", selectedCamera.port);
  }, [modalOpen]);

  const onFinish: FormProps<CameraProps>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const updatedData = await instance.put(`/camera/${id}`, values);
      await instance.post(`http://127.0.0.1:5002/updated-camera/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData.data.data),
      });
      getCamera();
      console.log("updatedData => ", updatedData.data.data);
      handleModalClose();
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Update"
        open={modalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form
          form={form}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item<CameraProps>
            label="Camera Name"
            name={"name"}
            rules={[
              { required: true, message: "Please input your camera name" },
            ]}
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
                Update
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default CameraEditModal;
