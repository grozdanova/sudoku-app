import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Difficulty, Board, SolveResponse, ValidateResponse } from "../models";

@Injectable()
export class SudokuService {
    private baseUrl = 'https://sugoku.onrender.com';
    private headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    constructor(private http: HttpClient) { }

    getBoard(difficulty: Difficulty = 'random') {
        return this.http.get<Board>(`${this.baseUrl}/board`, {
            params: { difficulty }
        });
    }

    validate(board: Array<Array<number>>) {
        return this.http.post<ValidateResponse>(`${this.baseUrl}/validate`, this.encodeParams(board), {
            headers: this.headers
        });
    }

    solve(board: Array<Array<number>>) {
        return this.http.post<SolveResponse>(`${this.baseUrl}/solve`, this.encodeParams(board), {
            headers: this.headers
        });
    }

    encodeParams(board: Array<Array<number>>): string {
        const body = new URLSearchParams({ board: JSON.stringify(board) });
        return body.toString();
    }
}