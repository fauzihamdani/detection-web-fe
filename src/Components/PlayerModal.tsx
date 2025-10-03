import { Modal } from "antd";

interface PlayerModalProps {
  modalOpen: boolean;
  handleModalClose: () => void;
  filePath: string;
  videoTitle: string;
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  modalOpen,
  handleModalClose,
  filePath,
  videoTitle,
}) => {
  return (
    <>
      <Modal
        title={videoTitle}
        closable={{ "aria-label": "Custom Close Button" }}
        open={modalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        <video controls style={{ width: "100%", height: "100%" }}>
          <source src={filePath} typeof="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </>
  );
};

export default PlayerModal;
