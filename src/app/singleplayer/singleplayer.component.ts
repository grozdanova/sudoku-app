import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SudokuComponent } from '../sudoku/sudoku.component';
import { Difficulty } from '../models/board-difficulty';

@Component({
    selector: 'app-singleplayer',
    templateUrl: './singleplayer.component.html',
    styleUrl: './singleplayer.component.scss',
    imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, SudokuComponent]
})
export class SingleplayerComponent {
    difficulties = signal<Difficulty[]>(['easy', 'medium', 'hard', 'random']);
    selectedDifficulty = signal<Difficulty>('easy');
}
