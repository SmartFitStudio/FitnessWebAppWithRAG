import { Component, Inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { PaginatedComponent } from '../../../../services/common/PaginatedComponent';
import { ProgressoResponse } from '../../../../services/models/progresso-response';
import { ProgressService } from '../../../../services/services/progress.service';

@Component({
  selector: 'app-progress-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './progress-table.component.html',
  styleUrl: './progress-table.component.scss'
})
export class ProgressTableComponent extends PaginatedComponent implements OnInit {
  public lista_progressi: ProgressoResponse[] = [];

  constructor(
    private progressoService: ProgressService,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }

  findProgress($event: any) {
    console.log($event);
    this._page = $event.first  / $event.rows;
    this._size = $event.rows;
    this.getData();
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

}
