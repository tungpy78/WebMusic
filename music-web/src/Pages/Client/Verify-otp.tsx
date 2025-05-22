import { Button, Form, GetProps, Input, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { userService } from "../../Services/userService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import OTPCountdown from "../../Components/element/OTPCountdown";
import { error } from "console";

const { Title } = Typography;
type OTPProps = GetProps<typeof Input.OTP>;

const VerifyOtp = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);
    const expireSeconds = location.state?.expireSeconds || 300;

    const [otpExpired, setOtpExpired] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(expireSeconds);
    const [isResending, setIsResending] = useState(false);

    

    const HandleSubmit = async (Values: any) => {

        try {
            const otp = Values.otp
            const response = await userService.verifyOtp(email, otp);
            console.log(response)
            toast.success(response.data.message ?? "Send OTP Successed");
            setTimeout(() =>{
                navigate("/reset-password",{
                    state: {
                        email
                    },
                })
            },1000)
        } catch (error) {
            console.log("error", error)
        }
    }
    const resendOtp = async () => {
        try {
            setIsResending(true);
            const response = await userService.sendEmail(email);
            setOtpExpired(false); // ẩn nút "Gửi lại OTP"
            setSecondsLeft(expireSeconds); // reset countdown
        } catch (error) {
            console.log("error",error)
        } finally {
            setIsResending(false);
        }
  };
    
    const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const onInput: OTPProps['onInput'] = (value) => {
    console.log('onInput:', value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };
    return(
        <>
        <ToastContainer/>
        <Form
        name="form-verify-otp"
        onFinish={HandleSubmit}
        style={{margin:"auto", padding:"50px", textAlign:"center", background:"white", borderRadius:"8px", width:"400px", marginTop:"100px"}}>
            <Title level={2}>Nhập Mã OTP</Title>
            <FormItem
            name="otp"
                    rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
            >
                   <Input.OTP length={6}  {...sharedProps}/>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">
                    Xác nhận
                </Button>
            </FormItem>
            {!otpExpired && (
            <OTPCountdown
                key={secondsLeft}
                expireSeconds={secondsLeft}
                onExpire={() => setOtpExpired(true)}
            />
            )}
            {otpExpired && (
            <Button onClick={resendOtp} loading={isResending}>
                Gửi lại OTP
            </Button>
            )}
        </Form>
        </>
    );
};
export default VerifyOtp;