import { Component, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from "@angular/material/dialog";

import { Difficulty } from "../../models/board-difficulty";

@Component({
    selector: 'player-dialog',
    templateUrl: './player-dialog.component.html',
    styleUrls: ['./player-dialog.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
})
export class PlayerDialogComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);

    playerForm: FormGroup;
    difficulties = signal<Difficulty[]>(['easy', 'medium', 'hard', 'random']);

    constructor(private dialogRef: MatDialogRef<PlayerDialogComponent>) {
        this.playerForm = this.fb.group({
            playerOne: ['', [Validators.required, Validators.minLength(1)]],
            playerTwo: ['', [Validators.required, Validators.minLength(1)]],
            difficulty: ['medium', Validators.required]
        });
    }

    startGame() {
        if (this.playerForm.valid) {
            const form = this.playerForm.getRawValue();
            this.router.navigate(['/multiplayer', form['difficulty']],
                {
                    queryParams: { playerOne: form['playerOne'], playerTwo: form['playerTwo'] }
                });
            this.dialogRef.close();
        }
    }
}