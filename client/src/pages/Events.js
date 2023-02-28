import axios from 'axios';
import { Layout, Row, Col } from 'antd';
import EventCard from '../components/EventCard';
import { useEffect, useState, useCallback } from 'react';

function Events() {

    const [events, setEvents] = useState([]);

    const fetchEvents = useCallback(async () => {

        const res = await axios.get('/api/events/');

        setEvents(res.data);

    }, []);

    useEffect(() => {

        fetchEvents();
    }, [fetchEvents]);

    const mapEvents = () => {

        return events.map((ele, index) => {

            return (
                <Col>
                    <EventCard 
                        key={ele._id} 
                        id={ele._id} 
                        title={ele.title} 
                        desc={ele.description} 
                        startDate={ele.startDate} 
                        endDate={ele.endDate} 
                        pricePerTicket={ele.pricePerTicket}
                    />
                </Col>
            )
        });
    };

    return (
        <Layout style={{ textAlign: 'center'}}>
            <Row justify="center">
                {mapEvents()}
            </Row>
        </Layout>
    );
}

export default Events;