"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (formulario) => {
    const axios = require('axios');
    const url = "https://api.smtp2go.com/v3/email/send";
    const fromAddress = "admlanostracasa@gmail.com";
    const params = {
        'api_key': process.env.EMAIL_API_KEY,
        'sender': fromAddress,
        'to': ["kenai191998@gmail.com"],
        'subject': "asunto",
        'text_body': "PROBANDO EN LA NOSTRA CASA",
        'html_body': "<html><body><h1>" + "PROBANDO EN LA NOSTRA CASA" + "</h1></body></html>"
    };
    const data = {
        api_key: process.env.EMAIL_API_KEY,
        sender: fromAddress,
        to: ['kenai191998@gmail.com'],
        subject: 'Probando',
        html_body: '<html><body><h1>PROBANDO PROBANDO</h1></body></html>',
        text_body: 'PROBANDO'
    };
    axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
        console.log(response.data);
    })
        .catch(error => {
        console.error(error);
    });
    // request.post({
    //   url: url,
    //   headers: {
    //     'Content-Type': "application/json"
    //   },
    //   body: JSON.stringify(params),
    //   }, function(err: any, response: any, body: any) {
    //   console.log(body,formulario);
    // })
};
