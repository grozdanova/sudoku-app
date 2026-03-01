import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PlayerDialogComponent } from "./player-dialog.component";
import { MatDialogRef } from "@angular/material/dialog";


describe('PlayerDialogComponent', () => {
    let component: PlayerDialogComponent;
    let fixture: ComponentFixture<PlayerDialogComponent>;
    let dilogRefMock: MatDialogRef<PlayerDialogComponent>;

    beforeEach(async () => {
        dilogRefMock = {
            close: vi.fn()
        } as any;
        await TestBed.configureTestingModule({
            imports: [PlayerDialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: dilogRefMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayerDialogComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should close dialog when form is submitted', () => {
        component.playerForm.setValue({
            playerOne: 'John',
            playerTwo: 'Jane',
            difficulty: 'easy'
        });
        component.startGame();
        expect(dilogRefMock.close).toHaveBeenCalled();
    });
});