import { SenderEmailService } from "../services/email-services/sender-email-service.service";
import {User} from "./user";

export interface email{
  to: string,
  subject: string,
  html_body: string,
  body: string
}

export class buildEmail{

  constructor(
  ){

  }

  /*<div #miElemento>
<h2>Reserva confirmada</h2>
<p>¡Gracias por reservar con La Nostra Casa!</p>
<p>Datos de la reserva:</p>
<ul>
    <li>Fecha: </li>
    <li>Hora: </li>
    <li>Número de personas: </li>
</ul>
<p>Guarde este mail en caso de cualquier problema con la reserva.</p>



<h2>Registro confirmado</h2>
<p>¡Bienvenido/a a nuestra familia,       !</p>
<p>Esperamos que tengas una experiencia agradable con nosotros</p>
<p>Ahora puedes realizar reservas y pedidos desde nuestra web</p>
<p>¡Ahora puedes darnos tu opinión y ayudarnos a mejorar!</p>
<p>Esperamos tu visita</p>




<h2>Pedido confirmado</h2>
<p>Información del pedido: </p>
<ul>
    <li>Día: </li>
    <li>Realizado a las: </li>
    <li>Dirección de envío: </li>
</ul>
<p>¡Gracias por pedir en La Nostra Casa!</p>
</div>*/

  private static welcomeEmailBody(userName:string){
    const subject = "";
    const htmlBody = "<h2>Registro confirmado</h2>"
  +            `<p>¡Bienvenido/a a nuestra familia,${userName}</p>`
  +            "<p>Esperamos que tengas una experiencia agradable con nosotros</p>"
  +            "<p>Ahora puedes realizar reservas y pedidos desde nuestra web</p>"
  +            "<p>¡Ahora puedes darnos tu opinión y ayudarnos a mejorar!</p>"
  +            "<p>Esperamos tu visita</p>"
    return {subject:subject , htmlBody:htmlBody};
  }

  static sendEmail(user:User,emailType:"register"|"order"|"reservation"): email{
    let http:email = {
      to: user.email,
      subject: "",
      html_body: "",
      body: ""
    }

    switch(emailType){
      case 'register':
        const build = buildEmail.welcomeEmailBody(user.username);
        http.html_body = build.htmlBody;
        http.subject = build.subject;
        break;
      case 'order':
        break;
      case 'reservation':
        break;
    }

    return http;
  }

}
