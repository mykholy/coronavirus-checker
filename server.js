let express = require("express"); //framework in node js
let nodemailer = require('nodemailer'); //send mail
const bodyParser = require('body-parser'); //to get body reqest from form 
let app = express(); // initialize express
let port = 3000; //port 


/*  createTransport with option */
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



app.use(bodyParser.urlencoded({ extended: true })); // To parse body name from urlencoded


app.use(express.static("./static")); // to set static file as html and images and js


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