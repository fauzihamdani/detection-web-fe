import { Button, Flex, Modal, type FormProps } from "antd";
import { useState } from "react";
import instance from "../library/axios";

interface CameraDeleteProps {
  id: string;
  modalOpen: boolean;
  handleModalClose: () => void;
}
interface CameraProps {
  rtsp_url: string;
  ipOnvif?: string | null;
  username?: string | null;
  name: string;
  password?: string | null;
  port?: number | null;
}
const CameraDeleteModal: React.FC<CameraDeleteProps> = ({
  id,
  modalOpen,
  handleModalClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete: FormProps<CameraProps>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const updatedData = await instance.put(`/camera/${id}`, values);

      console.log("updatedData => ", updatedData);
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        // title="Delete"
        open={modalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={null}
      >
        <div>
          <h4>Delete this camera?</h4>
        </div>

        <Flex justify="end" gap={"10px"} style={{ marginTop: "50px" }}>
          <Button onClick={handleModalClose}>No</Button>
          <Button danger>Yes</Button>
        </Flex>
      </Modal>
    </>
  );
};

export default CameraDeleteModal;
