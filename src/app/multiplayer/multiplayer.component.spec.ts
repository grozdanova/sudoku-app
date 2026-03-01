import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MultiplayerComponent } from "./multiplayer.component";
import { SudokuStore } from "../sudoku/sudoku.store";
import { SudokuService } from "../sudoku/sudoku.service";
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('MultiplayerComponent', () => {
    let component: MultiplayerComponent;
    let fixture: ComponentFixture<MultiplayerComponent>;
    let mockStore: any;

    beforeEach(async () => {
        vi.useFakeTimers();
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
        await TestBed.configureTestingModule({
            imports: [MultiplayerComponent],
            providers: [
                { provide: SudokuStore, useValue: mockStore },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({ difficulty: 'easy' }),
                        },
                        queryParams: of({ playerOne: 'John', playerTwo: 'Jane' })
                    }
                }
            ]
        }).overrideComponent(MultiplayerComponent, {
            set: {
                providers: [
                    { provide: SudokuStore, useValue: mockStore },
                    { provide: SudokuService, useValue: { loadBoard: vi.fn() } }
                ]
            }
        }).compileComponents();

        fixture = TestBed.createComponent(MultiplayerComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load board with selected difficulty', () => {
        fixture.detectChanges();
        expect(component.difficulty()).toBe('easy');
        expect(mockStore.loadBoard).toHaveBeenCalledWith('easy');
    });

    it('should start timer when component is created', () => {
        fixture.detectChanges(); // Trigger constructor which starts timer
        vi.advanceTimersByTime(1005);
        expect(component.timerPlayerOne()).toBeGreaterThan(0);
        expect(component.timerPlayerTwo()).toBeGreaterThan(0);
    });
    it('should set winner when first player finishes', () => {
        component.playerOneName.set('John');
        component.playerTwoName.set('Jane');
        component.onPlayerFinish('John');
        expect(component.winner()).toBe('John');
    })
    it('should set winner when second player finishes', () => {
        component.playerOneName.set('John');
        component.playerTwoName.set('Jane');
        component.onPlayerFinish('Jane');
        component.onPlayerFinish('John');
        expect(component.winner()).toBe('Jane');
    })
});
