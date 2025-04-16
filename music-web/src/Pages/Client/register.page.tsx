import { Button, Card, Form, Input } from "antd";
import "../../assets/scss/login.scss"
import { Link } from "react-router-dom";
import { Value } from "sass";
function Register(){
    
    return (
        <div className="register-page">
            <Card style={{ width: 400, margin: 'auto', marginTop: '100px', padding: '20px' }}>
                <Form layout="vertical" name="FormLogin">
                    <h1 style={{textAlign:"center"}}>Login</h1>
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
        
    );
}
export default Register;