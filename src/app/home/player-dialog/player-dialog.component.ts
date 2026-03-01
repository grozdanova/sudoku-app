import { Component, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from "@angular/material/dialog";

import { Difficulty } from "../../shared/models/board-difficulty";

@Component({
    selector: 'app-player-dialog',
    templateUrl: './player-dialog.component.html',
    styleUrls: ['./player-dialog.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
})
export class PlayerDialogComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private dialogRef = inject(MatDialogRef<PlayerDialogComponent>);

    playerForm: FormGroup = this.fb.group({
        playerOne: ['', [Validators.required, Validators.minLength(1)]],
        playerTwo: ['', [Validators.required, Validators.minLength(1)]],
        difficulty: ['medium', Validators.required]
    });
    difficulties = signal<Difficulty[]>(['easy', 'medium', 'hard', 'random']);

    startGame() {
        if (this.playerForm.valid) {
            const form = this.playerForm.getRawValue();

            this.dialogRef.close();
            this.router.navigate(['/multiplayer', form['difficulty']],
                {
                    queryParams: { playerOne: form['playerOne'], playerTwo: form['playerTwo'] }
                });
        }
    }
}