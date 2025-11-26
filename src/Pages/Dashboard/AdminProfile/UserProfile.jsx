import { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Avatar, Spin, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useProfileQuery } from "../../../redux/apiSlices/authSlice";
import { useUpdateUserProfileForSuperAdminMutation } from "../../../redux/apiSlices/userSlice";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Fetch user profile
  const { data, isLoading, error } = useProfileQuery();
  const userInformation = data?.data || {};

  // Update profile mutation
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileForSuperAdminMutation();

  const name = Form.useWatch("name", form);
  const displayName =
    name || userInformation.name || userInformation.email || "User";

  // Set initial form values
  useEffect(() => {
    form.setFieldsValue({
      name: userInformation.name || "",
      email: userInformation.email || "",
      contact: userInformation.contact || "",
    });

    // Set fileList if image exists (for Upload component)
    if (userInformation?.image) {
      setFileList([
        {
          uid: "-1",
          name: "profile.jpg",
          status: "done",
          url: userInformation.image,
        },
      ]);
    }
  }, [form, userInformation]);

  if (isLoading || isUpdating) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading profile data</div>;
  }

  const onFinish = async (values) => {
    try {
      const imageFile = fileList.length > 0 ? fileList[0].originFileObj : null;
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      if (imageFile) formData.append("image", imageFile);

      const res = await updateUserProfile(formData).unwrap();

      if (res?.success) {
        toast.success(res.message || "Profile updated successfully");
      } else {
        toast.error(res.message || "Profile update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Profile update failed");
    }
  };

  // const beforeUpload = (file) => {
  //   const isImage = file.type.startsWith("image/");
  //   if (!isImage) {
  //     notification.error({
  //       message: "Invalid File Type",
  //       description: "Please upload an image file.",
  //     });
  //   }

  //   const isLessThan2MB = file.size / 1024 / 1024 < 2;
  //   if (!isLessThan2MB) {
  //     notification.error({
  //       message: "File too large",
  //       description: "Image must be smaller than 2MB.",
  //     });
  //   }

  //   return isImage && isLessThan2MB;
  // };

  return (
    <div className="flex justify-center items-center shadow-xl rounded-lg pt-5 pb-12">
      <Form
        form={form}
        layout="vertical"
        style={{ width: "80%" }}
        onFinish={onFinish}
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-5">
          {/* Profile Image */}
          <div className="col-span-2 flex justify-start items-center gap-5">
            <Form.Item style={{ marginBottom: 0 }}>
              <Upload
                name="avatar"
                showUploadList={false}
                // beforeUpload={beforeUpload}
                fileList={fileList}
                listType="picture-card"
                maxCount={1}
                onChange={({ fileList: newFileList }) =>
                  setFileList(newFileList.slice(-1))
                }
              >
                {userInformation.image ? (
                  <Avatar size={100} src={userInformation.image} />
                ) : (
                  <Avatar size={100} icon={<UploadOutlined />} />
                )}
              </Upload>
            </Form.Item>
            <h2 className="text-[24px] font-bold">{displayName}</h2>
          </div>

          {/* Name */}
          <Form.Item
            name="name"
            label="Full Name"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Enter your Full Name"
              style={{
                height: "45px",
                backgroundColor: "#f7f7f7",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            style={{ marginBottom: 0 }}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="Enter your Email"
              style={{
                height: "45px",
                backgroundColor: "#f7f7f7",
                borderRadius: "8px",
                outline: "none",
              }}
              disabled
            />
          </Form.Item>

          {/* Contact */}
          <Form.Item
            name="contact"
            label="Contact Number"
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder="Enter your Contact Number"
              style={{
                height: "45px",
                backgroundColor: "#f7f7f7",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>

          {/* Save Button */}
          <div className="col-span-2 text-end mt-6">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ height: 40 }}
              >
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
