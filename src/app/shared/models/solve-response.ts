
import { Difficulty } from './board-difficulty';

export enum ResponseStatus {
    SOLVED = "solved",
    BROKEN = "broken",
    UNRESOLVABLE = "unsolvable"
};

export interface SolveResponse {
    difficulty: Difficulty;
    solution: number[][];
    status: ResponseStatus;
};

