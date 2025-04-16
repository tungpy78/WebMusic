import { Button, Card, Form, Input } from "antd";
import "../../assets/scss/login.scss"
import { Link } from "react-router-dom";
import { userService } from "../../Services/userService";
function Login(){
    const handleSubmit = async (Values: any) => {
        const { phone, password } = Values;
        const response = await userService.login(phone, password);

    }
    return (
        <div className="login-page">
            <Card style={{ width: 400, margin: 'auto', marginTop: '100px', padding: '20px' }}>
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
        
    );
}
export default Login;