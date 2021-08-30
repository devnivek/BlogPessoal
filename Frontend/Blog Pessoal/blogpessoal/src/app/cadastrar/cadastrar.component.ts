import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmaSenha: string
  tipoUsuario: string

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmaSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.user.tipo = this.tipoUsuario

    if(this.user.tipo != 'adm' && this.user.tipo != 'normal'){
      alert('Selecione um tipo de usuário!')
    }

    if(this.user.usuario.indexOf('@') == -1 || this.user.usuario.indexOf('.') == -1){
      alert('O usuário deve ser um email válido!')
    }

    if(this.user.senha.length < 7){
      alert('A senha precisa ser de no mínimo 8 caracteres!')
    }
    if(this.user.senha != this.confirmaSenha){
      alert('As senhas não coincidem! Por favor, digite novamente.')
    } 
    else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => { 
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

}
