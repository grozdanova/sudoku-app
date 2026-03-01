import { TestBed } from "@angular/core/testing";
import { ComponentFixture } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { vi } from "vitest";

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let mockRouter: any;
    let mockDialog: any;

    beforeEach(async () => {
        mockRouter = {
            navigate: vi.fn()
        };
        mockDialog = {
            open: vi.fn()
        };

        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockDialog }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to singleplayer', () => {
        component.navigateToSingleplayer();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/singleplayer']);
    });
    it('should open dialog', () => {
        component.openDialog();
        expect(mockDialog.open).toHaveBeenCalled();
    });
});