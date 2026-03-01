import { patchState } from '@ngrx/signals';
import { of } from 'rxjs';
import { SudokuStore } from './sudoku.store';
import { ResponseStatus } from '../models';
import { SudokuService } from './sudoku.service';
import { TestBed } from '@angular/core/testing';

describe('SudokuStore', () => {
  let store: any;
  let mockService: any;

  beforeEach(() => {
    mockService = {
      getBoard: vi.fn(),
      solve: vi.fn(),
      validate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SudokuService, useValue: mockService },
        SudokuStore
      ]
    });

    store = TestBed.inject(SudokuStore) as any;

    patchState(store, {
      board: [],
      initialBoard: [],
      loading: false,
      error: '',
      solveResponse: null,
      validateResponse: null
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('updateCell should modify the board value', () => {
    patchState(store, { board: [[0, 0], [0, 0]] });
    store.updateCell(1, 1, 5);
    expect(store.board()).toEqual([[0, 0], [0, 5]]);
  });

  it('loadBoard sets board, initialBoard and clears loading', async () => {
    const fake = [[1, 2], [3, 4]];
    mockService.getBoard.mockReturnValue(of({ board: fake } as any));

    await store.loadBoard('easy');

    expect(store.board()).toEqual(fake);
    expect(store.initialBoard()).toEqual(fake);
    expect(store.loading()).toBe(false);
  });

  it('solve stores response and updates board when solved', async () => {
    const response = { solution: [[9]], status: ResponseStatus.SOLVED } as any;
    mockService.solve.mockReturnValue(of(response));

    await store.solve([[0]]);

    expect(store.solveResponse()).toBe(response);
    expect(store.board()).toEqual(response.solution);
    expect(store.loading()).toBe(false);
  });

  it('validateBoard stores the validation response', async () => {
    const valResp = { status: 'unsolved' } as any;
    mockService.validate.mockReturnValue(of(valResp));

    await store.validateBoard([[0]]);

    expect(store.validateResponse()).toBe(valResp);
    expect(store.loading()).toBe(false);
  });
});
