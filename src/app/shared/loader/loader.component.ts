import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loader',
    imports: [MatProgressSpinnerModule],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss'
})
export class AppLoaderComponent {
    message = input<string>('Loading...');
    diameter = input<number>(80);
}
