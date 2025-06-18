import { Avatar, Button, Card, Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import {userService} from "../../Services/userService";

function ProfileAdmin() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console .log("user", user);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user, form]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const { email, phone } = values;
            const response = await userService.changeProfile(email, phone);
            console.log("response", response);

            toast.success(response.data.message ?? "Cập nhật thành công!");
            setIsEditing(false);
            // Update user data in local storage
            localStorage.setItem("user", JSON.stringify({ ...user, email, phone }));

        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    return (
        <>
            <ToastContainer />
            <Row justify="center" style={{ marginTop: '50px', width: '100%' }}>
                <Col span={12}>
                    <Card
                        title="Thông tin cá nhân"
                        bordered={false}
                        style={{ borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
                    >
                        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
                            <Avatar
                                size={100}
                                icon={<UserOutlined />}
                                src={user?.avatar || undefined}
                                style={{ marginRight: 24 }}
                            />
                            <div>
                                <h2 style={{ margin: 0 }}>{user?.fullname}</h2>
                                <p style={{ margin: 0, color: "#888" }}>Mã người dùng: {user?.userId}</p>
                            </div>
                        </div>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSave}
                        >
                            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}>
                                <Input disabled={!isEditing} />
                            </Form.Item>

                            <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                                <Input disabled={!isEditing} />
                            </Form.Item>

                            <div style={{ textAlign: "right" }}>
                                <Button
                                    icon={<EditOutlined />}
                                    htmlType="button"
                                    onClick={handleEdit}
                                    disabled={isEditing}
                                    style={{ marginRight: 8 }}
                                >
                                    Chỉnh sửa
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<SaveOutlined />}
                                    htmlType="button"
                                    onClick={handleSave}
                                    disabled={!isEditing}
                                >
                                    Lưu
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ProfileAdmin;