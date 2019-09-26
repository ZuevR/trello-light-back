import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Board } from '../../../shared/interfaces';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit, OnDestroy {

  id: string;
  bSub: Subscription;
  board: Board;
  display = false;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.bSub = this.boardService.getBoard(this.id).subscribe((board: Board) => {
      this.board = board;
    }, error => {
      if (error.status === 403) {
        this.router.navigate(['/boards']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.bSub) {
      this.bSub.unsubscribe();
    }
  }

  changeBoard(newTitle: string) {
    const oldTitle = this.board.title;
    this.board.title = newTitle;
    this.boardService.changeBoard(this.board).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
      this.board.title = oldTitle;
    });
  }

  confirmDelete() {
    const a = confirm('Do you really want to delete this board?');
    if (a) {
      this.boardService.deleteBoard(this.id).subscribe(result => {
        this.router.navigate(['/boards']);
        console.log(result);
      }, error => {
        console.log(error);
      });
    }
  }

}
