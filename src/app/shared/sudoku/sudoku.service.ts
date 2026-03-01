import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Difficulty, Board, SolveResponse, ValidateResponse } from "../models";

@Injectable()
export class SudokuService {
    private baseUrl = 'https://sugoku.onrender.com';
    private headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    private http = inject(HttpClient);

    getBoard(difficulty: Difficulty = 'random') {
        return this.http.get<Board>(`${this.baseUrl}/board`, {
            params: { difficulty }
        });
    }

    validate(board: number[][]) {
        return this.http.post<ValidateResponse>(`${this.baseUrl}/validate`, this.encodeParams(board), {
            headers: this.headers
        });
    }

    solve(board: number[][]) {
        return this.http.post<SolveResponse>(`${this.baseUrl}/solve`, this.encodeParams(board), {
            headers: this.headers
        });
    }

    encodeParams(board: number[][]): string {
        const body = new URLSearchParams({ board: JSON.stringify(board) });
        return body.toString();
    }
}