import { Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
import image4 from "../../assets/image4.png";
import { useLoginMutation } from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      const res = await login(values).unwrap();
      console.log("Login response:", res);
      if (res.success || res.data.accessToken) {
        toast.success(res.message || "Login successful");
        localStorage.setItem("accessToken", res.data.accessToken);
        console.log("navigate to home");
        navigate("/dashboard");
      } else {
        toast.error(res.message || "Login failed");
        return;
      }
    } catch (error) {
      toast.error(error?.data?.message || "Login failed");
      return;
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <img src={image4} alt="logo" className="px-16 mx-auto" />
        {/* <h1 className="text-[25px] font-semibold mb-[10px] mt-[20px]">
          Merchants Dashboard
        </h1> */}
        <p className="mt-6">Welcome back! Please enter your details.</p>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
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
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          className="custom-form-item"
        >
          <Input
            placeholder="Enter your password"
            style={{
              height: 50,
              border: "1px solid #2C2A5B",
              outline: "none",
              boxShadow: "none",
              borderRadius: "8px",
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={
            <p
              style={{
                display: "block",
                color: "#5C5C5C",
              }}
              htmlFor="email"
              className="font-semibold "
            >
              Password
            </p>
          }
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              height: 50,
              border: "1px solid #2C2A5B",
              outline: "none",
              boxShadow: "none",
              borderRadius: "8px",
            }}
          />
        </Form.Item>

        {error && (
          <p
            style={{ color: "red", marginBottom: "10px", textAlign: "center" }}
          >
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            {/* <Checkbox>Remember me</Checkbox> */}
          </Form.Item>

          <a
            className="login-form-forgot text-[#1E1E1E] hover:text-primary rounded-md font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 50,
              fontWeight: "400px",
              fontSize: "18px",
              marginTop: 20,
              borderRadius: "8px",
            }}
            className="flex items-center justify-center border border-primary bg-primary hover:bg-white text-white hover:text-primary transition"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
