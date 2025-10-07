import { AutoComplete, Avatar, Button, Dropdown, Form, Input, Menu } from "antd";
import Logo from "../../Components/Images/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { search } from "../../Services/song.service";
import { Song } from "../../models/song.model";
import { EditOutlined, LogoutOutlined, RightCircleOutlined, UserOutlined } from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import { userService } from "../../Services/userService";
import { toast, ToastContainer } from "react-toastify";



function HeaderLayout(){
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [options, setOptions] = useState<{value: string, label: React.ReactNode}[]>([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  }
  const handleProfile = () => {
  // Điều hướng đến trang thông tin cá nhân
  navigate("/profile");
  };

  const openChangePasswordModal = () => {
  setIsModalOpen(true);
};

  const handleChangePassword =async (Values: any) => {
    try {
      // Gửi yêu cầu đổi mật khẩu đến API
    const { oldPassword, newPassword } = Values;
    if (oldPassword === newPassword) {
      toast.error("Mật khẩu mới không được trùng với mật khẩu cũ!");
      return;
    }
    const response = await userService.changePassword(oldPassword, newPassword);
    toast.success(response.data.message ?? "Đổi mật khẩu thành công");
    form.resetFields();
    setIsModalOpen(false);
    } catch (error) {
      console.error("Error changing password:", error);
      
    }
  };

  const menu = (
  <Menu>
    <Menu.Item icon={<UserOutlined />} onClick={handleProfile}>
      Thông tin cá nhân
    </Menu.Item>
    <Menu.Item icon={<EditOutlined />} onClick={openChangePasswordModal}>
      Đổi mật khẩu
    </Menu.Item>
    <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
      Đăng xuất
    </Menu.Item>
  </Menu>
);

  const handleSearch = async (keyword: string) => {
    if (!keyword) {
      setOptions([]);
      return;
    }
    try {
      const response = await search(keyword);
      const songsData: Song[] = response.data;

      // Tạo danh sách options hiển thị, bạn có thể custom label để hiển thị artist + title đẹp hơn
      const newOptions = songsData.map(song => ({
        value: song.title,
        label: (
            <Link to={`/song/${song._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={song.avatar} alt={song.title} style={{ width: 40, height: 40, marginRight: 10 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong>{song.title}</strong>
                    {song.artist.map((artist) => (
                      <small>{artist?.name}</small>
                    ))}
                </div>
            </div>
            </Link>
        )
      }));
      setOptions(newOptions);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setOptions([]);
    }
  }

  return (
    <>

      <div className="layoutdefault__header--logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="layoutdefault__header--search" style={{height: 40}}>
        <AutoComplete
        options={options}
        style={{ width: "100%"}}
        onSearch={handleSearch}
        placeholder="Tìm kiếm bài hát, nghệ sĩ..."
        allowClear
        dropdownStyle={{
        maxHeight: 'auto', // Giới hạn chiều cao dropdown
        overflowY: 'auto', // Cho phép cuộn dọc nếu vượt quá
        }}
        />
      </div>
       <ToastContainer />
      <div className="layoutdefault__header--account">
        {user ? (
          <Dropdown overlay={menu} trigger={['click']}>
          <Avatar icon={<UserOutlined />} size={"large"} style={{marginRight: 8, cursor: 'pointer'}}/>
        </Dropdown>
        ) : (
          <>  
            <Link to="/login"><Button type="primary">Đăng nhập</Button></Link>
            <Link to="/register"><Button type="primary">Đăng ký</Button></Link>
          </>
        )}
      </div>
      <Modal
        title="Đổi mật khẩu"
        open={isModalOpen}
        footer={null}
        width={800}
        style={{ top: 150 }}
        onCancel={() => setIsModalOpen(false)}
        >
        <Form
          form={form} 
          name="changePassword"
          onFinish={handleChangePassword}
          layout="vertical"
        >
          <Form.Item 
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item 
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item 
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
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
          <Button type="primary" htmlType="submit">
              Đổi mật khẩu
            </Button>
        </Form>

      </Modal>
    </>
  );
}

export default HeaderLayout;
