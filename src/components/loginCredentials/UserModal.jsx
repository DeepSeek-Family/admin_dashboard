import React, { useEffect } from "react";
import { Modal, Form, Input, Row, Col, Select } from "antd";

const { Option } = Select;

const UserModal = ({
  visible,
  onCancel,
  onSave,
  form,
  roles,
  record,
  isEdit = false,
}) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [record, form]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={700}
      onOk={onSave}
      okText={isEdit ? "Save Changes" : "Add User"}
    >
      <div className="flex flex-col gap-2 w-full rounded-md mb-8">
        <p className="text-[22px] font-bold">
          {isEdit ? "Edit User" : "Add New User"}
        </p>
        <Form form={form} layout="vertical" className="mb-4">
          <Row gutter={[30, 20]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="User Name"
                className="custom-form-item-ant"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input
                  placeholder="Enter User Name"
                  className="custom-input-ant-modal"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email"
                className="custom-form-item-ant"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input
                  placeholder="Enter Email"
                  className="custom-input-ant-modal"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="password"
                label="Password"
                className="custom-form-item-ant"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input.Password
                  placeholder="Enter Password"
                  className="custom-input-ant-modal"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                className="custom-form-item-ant"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input
                  placeholder="Enter Phone Number"
                  className="custom-input-ant-modal"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="role"
                label="Role"
                className="custom-form-item-ant-select"
                rules={[{ required: true, message: "Please select role" }]}
              >
                <Select
                  placeholder="Select Role"
                  className="custom-select-ant-modal"
                >
                  {roles.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="status"
                label="Select Page Access Control"
                className="custom-form-item-ant-select"
              >
                <Select
                  placeholder="Select Access Level"
                  className="custom-select-ant-modal"
                >
                  <Option value="Active">Full</Option>
                  <Option value="Inactive">Dashboard</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default UserModal;
