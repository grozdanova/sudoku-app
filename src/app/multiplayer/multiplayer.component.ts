import { CommonModule } from "@angular/common";
import { Component, OnDestroy, signal, inject } from "@angular/core";
import { DatePipe } from "@angular/common";
import { SudokuComponent } from "../sudoku/sudoku.component";
import { ActivatedRoute } from "@angular/router";
import { Difficulty } from "../models";
import { SudokuService } from "../sudoku/sudoku.service";
import { SudokuStore } from "../sudoku/sudoku.store";

@Component({
    selector: 'app-multiplayer',
    templateUrl: './multiplayer.component.html',
    styleUrl: './multiplayer.component.scss',
    imports: [CommonModule, SudokuComponent, DatePipe],
    providers: [SudokuStore, SudokuService]
})
export class MultiplayerComponent implements OnDestroy {


    timerPlayerOne = signal(0);
    timerPlayerTwo = signal(0);
    private intervalId: any;
    winner = signal<string | null>(null);

    playerOneFinished = signal<boolean>(false);
    playerTwoFinished = signal<boolean>(false);

    playerOneName = signal<string>('');
    playerTwoName = signal<string>('');
    difficulty = signal<Difficulty>('medium');

    private route = inject(ActivatedRoute);
    readonly store = inject(SudokuStore);

    constructor() {
        this.startTimer();

        this.route.queryParams.subscribe(params => {
            this.playerOneName.set(params['playerOne']);
            this.playerTwoName.set(params['playerTwo']);
        });
        this.difficulty.set(this.route.snapshot.paramMap.get('difficulty') as Difficulty);

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
