import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { userService } from "../../Services/userService";

function ResetPassword(){
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    useEffect(() => {
        if (!email) {
        navigate("/forgot-password");
    }
  }, [email, navigate]);
    const handleSubmit = async (values: { newPassword: string, confirmPassword: string }) => {
        const { newPassword, confirmPassword } = values;
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            const response = await userService.resetPassword(email, newPassword);
            toast.success(response.data.message ?? "Password reset successfully");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    }
    return (
        <>
        <ToastContainer />
        <Form
        onFinish={handleSubmit} 
        layout="vertical"
        name="form-reset-password"
        initialValues={{ remember: true }}
        style={{ maxWidth: 500, margin: 'auto', padding: '50px', background: "white", borderRadius: '8px', marginTop: "100px", textAlign: 'center' }}
        >
            <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
            <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: 'Please input your new password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['newPassword']}
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}>
                <Input.Password />
            </Form.Item>
            <FormItem>
                <Button type="primary" htmlType="submit">
                    Reset Password
                </Button>
            </FormItem>
        </Form>
        </>
    )
}
export default ResetPassword;