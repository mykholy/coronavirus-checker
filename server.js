let express = require("express");
let nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
let app = express();
let port = 3000;


let transporter = nodemailer.createTransport({
    service: 'smtp',
    host: 'coronavirus-checker.ml',
    port: 465,
    secure: true,
    auth: {
        user: 'support@coronavirus-checker.ml',
        pass: '#*tZjd101i#}'
    }
});



app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("./static"));


// POST method route
app.post('/send_email', function(req, res) {

    let conten = '';
    conten += 'Name:' + req.body.name + '<br>';
    conten += 'Email:' + req.body.email + '<br>';
    conten += 'Phone:' + req.body.phone + '<br>';
    conten += 'Problem:' + req.body.problem + '<br>';

    let mailOptions = {
        from: 'support@coronavirus-checker.ml',
        to: '53c2bbd812@firemailbox.club',
        subject: 'Support CornaVirus',
        text: conten
    };


    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(mailOptions, error.response);
        } else {
            console.log(mailOptions, 'Email sent: ' + info.response);

        }
    });


    return res.redirect('/');
});

app.listen(port, function() {
    console.log(`Listening at http://localhost:${port}`);
});