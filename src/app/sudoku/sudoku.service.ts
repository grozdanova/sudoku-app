import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Difficulty, Board, SolveResponse, ValidateResponse } from "../models";

@Injectable()
export class SudokuService {
    private baseUrl = 'https://sugoku.onrender.com';

    constructor(private http: HttpClient) { }

    getBoard(difficulty: Difficulty = 'random') {
        return this.http.get<Board>(`${this.baseUrl}/board`, {
            params: { difficulty }
        });
    }

    validate(board: Array<Array<number>>) {
        return this.http.post<ValidateResponse>(`${this.baseUrl}/validate`, { board: JSON.stringify(board)});
    }
    solve(board: Array<Array<number>>) {
        return this.http.post<SolveResponse>(`${this.baseUrl}/solve`, { board: JSON.stringify(board)} );
    }
}