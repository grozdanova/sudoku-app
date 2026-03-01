import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SudokuComponent } from '../shared/sudoku/sudoku.component';
import { Difficulty } from '../shared/models/board-difficulty';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-singleplayer',
    templateUrl: './singleplayer.component.html',
    styleUrl: './singleplayer.component.scss',
    imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, SudokuComponent, MatButtonModule, MatIconModule, RouterLink]
})
export class SingleplayerComponent {
    difficulties = signal<Difficulty[]>(['easy', 'medium', 'hard', 'random']);
    selectedDifficulty = signal<Difficulty>('easy');
}
