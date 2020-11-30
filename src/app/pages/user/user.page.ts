import { Component, OnInit } from '@angular/core';
import { Resultado } from 'src/app/models/resultado';
import { TestService } from 'src/app/services/test.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
resultados: Resultado[] = [];
grados: any[] = [];
mensajeUP = '';
mensajeOK = '';

  constructor(
  private testService: TestService,
  private tokenService: TokenService,
  ) { }

  ngOnInit() {
  this.cargarHistorial();
  }

   cargarHistorial(): void {
   const id = this.tokenService.getId();
    this.testService.historial(id).subscribe(data => {
      this.resultados = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
