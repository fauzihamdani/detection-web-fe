import { Card, Table, Typography } from "antd";
import { useRef, useState } from "react";
import PlayerModal from "../Components/PlayerModal";

interface VideoProps {
  title: string;
  filePath: string;
}

const Records = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const handleModalOpen = (videoPath: string, videoTitle: string) => {
    setModalOpen(true);
    setSelectedVideo(videoPath);
    setSelectedTitle(videoTitle);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedVideo("");
  };
  const [videos] = useState<VideoProps[]>([
    {
      title: "2025_10_01-02_41_01_PMcam_3.mp4",
      filePath: "/videos/2025_10_02-01_24_12_PMcam_3.mp4",
    },
    {
      title: "2025_10_01-02_41_01_PMcam_4.mp4",
      filePath: "/videos/2025_10_02-01_24_12_PMcam_3.mp4",
    },
    {
      title: "2025_10_01-02_41_01_PMcam_5.mp4",
      filePath: "/videos/2025_10_02-01_24_12_PMcam_3.mp4",
    },
    {
      title: "2025_10_01-02_41_01_PMcam_6.mp4",
      filePath: "/videos/2025_10_02-01_24_12_PMcam_3.mp4",
    },
  ]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "tile",
    },
    {
      title: " Record File",
      dataIndex: "filePath",
      key: "filePath",
      render: (val: string, record: any) => {
        return (
          <>
            <Typography
              style={{ color: "#0f75f0", cursor: "pointer" }}
              color="#0f75f0"
              onClick={() => handleModalOpen(val, record.title)}
            >
              Play Record
            </Typography>{" "}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card
        style={{
          width: "100%",
          height: "10vh",
          marginBottom: "20px",
        }}
      >
        <Typography.Title level={3} style={{ margin: "0px" }}>
          Records
        </Typography.Title>
      </Card>
      <Table columns={columns} dataSource={videos} />
      <PlayerModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        filePath={selectedVideo}
        videoTitle={selectedTitle}
      />
    </>
  );
};

export default Records;
