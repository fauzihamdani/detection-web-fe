import React, { useState } from "react";
import {
  CameraOutlined,
  FileAddFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, type MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

// const items : MenuProps["items"]=

const userItemMenu = [
  {
    key: 1,
    icon: React.createElement(CameraOutlined),
    label: <Link to={"/"}>Cameras</Link>,
    link: "/",
  },
  {
    key: 2,
    icon: React.createElement(ProfileOutlined),
    label: <Link to={"/detections"}>Detections</Link>,
    link: "/detections",
  },
  {
    key: 3,
    icon: React.createElement(FileAddFilled),
    label: <Link to={"/scan-onvif"}>Scan Onvif</Link>,
    link: "/scan-onvif",
  },
  {
    key: 4,
    icon: React.createElement(ProfileOutlined),
    label: <Link to={"/records"}>Records</Link>,
    link: "/records",
  },
  {
    key: 5,
    icon: React.createElement(ProfileOutlined),
    label: <Link to={"/add-camera"}>Add Camera</Link>,
    link: "/add-camera",
  },
];

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const nextIndexString = userItemMenu.findIndex(
    (item) => item.link === location.pathname
  );

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={userItemMenu}
          selectedKeys={[String(nextIndexString + 1)]}
        />
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Video Player",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Onvif Scanner",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        /> */}
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "86.2vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* <VideoPlayer /> */}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
