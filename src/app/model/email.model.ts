import {User} from "./user";
import { Order } from "./order.model";
import { Reservation } from "./reservation.model";

export interface email{
  to: string,
  subject: string,
  html_body: string,
  body: string
}


export class BuildEmail{

  private static welcomeEmailBody(userName:string){
    const subject = "Registro exitoso"
    const html_body =`<p>¡Bienvenido/a a nuestra familia,${userName}</p>`
  +            "<p>Esperamos que tengas una experiencia agradable con nosotros</p>"
  +            "<p>Ahora puedes realizar reservas y pedidos desde nuestra web</p>"
  +            "<p>¡Ahora puedes darnos tu opinión y ayudarnos a mejorar!</p>"
  +            "<p>Esperamos tu visita</p>"
    const body =`¡Bienvenido/a a nuestra familia,${userName}`
  +            "Esperamos que tengas una experiencia agradable con nosotros"
  +            "Ahora puedes realizar reservas y pedidos desde nuestra web"
  +            "¡Ahora puedes darnos tu opinión y ayudarnos a mejorar!"
  +            "Esperamos tu visita"
    return {subject:subject, html_body:html_body, body:body};
  }

  private  static orderEmailBody(order:Order){
    const subject = "Pedido confirmado";
    const html_body = "<p>Información del pedido: </p>"
  +              "<ul>"
  +               `<li>Día: ${order.creationTimestamp!.getDay()} </li>`
  +               `<li>Realizado a las: ${order.creationTimestamp!.getHours()} </li>`
  +               `<li>Dirección de envío: ${order.deliveryAddress} </li>`
  +              "</ul>"
  +              "<p>¡Gracias por pedir en La Nostra Casa!</p>"
    const body = "Información del pedido:"
  +               `Día: ${order.creationTimestamp!.getDay()}`
  +               `Realizado a las: ${order.creationTimestamp!.getHours()}`
  +               `Dirección de envío: ${order.deliveryAddress}`
  +               "¡Gracias por pedir en La Nostra Casa!"
    return {subject:subject, html_body:html_body, body:body};
  }

  private  static reservationEmailBody(reservation:Reservation){
    const subject = "Reserva confirmada"
    const html_body = "<p>¡Gracias por reservar con La Nostra Casa!</p>"
  +              "<p>Datos de la reserva:</p>"
  +              "<ul>"
  +               `<li>Fecha: ${reservation.date} </li>`
  +               `<li>Hora: ${reservation.time} </li>`
  +               `<li>Número de personas: ${reservation.customers} </li>`
  +              "</ul>"
  +              "<p>Guarde este mail en caso de cualquier problema con la reserva.</p>"
    const body = "¡Gracias por reservar con La Nostra Casa!"
  +              "Datos de la reserva:"
  +               `Fecha: ${reservation.date}`
  +               `Hora: ${reservation.time}`
  +               `Número de personas: ${reservation.customers}`
  +              "Guarde este mail en caso de cualquier problema con la reserva."
    return {subject:subject, html_body:html_body, body:body};
  }


  static sendEmail(user:User,emailType:"register"|"order"|"reservation",order?:Order,reservation?:Reservation):email{
    let http:email = {
      to: user.email,
      subject: "",
      html_body: "",
      body: ""
    }

    switch(emailType){
      case 'register':
        const buildRegister = BuildEmail.welcomeEmailBody(user.username);
        http.html_body = buildRegister.html_body;
        http.subject = buildRegister.subject;
        http.body = buildRegister.body;
        break;
      case 'order':
        const buildOrder = BuildEmail.orderEmailBody(order!);
        http.html_body = buildOrder.html_body;
        http.subject = buildOrder.subject;
        http.body = buildOrder.body;

        break;
      case 'reservation':
        const buildReservation = BuildEmail.reservationEmailBody(reservation!);
        http.html_body = buildReservation.html_body;
        http.subject = buildReservation.subject;
        http.body = buildReservation.body;
        break;
    }

    return http;
  }

}
