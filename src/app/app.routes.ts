import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { SingleplayerComponent } from './singleplayer/singleplayer.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'singleplayer',
        component: SingleplayerComponent
    },
    {
        path: 'multiplayer/:difficulty',
        component: MultiplayerComponent
    }
];
