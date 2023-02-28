const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const mongoose = require('mongoose');
const Event = mongoose.model('events');
const Token = mongoose.model('token');
const sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey(keys.sendGridKey);
const emailTemplate = require('../templates/emailTemplate');

module.exports = (server) => {

    server.get('/api/events/', async (req, res) => {

        const events = await Event.find({ })
        .select({ attendees: false }); //do not include attendes

        res.send(events);
    });

    server.get('/api/events/admin', async (req, res) => {

        const events = await Event.find();

        res.send(events);
    });

    server.get('/api/events/create-event', async (req, res) => {

        //const { title, body, date } = req.body;

        const nowDate = new Date();

        const startDate = new Date().setDate(nowDate.getDate() + 9 * 7);
        const endDate = new Date().setDate(nowDate.getDate() + 10 * 7);

        const event = new Event({

            title: "Go-Cart Event",
            description: "Set up course and ready for ages 10 and up to come race our go-carts on the track!",
            pricePerTicket: 700,
            startDate: startDate,
            endDate: endDate
        });

        const savedEvent = await event.save();

        res.send(savedEvent);
    });

    server.post('/api/events/create-checkout-session', async (req, res) => {

        const { eventId, name, email, phone } = req.body;

        try {
            
            const event = await Event.findById(eventId);
            
            const token = new Token({

                eventId: eventId,
                name: name,
                email: email,
                phoneNumber: phone,
                createdDate: new Date()
            });
            const savedToken = await token.save();

            const session = await stripe.checkout.sessions.create({

                line_items: [
                    {   
                        price_data: {
                                currency: 'usd',
                                unit_amount: event.pricePerTicket,
                                product_data: {
                                    name: event.title + ' Ticket(s)'
                                }
                                
                        }
                        ,
                        quantity: 1
                    },
                ],
                mode: 'payment',
                success_url: `${keys.redirectDomain}/events/thank_you?success&token=${savedToken._id}`,
                cancel_url: `${keys.redirectDomain}/events/thank_you?canceled&token=${savedToken._id}`,
            });

            res.json({"url": session.url});        
          //res.redirect(303, session.url);
        } catch (error) {

            console.log(error);
            res.status(400).send(error);
        }
    });

    server.post('/api/events/apply-event', async (req, res) => {

        const { token } = req.body;

        try {
            const tokenInfo = await Token.findById(token);

            if (!tokenInfo) {
                res.status(400).send("Can not use a null token.");
                return;
            }
            
            const attendee = {

                name: tokenInfo.name,
                email: tokenInfo.email,
                phoneNumber: tokenInfo.phoneNumber,
                dateApplied: new Date()
            };

            const event = await Event.findById(tokenInfo.eventId);

            event.attendees.push(attendee);
            event.markModified('attendees'); 
            const savedEvent = await event.save();
                        
            const deletedToken = await Token.deleteOne(tokenInfo._id);

            const msg = {
                to: attendee.email, // Change to your recipient
                from: 'masonheuser@gmail.com', // Change to your verified sender
                subject: `Ticket Purchase for ${event.title}`,
                text: 'Ticket Purchase',
                html: emailTemplate(event),
            }
              
            sendGrid
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
            })
            .catch((error) => {
                console.error(error)
            });

            res.status(200);

        } catch (error) {

            

            console.log(error);
            res.status(400).send(error);
        }
    });
};