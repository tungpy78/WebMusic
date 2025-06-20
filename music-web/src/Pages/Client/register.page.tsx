import { Button, Card, Form, Input } from "antd";
import "../../assets/scss/login.scss"
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../Services/userService";
import { toast, ToastContainer } from "react-toastify";

function Register(){
    const naviagete = useNavigate();
    const handleSubmit = async (values: any) => {
        try {
            const { fullname, phone, email, password } = values;
            const response = await userService.register(fullname, phone, email, password);
            toast.success(response.data.message ?? "Register success!");
            setTimeout(() => {
                naviagete("/login");
            }
            , 1000);
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <>
         <ToastContainer />
        <div className="register-page">
            <Card style={{ width: 400, margin: 'auto', marginTop: '100px'}}>
                <Form layout="vertical" name="FormLogin" onFinish={handleSubmit}>
                    <h1 style={{textAlign:"center"}}>Register</h1>
                    <Form.Item
                        label="Full Name"
                        name="fullname"
                        rules={[{ required: true, message: 'Please input your fullname!' }]}
                    >
                        <Input placeholder="Nhập Họ và Tên" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input type="Number" placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input type="email" placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Nhập Password" />
                    </Form.Item>
                    <Form.Item style={{ marginTop: '20px' }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%'}}>
                            Register
                        </Button>
                    </Form.Item>
                    <div className="inner-content">
                        <Link to="/login"><p>Sign In</p></Link>
                        <Link to="/forgot-password" ><p>Forgot Password?</p></Link>
                    </div>
                </Form>
            </Card>
        </div>
        </>
        
    );
}
export default Register;