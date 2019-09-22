import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BoardService } from '../../../services/board.service';
import { Board } from '../../../shared/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  form: FormGroup;
  submitting = false;
  modalRef: BsModalRef;
  boards: Board[];

  constructor(
    public boardService: BoardService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.boardService.getAllBoards().subscribe((response: Board[]) => {
      this.boards = response;
      console.log(this.boards);
    });

    this.form = new FormGroup({
      title: new FormControl(null, Validators.required)
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createBoard() {
    if (this.form.invalid) {
      return;
    }
    this.submitting = true;

    const board: Board = {
      title: this.form.get('title').value
    };

    this.boardService.createNewBoard(board).subscribe((response: Board) => {
      this.form.reset();
      this.modalRef.hide();
      this.boards.push(response);

      this.submitting = false;
    }, () => {
      this.submitting = false;
    });
  }
}
