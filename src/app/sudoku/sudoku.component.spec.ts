import { SudokuComponent } from './sudoku.component';
import { TestBed } from '@angular/core/testing';
import { SudokuStore } from './sudoku.store';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SudokuComponent', () => {
    let component: SudokuComponent;
    let mockStore: any;
    let mockSnackBar: any;

    let fixture: any;

    beforeEach(async () => {
        mockStore = {
            board: vi.fn().mockReturnValue([[0]]),
            initialBoard: vi.fn().mockReturnValue([[0]]),
            loading: vi.fn().mockReturnValue(false),
            error: vi.fn().mockReturnValue(''),
            solveResponse: vi.fn().mockReturnValue(null),
            validateResponse: vi.fn().mockReturnValue(null),
            loadBoard: vi.fn(),
            validateBoard: vi.fn(),
            solve: vi.fn(),
            updateCell: vi.fn(),
            setBoardFromData: vi.fn()
        };

        mockSnackBar = {
            open: vi.fn()
        };

        await TestBed.configureTestingModule({
            imports: [SudokuComponent]
        });

        TestBed.overrideComponent(SudokuComponent, {
            set: {
                providers: [
                    { provide: SudokuStore, useValue: mockStore },
                    { provide: MatSnackBar, useValue: mockSnackBar }
                ]
            }
        });

        await TestBed.compileComponents();

        fixture = TestBed.createComponent(SudokuComponent);
        component = fixture.componentInstance as SudokuComponent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('lifecycle & actions', () => {
        it('in multiplayer mode, it sets the board from data', () => {
            fixture.componentRef.setInput('multiplayer', true);
            const data = [[1, 2], [3, 4]];
            fixture.componentRef.setInput('boardData', data);
            fixture.detectChanges();

            expect(mockStore.setBoardFromData).toHaveBeenCalledWith(data);
        });

        it('in singleplayer mode, it loads the board', () => {
            fixture.componentRef.setInput('multiplayer', false);
            fixture.detectChanges();
            expect(mockStore.loadBoard).toHaveBeenCalledWith('easy');
        });

        it('validate() forwards current board to store', () => {
            const board = [[1, 2], [3, 4]];
            mockStore.board.mockReturnValue(board);
            component.validate();
            expect(mockStore.validateBoard).toHaveBeenCalledWith(board);
        });

        it('solve() forwards current board to store', () => {
            const board = [[5, 6], [7, 8]];
            mockStore.board.mockReturnValue(board);
            component.solve();
            expect(mockStore.solve).toHaveBeenCalledWith(board);
        });
    });

    describe('user input helpers', () => {
        beforeEach(() => {
            // reset any calls
            mockStore.updateCell.mockClear();
        });

        it('onInput accepts numbers 1-9 and updates cell', () => {
            component.onInput(0, 0, '5');
            expect(mockStore.updateCell).toHaveBeenCalledWith(0, 0, 5);
        });

        it('onInput ignores non-numeric or out-of-range values', () => {
            component.onInput(0, 0, '0');
            component.onInput(0, 0, 'a');
            component.onInput(0, 0, '10');
            expect(mockStore.updateCell).not.toHaveBeenCalled();
        });

        it('validateKey prevents invalid characters', () => {
            const ev = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
            // Vitest doesn't provide spyOn on DOM instances by default; stub the method
            (ev as any).preventDefault = vi.fn();
            component.validateKey(ev);
            expect((ev as any).preventDefault).toHaveBeenCalled();
        });

        it('validateKey allows digits 1-9', () => {
            const ev = new KeyboardEvent('keydown', { key: '7', cancelable: true });
            (ev as any).preventDefault = vi.fn();
            component.validateKey(ev);
            expect((ev as any).preventDefault).not.toHaveBeenCalled();
        });
    });

    describe('validateEffect', () => {
        it('shows success message when status is solved', () => {
            mockStore.validateResponse.mockReturnValue({ status: 'solved' });
            mockSnackBar.open.mockClear();
            const freshFixture = TestBed.createComponent(SudokuComponent);
            freshFixture.detectChanges();
            expect(mockSnackBar.open).toHaveBeenCalledWith(
                'Congratulations! The board is solved.',
                'Close',
                expect.objectContaining({ panelClass: ['success-snackbar'] })
            );
        });

        it('shows unsolved message for unsolved status', () => {
            mockStore.validateResponse.mockReturnValue({ status: 'unsolved' });
            mockSnackBar.open.mockClear();
            const freshFixture = TestBed.createComponent(SudokuComponent);
            freshFixture.detectChanges();
            expect(mockSnackBar.open).toHaveBeenCalledWith(
                'The board is unsolved. Please check your entries.',
                'Close',
                expect.objectContaining({ panelClass: ['error-snackbar'] })
            );
        });

        it('shows invalid message for any other status', () => {
            mockStore.validateResponse.mockReturnValue({ status: 'invalid' });
            mockSnackBar.open.mockClear();
            const freshFixture = TestBed.createComponent(SudokuComponent);
            freshFixture.detectChanges();
            expect(mockSnackBar.open).toHaveBeenCalledWith(
                'The board is invalid. Keep going!',
                'Close',
                expect.objectContaining({ panelClass: ['error-snackbar'] })
            );
        });
    });
});
