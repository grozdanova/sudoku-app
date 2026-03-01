import { CommonModule } from "@angular/common";
import { Component, OnDestroy, signal, inject, effect } from "@angular/core";
import { DatePipe } from "@angular/common";
import { SudokuComponent } from "../shared/sudoku/sudoku.component";
import { ActivatedRoute } from "@angular/router";
import { Difficulty } from "../shared/models";
import { SudokuService } from "../shared/sudoku/sudoku.service";
import { SudokuStore } from "../shared/sudoku/sudoku.store";
import { AppLoaderComponent } from "../shared/loader/loader.component";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-multiplayer',
    templateUrl: './multiplayer.component.html',
    styleUrl: './multiplayer.component.scss',
    imports: [CommonModule, SudokuComponent, DatePipe, AppLoaderComponent, MatButtonModule, MatIconModule, RouterLink],
    providers: [SudokuStore, SudokuService]
})
export class MultiplayerComponent implements OnDestroy {


    timerPlayerOne = signal(0);
    timerPlayerTwo = signal(0);
    private intervalId: number | undefined;
    winner = signal<string | null>(null);

    playerOneFinished = signal<boolean>(false);
    playerTwoFinished = signal<boolean>(false);

    playerOneName = signal<string>('');
    playerTwoName = signal<string>('');
    difficulty = signal<Difficulty>('medium');

    private route = inject(ActivatedRoute);
    readonly store = inject(SudokuStore);

    constructor() {
        this.route.queryParams.subscribe(params => {
            this.playerOneName.set(params['playerOne']);
            this.playerTwoName.set(params['playerTwo']);
        });
        this.difficulty.set(this.route.snapshot.paramMap.get('difficulty') as Difficulty);

        // Effect to start timer ONLY when board is ready
        effect(() => {
            const isLoading = this.store.loading();
            const hasBoard = this.store.board().length > 0;

            if (!isLoading && hasBoard && !this.intervalId) {
                this.startTimer();
            }
        });

        this.store.loadBoard(this.difficulty());
    }

    startTimer() {
        this.intervalId = setInterval(() => {
            if (!this.playerOneFinished()) {
                this.timerPlayerOne.update(t => t + 1);
            }
            if (!this.playerTwoFinished()) {
                this.timerPlayerTwo.update(t => t + 1);
            }
        }, 1000);
    }

    onPlayerFinish(playerName: string) {
        const isPlayerOne = playerName === this.playerOneName();
        const isPlayerTwo = playerName === this.playerTwoName();

        if ((isPlayerOne && this.playerOneFinished()) || (isPlayerTwo && this.playerTwoFinished())) {
            return;
        }

        if (isPlayerOne) this.playerOneFinished.set(true);
        if (isPlayerTwo) this.playerTwoFinished.set(true);

        if (!this.winner()) {
            this.winner.set(playerName);
        }
    }


    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
