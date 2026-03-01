import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { PlayerDialogComponent } from "./player-dialog/player-dialog.component";
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: []
})
export class HomeComponent {
    private router = inject(Router);
    private dialog = inject(MatDialog);


    navigateToSingleplayer() {
        this.router.navigate(['/singleplayer']);
    }

    openDialog() {
        this.dialog.open(PlayerDialogComponent, {
            width: '500px',
            disableClose: false,
            ariaLabel: 'Player name entry'
        });
    }
}