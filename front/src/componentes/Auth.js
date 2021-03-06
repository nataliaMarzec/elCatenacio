 
import swal from "@sweetalert/with-react";
class Auth {
  constructor(){
   
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
    swal({
      text: "Combapp Sos tu propio negocio",
      buttons: {
        cancel: "Salir"
      }
    });
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
