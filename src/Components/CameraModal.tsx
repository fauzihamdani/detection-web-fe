import { Modal } from "antd";
import VideoPlayer from "./VideoPlayer";

interface PlayerModalProps {
  modalOpen: boolean;
  handleModalClose: () => void;
  videoTitle: string;
  url: string;
  uniqueId: number;
  id: string;
  name: string;
}

const CameraModal: React.FC<PlayerModalProps> = ({
  modalOpen,
  handleModalClose,
  videoTitle,
  url,
  uniqueId,
  id,
  name,
}) => {
  return (
    <>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={modalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        width={"100%"}
        height={"100%"}
        style={{ top: 10 }}
        footer={null}
      >
        <div>
          <VideoPlayer url={url} uniqueId={uniqueId} id={id} name={name} />
        </div>
      </Modal>
    </>
  );
};

export default CameraModal;
