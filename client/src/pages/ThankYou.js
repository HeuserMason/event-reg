import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useCallback } from "react";
import { Typography } from 'antd';

const { Title } = Typography;

function ThankYou() {
    
    const url = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchToken = useCallback(async () => {

        if (url.search.includes("success")) {
            
            const token = { token: searchParams.get("token") };
            const res = await axios.post('/api/events/apply-event', token);
        }    

    }, []);

    useEffect(() => {

        fetchToken();
    }, [fetchToken]);

    const conditionalRendering = () => {

        //looks at url for everything after the first ?
        if (url.search.includes("success")) {

            return (
                
                <div style={{ textAlign: 'center', height: '100vh', marginTop: '48px' }}>
                    <Title>Thank you so much for your ticket purchase!</Title>
                    <>
                        <Title level={4}>An email will be sent to you shortly with details.</Title>
                    </>
                </div>
            );
        }

        return (

            <div style={{ textAlign: 'center', height: '100vh', marginTop: '48px' }}>
                <Title>Your request was canceled.</Title>
                <>
                    <Title level={4}>Please try again later.</Title>
                </>
            </div>
        );
    };

    return (
        <>
            {conditionalRendering()}
        </>
    );
}

export default ThankYou;