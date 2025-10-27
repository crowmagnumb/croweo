import { Component } from "@angular/core";

import { AUNavbarComponent, RootThemeDirective } from "@animalus/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    imports: [RootThemeDirective, AUNavbarComponent],
})
export class AppComponent {}
