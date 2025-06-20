import { Button, Card, Form, Input } from "antd";
import "../../assets/scss/login.scss"
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../Services/userService";
import { toast, ToastContainer } from "react-toastify";
function Login(){
    const navigate = useNavigate();
    const handleSubmit = async (Values: any) => {
        try {
            const { phone, password } = Values;
            const response = await userService.login(phone, password);
            console.log("response", response);
            
            // Save the token to local storage or state management
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("user", JSON.stringify(response.data.payload));
            
            toast.success(response.data.message ?? "Login success!");

            const role = response.data.payload.role;

            if (role === "Admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <>
        <ToastContainer />
        <div className="login-page">
            <Card style={{ width: 400, margin: 'auto', marginTop: '100px'}}>
                <Form layout="vertical" name="FormLogin" onFinish={handleSubmit}>
                    <h1 style={{textAlign:"center"}}>Login</h1>
                    <Form.Item
                        label="Username"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item style={{ marginTop: '20px' }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%'}}>
                            Login
                        </Button>
                    </Form.Item>
                    <div className="inner-content">
                        <Link to="/register"><p>Sign Up</p></Link>
                        <Link to="/forgot-password" ><p>Forgot Password?</p></Link>
                    </div>
                </Form>
            </Card>
        </div>
        </>
    );
}
export default Login;