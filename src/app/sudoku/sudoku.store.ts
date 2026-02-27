import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Board, Difficulty, ResponseStatus, SolveResponse, ValidateResponse } from '../models';
import { inject } from '@angular/core';
import { SudokuService } from './sudoku.service';
import { lastValueFrom } from 'rxjs';

interface SudokuState {
    board: Array<Array<number>>;
    initialBoard: Array<Array<number>>;
    loading: boolean;
    error: string;
    solveResponse: SolveResponse | null;
    validateResponse: ValidateResponse | null;
}

const initialState: SudokuState = {
    board: [],
    initialBoard: [],
    loading: false,
    error: '',
    solveResponse: null,
    validateResponse: null
};

export const SudokuStore = signalStore(
    withState(initialState),
    withMethods((store, service = inject(SudokuService)) => ({
        async loadBoard(difficulty: Difficulty) {
            patchState(store, { loading: true, error: '' });

            try {
                const response = await lastValueFrom(service.getBoard(difficulty));

                patchState(store, { 
                    board: response.board,
                    initialBoard: response.board.map(r => [...r]),
                    loading: false
                });
            } catch (err) {
                patchState(store, { error: 'Failed to load board' });
            }
        },
        async solve(boardData: Array<Array<number>>) {
            patchState(store, { loading: true, error: '' });
            try {
                const response = await lastValueFrom(service.solve(boardData));

                patchState(store, { solveResponse: response, loading: false });
                if (response.status === ResponseStatus.SOLVED) {
                    patchState(store, { board: response.solution });
                }
            } catch (err) {
                patchState(store, { error: 'Failed to solve board' });
            }
        },
        updateCell(row: number, col: number, value: number) { 
            const newBoard = store.board().map((r) => [...r]); 
            newBoard![row][col] = value; 
            patchState(store, { board: newBoard });
        },
        async validateBoard(boardData: Array<Array<number>>) {
        patchState(store, { loading: true, error: '' });
            try {
                const validateResponse = await lastValueFrom(service.validate(boardData));

                patchState(store, { validateResponse, loading: false });
            } catch (err) {
                patchState(store, { error: 'Failed to validate board' });
            } 
        }
    }))
);
