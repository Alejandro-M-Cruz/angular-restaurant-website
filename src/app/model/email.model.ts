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

  private  welcomeEmailBody(data:{userName:string}){
    const body = "<h2>Registro confirmado</h2>"
  +            `<p>¡Bienvenido/a a nuestra familia,${data.userName}</p>`
  +            "<p>Esperamos que tengas una experiencia agradable con nosotros</p>"
  +            "<p>Ahora puedes realizar reservas y pedidos desde nuestra web</p>"
  +            "<p>¡Ahora puedes darnos tu opinión y ayudarnos a mejorar!</p>"
  +            "<p>Esperamos tu visita</p>"
    return body;
  }

}
