module.exports = (event) => {

    return `

        <html>
        <body>
            <div style="text-align: center;">
                <h3>${event.title}</h3>
                <p>Thank you for purchasing a ticket!</p>
                <br>
                <p>The event times are:</p>
                <p>${event.startDate} - ${event.endDate}</p>
                <br>
                <p>Please attend an event with us again! Have a nice day.</p>
            </div>
        </body>
        </html>
    `;
};