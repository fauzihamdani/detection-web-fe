import { Modal } from "antd";
import VideoPlayer from "./VideoPlayer";

interface PlayerModalProps {
  modalOpen: boolean;
  handleModalClose: () => void;
  videoTitle: string;
  url: string;
  uniqueId: number;
  id: string;
}

const CameraModal: React.FC<PlayerModalProps> = ({
  modalOpen,
  handleModalClose,
  videoTitle,
  url,
  uniqueId,
  id,
}) => {
  return (
    <>
      <Modal
        title={videoTitle}
        closable={{ "aria-label": "Custom Close Button" }}
        open={modalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        width={"100%"}
        height={"100%"}
        style={{ top: 10 }}
        footer={null}
      >
        <div style={{ height: "80vh", backgroundColor: "red" }}>
          <VideoPlayer url={url} uniqueId={uniqueId} id={id} />
        </div>
      </Modal>
    </>
  );
};

export default CameraModal;
