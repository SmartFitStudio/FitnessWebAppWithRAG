import { Component, Inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { PaginatedComponent } from '../../../../services/common/PaginatedComponent';
import { ProgressoResponse } from '../../../../services/models/progresso-response';
import { ProgressService } from '../../../../services/services/progress.service';
import { InplaceModule } from 'primeng/inplace';
import { Router } from '@angular/router';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';

@Component({
  selector: 'app-progress-table',
  standalone: true,
  imports: [TableModule, CommonModule,InplaceModule, FeedbackInfoPointComponent],
  templateUrl: './progress-table.component.html',
  styleUrl: './progress-table.component.scss'
})
export class ProgressTableComponent extends PaginatedComponent implements OnInit {
  public lista_progressi: ProgressoResponse[] = [];

  constructor(
    private progressoService: ProgressService,
    private router: Router,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }

  ngOnInit(): void {
    this.getData();
  }

  protected override getData() {
    this.progressoService.getAllProgressiPaginated({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        console.log(this.totalPages);
        this.totalPages = response.totalPages;
        this.lista_progressi = response.content ? response.content : [];
        this._pages = Array(response.totalPages)
          .fill(0)
          .map((x, i) => i);
      },
      error: (error) => {
        this.handleErrorMessages(error);
      }
    });
  }

  editProgress(id_progresso: number) {
    this.router.navigate([sub_appRoutingModule.full_manageProgressPath , id_progresso]);
  }

  deleteProgress(id_progresso: number) {
    this.progressoService.deleteProgresso({
      'progresso-id': id_progresso
    }).subscribe({
      next: () => {
        this.addMessage('success','Progresso eliminato con successo');
        this.getData();
      },
      error: (error) => {
        this.handleErrorMessages(error);
      }
    });
  }

  //BOILERPLATE CODE
    /**
   * Funzione che permette di trovare i progressi in base alla paginazione, viene chiamata quando si cambia pagina
   * @param $event 
   */
    findProgress($event: any) {
      console.log($event);
      this._page = $event.first  / $event.rows;
      this._size = $event.rows;
      this.getData();
    }
}
