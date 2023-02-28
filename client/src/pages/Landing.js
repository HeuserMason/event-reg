import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';

const { Title } = Typography;

function Landing() {

    return (

        <div style={{ textAlign: 'center', height: '100vh', marginTop: '48px' }}>
            <Title>Hello and welcome to our event registration page!</Title>
            <>
                <Title level={4}>View our active on-going events below!</Title>
            </>
            <br />
            <>
                <Button type="primary" shape="round">
                    <Link to="/events">View Events</Link>
                </Button>
            </>
        </div>

    );
}

export default Landing;