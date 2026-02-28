import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SudokuComponent } from '../sudoku/sudoku.component';
import { Difficulty } from '../models/board-difficulty';

@Component({
    selector: 'app-singleplayer',
    template: `
        <div class="singleplayer-controls" style="display: flex; justify-content: center; margin-bottom: 1rem; margin-top: 2rem;">
            <mat-form-field appearance="outline">
                <mat-label>Difficulty</mat-label>
                <mat-select [ngModel]="selectedDifficulty()" (ngModelChange)="selectedDifficulty.set($event)">
                    <mat-option *ngFor="let diff of difficulties" [value]="diff">
                        {{ diff | titlecase }}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </div>
        <app-sudoku [difficulty]="selectedDifficulty()"></app-sudoku>
    `,
    standalone: true,
    imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, SudokuComponent]
})
export class SingleplayerComponent {
    difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'random'];
    selectedDifficulty = signal<Difficulty>('easy');
}
