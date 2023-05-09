
 export default (emailData: { to: string; subject: string; html_body: string; body: string; }) => {
  const axios = require('axios');
  const url = "https://api.smtp2go.com/v3/email/send";
  const fromAddress = "admlanostracasa@gmail.com";

  const data = {
    api_key: process.env.EMAIL_API_KEY,
    sender: fromAddress,
    to: [emailData.to],
    subject: emailData.subject,
    html_body: emailData.html_body,
    text_body: emailData.body
  };

  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response: { data: any; }) => {
    console.log(response.data);
  })
  .catch((error: any) => {
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
 }
