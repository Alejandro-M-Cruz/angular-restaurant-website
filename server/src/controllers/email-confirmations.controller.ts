import smtp from '../smtp/configMsj'


export default class EmailConfirmationsController {

  public static sendMessage(req,res){
    smtp(req.body);
    res.status(200).send();
  }
}
