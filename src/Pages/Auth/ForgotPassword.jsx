import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import keyIcon from "../../assets/key.png";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    navigate(`/auth/verify-otp?email=${values?.email}`);
  };

  return (
    <div>
      <img src={keyIcon} alt="KeyIcon" className="mb-[24px] mx-auto" />
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Forgot password?</h1>
        <p className="px-8 mx-auto text-base">
          No worries, we’ll send you reset instructions.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={
            <p
              style={{
                display: "block",
                color: "#5C5C5C",
              }}
              htmlFor="email"
              className="font-semibold "
            >
              Email
            </p>
          }
          name="email"
          id="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email address"
            style={{
              height: 45,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
              borderRadius: "8px",
              borderColor: "#2C2A5B",
            }}
          />
        </Form.Item>

        <Form.Item>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 45,
              fontWeight: "400px",
              fontSize: "18px",
              borderRadius: "8px",
              marginTop: 20,
            }}
            className="flex items-center justify-center border border-primary bg-primary rounded-lg hover:bg-white text-white hover:text-primary transition"
          >
            Submit
          </button>
        </Form.Item>
      </Form>
      <div className="">
        <Link
          to="/auth/login"
          className="flex items-center justify-center gap-1 text-[#667085] hover:text-primary text-center mt-4"
        >
          <ArrowLeft size={20} />
          <p>Back to log in</p>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
