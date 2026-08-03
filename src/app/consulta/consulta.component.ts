import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [CommonModule, MatInputModule, MatCardModule, FlexLayoutModule, MatIconModule, FormsModule, MatTableModule, MatButtonModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent {
  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "ações"]; 

  constructor(
    private service: ClienteService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar() {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], {queryParams: {"id": id}});
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.snack.open("Deletado com sucesso!", "Ok");
  }
}
