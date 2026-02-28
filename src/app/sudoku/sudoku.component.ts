import { Component, effect, inject, OnInit, signal, Input, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Difficulty } from '../models/board-difficulty';
import { SudokuStore } from './sudoku.store';
import { SudokuService } from './sudoku.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sudoku',
  imports: [CommonModule, FormsModule, MatButtonModule, MatSelectModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatSnackBarModule
  ],
  templateUrl: './sudoku.html',
  styleUrl: './sudoku.scss',
  providers: [SudokuStore, SudokuService]
})
export class SudokuComponent implements OnInit {

  multiplayer = input<boolean>(false);

  readonly store = inject(SudokuStore);
  difficulty = input<Difficulty>('easy');
  boardData = input<Array<Array<number>> | null>(null);

  solved = output<void>();


  constructor(private snackBar: MatSnackBar) {
    this.validateEffect();

    effect(() => {
      if (this.multiplayer()) {
        const data = this.boardData();
        if (data && data.length > 0) {
          this.store.setBoardFromData(data);
        }
      } else {
        this.store.loadBoard(this.difficulty());
      }
    });
  }

  ngOnInit(): void {
  }


  validate() {
    this.store.validateBoard(this.store.board());
  }

  solve() {
    this.store.solve(this.store.board());
  }


  onInput(row: number, col: number, value: string) {
    const num = Number(value);
    if (num >= 1 && num <= 9) {
      this.store.updateCell(row, col, num);
    }
  }

  validateKey(event: KeyboardEvent) {
    const allowed = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (!allowed.includes(event.key)) {
      event.preventDefault();
    }
  }

  validateEffect(): void {
    effect(() => {
      const validateResponse = this.store.validateResponse();
      if (validateResponse) {
        const snackConfig = {
          duration: 3000,
          horizontalPosition: 'right' as const,
          verticalPosition: 'top' as const
        };
        if (validateResponse.status === 'solved') {
          this.snackBar.open('Congratulations! The board is solved.', 'Close', {
            ...snackConfig,
            panelClass: ['success-snackbar']
          });
          this.solved.emit();
        } else if (validateResponse.status === 'unsolved') {
          this.snackBar.open('The board is unsolved. Please check your entries.', 'Close', {
            ...snackConfig,
            panelClass: ['error-snackbar']
          });
        } else {
          this.snackBar.open('The board is invalid. Keep going!', 'Close', {
            ...snackConfig,
            panelClass: ['error-snackbar']
          });
        }
      }
    });
  }

}
