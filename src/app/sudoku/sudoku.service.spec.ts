import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SudokuService } from './sudoku.service';

describe('SudokuService', () => {
  let service: SudokuService;
  let http: HttpTestingController;
  const baseUrl = 'https://sugoku.onrender.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [SudokuService, provideHttpClientTesting()]
    });
    service = TestBed.inject(SudokuService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBoard uses default difficulty', () => {
    service.getBoard().subscribe();
    const req = http.expectOne(r => r.method === 'GET' && r.url.endsWith('/board'));
    expect(req.request.params.get('difficulty')).toBe('random');
    req.flush({ board: [[1]] });
  });

  it('getBoard with explicit difficulty', () => {
    service.getBoard('easy').subscribe();
    const req = http.expectOne(r => r.method === 'GET' && r.url.endsWith('/board'));
    expect(req.request.params.get('difficulty')).toBe('easy');
    req.flush({ board: [[1]] });
  });

  it('validate posts board', () => {
    const board = [[1, 2], [3, 4]];
    service.validate(board).subscribe();
    const req = http.expectOne(`${baseUrl}/validate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ board: JSON.stringify(board) });
    req.flush({ status: 'unsolved' });
  });

  it('solve posts board', () => {
    const board = [[1, 2], [3, 4]];
    service.solve(board).subscribe();
    const req = http.expectOne(`${baseUrl}/solve`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ board: JSON.stringify(board) });
    req.flush({ solution: board, status: 'solved' });
  });
});
