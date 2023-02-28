import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';
const { Title } = Typography;

function PurchaseForm() {
    
    const currEvent = useSelector((state) => state.event.value);
    const navigate = useNavigate();

    useEffect(() => {

        //If our Event object from store doesn't have data in the event of a refresh etc, navigate to events page 
        if (Object.keys(currEvent).length == 0) {
            navigate('/events/');
        }
    }, []);
    
    const onFinish = async (values) => {

        values.eventId = currEvent.id;

        const res = await axios.post('/api/events/create-checkout-session', values);

        window.location = res.data.url;
        //console.log('Success:', res);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <div style={{ padding: 64 }}>
            <Title style={{ marginLeft: 208}}>{currEvent.title}</Title>

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
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
                <Form.Item label="Name" name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input name for your ticket!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not a valid email.'
                        },
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Phone Number" name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                    style={{
                        width: '100%',
                    }}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default PurchaseForm;