export class buildEmail{

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

  private  welcomeEmailBody(userName:string){
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

  private  orderEmailBody(creationTimestamp:Date, city:string, country:string, line1:string, line2:string, postalCode:string, state:string){
    const subject = "Pedido confirmado";
    const html_body = "<p>Información del pedido: </p>"
  +              "<ul>"
  +               `<li>Día: ${creationTimestamp.getDay} </li>`
  +               `<li>Realizado a las: ${creationTimestamp.getHours} </li>`
  +               `<li>Dirección de envío: ${city} ${country} ${line1} ${line2} ${postalCode} ${state} </li>`
  +              "</ul>"
  +              "<p>¡Gracias por pedir en La Nostra Casa!</p>"
    const body = "Información del pedido:"
  +               `Día: ${creationTimestamp.getDay}`
  +               `Realizado a las: ${creationTimestamp.getHours}`
  +               `Dirección de envío: ${city} ${country} ${line1} ${line2} ${postalCode} ${state}`
  +               "¡Gracias por pedir en La Nostra Casa!"
    return {subject:subject, html_body:html_body, body:body};
  }

  private  reservationEmailBody(date:number, time:string, customers:number){
    const subject = "Reserva confirmada"
    const html_body = "<p>¡Gracias por reservar con La Nostra Casa!</p>"
  +              "<p>Datos de la reserva:</p>"
  +              "<ul>"
  +               `<li>Fecha: ${date} </li>`
  +               `<li>Hora: ${time} </li>`
  +               `<li>Número de personas: ${customers} </li>`
  +              "</ul>"
  +              "<p>Guarde este mail en caso de cualquier problema con la reserva.</p>"
    const body = "¡Gracias por reservar con La Nostra Casa!"
  +              "Datos de la reserva:"
  +               `Fecha: ${date}`
  +               `Hora: ${time}`
  +               `Número de personas: ${customers}`
  +              "Guarde este mail en caso de cualquier problema con la reserva."
    return {subject:subject, html_body:html_body, body:body};
  }

}
