import { Button, Form, Input, Spin } from "antd";
import { userService } from "../../Services/userService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (values: { email: string }) => {
        setLoading(true);
        try {
            const email = values.email
            const response = await userService.sendEmail(email);
            toast.success(response.data.message ?? "Send Email Successed")
            setTimeout(() => {
                Navigate('/verify-otp', {
                    state: {
                        email,
                        expireSeconds: response.data.expireSeconds,
                    },
                })
            },1000)
            
        } catch (error) {   
            console.error("Error sending email:", error);
            setLoading(false);
            // You can handle the error here, e.g., show a notification or alert
        }

    }
    return (
       <>
       <ToastContainer />
       <Form
              name="forgot-password"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              style={{ maxWidth: 400, margin: 'auto', padding: '50px',background:"white", borderRadius: '8px' , marginTop: "100px", textAlign: 'center' }}
       >    
                <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item>
                {!loading ? (
                        <Button type="primary" htmlType="submit">
                            Send Email
                        </Button>
                ) : (
                    <Spin />
                )}
              </Form.Item>
       </Form>
       </>
    );
};

export default ForgotPassword;
