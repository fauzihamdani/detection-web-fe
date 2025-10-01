import { Button, Flex, Form, Input, Table } from "antd";
import type React from "react";
import instance from "../library/axios";
import { useState } from "react";

interface IpFormValues {
  ip: string;
}

const ScanOnvif = () => {
  const [form] = Form.useForm<IpFormValues>();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: IpFormValues) => {
    console.log("values", values.ip);
    try {
      setLoading(true);
      const response = await instance.post("/camera-scan-2", values);
      setData(response.data.data);
    } catch (error) {
      console.log("error =>", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("ip", e.target.value);
  };

  const columns = [
    {
      title: "Manufacturer",
      dataIndex: "Manufacturer",
      key: "Manufacturer",
    },
    {
      title: "Model",
      dataIndex: "Model",
      key: "Model",
    },
    {
      title: "FirmwareVersion",
      dataIndex: "FirmwareVersion",
      key: "FirmwareVersion",
    },
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      key: "SerialNumber",
    },
    {
      title: "Ip ",
      dataIndex: "ip",
      key: "ip",
    },
  ];

  return (
    <>
      {/* <p>192.168.90.180-192.168.90.187</p> */}
      <Form form={form} autoComplete="off" onFinish={onFinish}>
        <Form.Item name={"ip"} label={"Ip"}>
          <Input
            onChange={handleIpChange}
            placeholder="placed your Onvif IP here, it can be range ip address example : 192.168.1.1-192.168.1.10"
          />
        </Form.Item>

        <Flex justify="flex-end">
          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Flex>
      </Form>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ScanOnvif;
