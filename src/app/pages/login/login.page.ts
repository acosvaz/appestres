import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { Status } from 'src/app/models/status';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { AlertController } from '@ionic/angular';
import { Resultado } from 'src/app/models/resultado';
import { TestService } from 'src/app/services/test.service';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: any = {};
  usuario: LoginUsuario;
  nombreUser: string;
  isLogged = false;
  isLoginFail = false;
  rol: string;
  id: string;
  errorMsg = '';
  resultados: Resultado [] = [];
  total: string;
  nivel: string;
  fecha: string;
  //producto: Producto = null;
  status: Status = null;


  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private alertController: AlertController,
    private testService: TestService,
    private router: Router
  ) { 

  this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.cargarStatus();
      }
    });

  }

  ngOnInit() {

	if (this.tokenService.getToken()) {
    // comprobamos los valores del token
      
      this.nombreUser = this.tokenService.getUserName();
      this.isLogged = true;
      this.isLoginFail = false;
      this.rol = this.tokenService.getRol();
      this.id = this.tokenService.getId();

      this.cargarStatus();

 /*     this.total = this.status.total;

      if (Number(this.total) <= 24) {
       this.nivel = 'Sin estrés';
      } else if ((Number(this.total) > 24) && (Number(this.total) <= 36)) {
        this.nivel = 'Estrés leve';
      }else if ((Number(this.total) > 36) && (Number(this.total) <= 48)) {
        this.nivel = 'Estrés medio';
      } else if ((Number(this.total) > 48) && (Number(this.total) <= 60)) {
        this.nivel = 'Estrés alto';
      } else if ((Number(this.total) >60) && (Number(this.total) <= 72)) {
        this.nivel = 'Estrés grave';
      }*/
    }

  }

  onLogin() {
    this.usuario = new LoginUsuario(this.form.username, this.form.password);

    this.authService.login(this.usuario).subscribe(data => {
      this.tokenService.setId(data.id);
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.username);
      this.tokenService.setRol(data.rol);

      this.isLogged = true;
      this.isLoginFail = false;
      this.rol = this.tokenService.getRol();
      this.id = this.tokenService.getId();

      window.location.reload();
    },
      (err: any) => {
        console.log(err);
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = 'Intente de nuevo';
        this.presentAlert();
      }
    );
  }

    async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario o contraseña incorrectos',
      message: this.errorMsg,
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  cargarStatus(): void {
  const id = this.id;
    this.testService.status(id).subscribe(data => {
      this.status = data;
      this.total = this.status.total;
      this.fecha = this.status.fecha;

           if (Number(this.total) <= 24) {
       this.nivel = 'Sin estrés';
      } else if ((Number(this.total) > 24) && (Number(this.total) <= 36)) {
        this.nivel = 'Estrés leve';
      }else if ((Number(this.total) > 36) && (Number(this.total) <= 48)) {
        this.nivel = 'Estrés medio';
      } else if ((Number(this.total) > 48) && (Number(this.total) <= 60)) {
        this.nivel = 'Estrés alto';
      } else if ((Number(this.total) >60) && (Number(this.total) <= 72)) {
        this.nivel = 'Estrés grave';}
    },
      (err: any) => {
        console.log(err);
        this.router.navigate(['']);
      }
    );
  }


onLogout() {
  this.tokenService.logOut();
  this.nivel = '';
  window.location.reload();
}

}
