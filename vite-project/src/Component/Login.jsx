import axios from "axios";
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
function onFinish(values) {
    let data = JSON.stringify(values);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://backoffice.nodemy.vn/api/auth/local/',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    axios.request(config)
        .then((response) => {

            let txtData = JSON.stringify(response.data)
            localStorage.setItem('user', txtData)
            window.location.href = '/home';

        })
        .catch((error) => {
            console.log(error);
        });
}
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    const [messageApi, contextHolder] = message.useMessage();
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'This is a warning message',
        });
    };
};

export default function Login() {
    let nav = useNavigate()
    return (
        <Form
            name="basic"
            labelCol={{
                span: 10,
            }}
            wrapperCol={{
                span: 24,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Tài khoản:"
                name="identifier"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên tài khoản hoặc email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mật khẩu:"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    }, {
                        min: 6,
                        message: "Mật khẩu không nhỏ hơn 6 ký tự!!!"
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}