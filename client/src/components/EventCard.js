import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { updateEvent } from '../store/slices/eventSlice'
const { Meta } = Card;

function EventCard({ id, title, desc, startDate, endDate, pricePerTicket }) {

    const dispatch = useDispatch();

    const formatDates = (date) => {

        const formatDate = new Date(date);

        return formatDate.toLocaleDateString("en-US");
    };

    function insertDecimal(num) {

        return (num / 100).toFixed(2);
     }

    return (
        <Card
            hoverable={false}
            style={{
                margin: 18,
                height: 280,
                width: 480,
            }}
        >
            <Meta title={title} description={desc} />
            <p>{formatDates(startDate)} - {formatDates(endDate)}</p>
            <p><b>${insertDecimal(pricePerTicket)}</b> per ticket</p>
            <hr style={{ marginTop: 16, marginBottom: 16 }}/>
            <div style={{ justifyContent: 'space-between',}}>
                <Button type="primary" shape="round" onClick={() => dispatch(updateEvent({ id: id, title: title }))}>
                    <Link to='/events/purchaseForm'>Purchase Tickets</Link>
                </Button>
                <Button type="primary" shape="round">More Info</Button>
            </div>
        </Card>
    );
}

export default EventCard;