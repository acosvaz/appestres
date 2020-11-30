import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { TestService } from 'src/app/services/test.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
form: any = {};
test: Test;
creado = false;
mensajeFail = '';
mensajeOK = '';
mensajeUP = '';
failProducto = false;

escalas: any[] = [
    {
      id: 1,
      letra: 'Nunca',
      valor: '1',
    },
    {
      id: 2,
      letra: 'Casi nunca',
      valor: '2',
    },
    {
      id: 3,
      letra: 'Pocas Veces',
      valor: '3',
    },
    {
      id: 4,
      letra: 'Algunas veces',
      valor: '4',
    },
    {
      id: 5,
      letra: 'Relativamente frecuente',
      valor: '5',
    },
    {
      id: 6,
      letra: 'Muy frecuente',
      valor: '6',
    }
  ];

  constructor(
  private alertController: AlertController,
  private tokenService: TokenService,
  private testService: TestService,
  private toastController: ToastController,
  public navCtrl: NavController
  ) { }

  ngOnInit() {

  }

    onCreate(): void {
    const id = this.tokenService.getId();
    this.testService.resultado(id, this.form).subscribe(data => {
      this.creado = true;
      this.failProducto = false;

      if (Number(data.total) <= 12) {
       this.mensajeUP = 'Sin estrés';
       this.mensajeOK = 'No existe síntoma alguno de estrés. Tienes un buen equilibrio, continúa así y contagia a los demás de tus estrategias de afrontamiento!';
       this.presentAlert();
      } else if ((Number(data.total) > 12) && (Number(data.total) <= 24)) {
        this.mensajeUP = 'Sin estrés';
        this.mensajeOK = 'Te encuentras en fase de alarma, trata de identificar el o los factores que te causan estrés para poder ocuparte de ellos de manera preventiva';
        this.presentAlert();
      } else if ((Number(data.total) > 24) && (Number(data.total) <= 36)) {
        this.mensajeUP = 'Estrés leve';
        this.mensajeOK = 'Te encuentras en fase de alarma, trata de identificar el o los factores que te causan estrés para poder ocuparte de ellos de manera preventiva';
        this.presentAlert();
      }else if ((Number(data.total) > 36) && (Number(data.total) <= 48)) {
        this.mensajeUP = 'Estrés medio';
        this.mensajeOK = 'Haz conciencia de la situación en la que te encuentras y trata de ubicar qué puedes modificar, ya que si la situación estresante se prolonga, puedes romper tu equilibrio entre lo laboral y lo personal. No agotes tus resistencias!';
        this.presentAlert();
      } else if ((Number(data.total) > 48) && (Number(data.total) <= 60)) {
        this.mensajeUP = 'Estrés alto';
        this.mensajeOK = 'Te encuentras en una fase de agotamiento de recursos fisiológicos con desgaste físico y mental. Esto puede tener consecuencias más serias para tu salud.';
        this.presentAlert();
      } else if ((Number(data.total)) >60 && (Number(data.total) <= 72)) {
        this.mensajeUP = 'Estrés grave';
        this.mensajeOK = 'Busca ayuda.';
        this.presentAlert();
      }

    },
      (err: any) => {
        this.mensajeFail = err.error.mensaje;
        this.creado = false;
        this.failProducto = true;
        this.presentAlert();
      }
    );
  }

    async presentAlert() {
    const alert = await this.alertController.create({
      header: this.mensajeUP,
      message: this.mensajeOK,
        buttons: [{
    text: 'Ok',
    handler: () => {

          this.navCtrl.navigateForward('/login');
    }
  }]
    });


    await alert.present();
  }

}
