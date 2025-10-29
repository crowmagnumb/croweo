import { Component } from "@angular/core";
import {
    ActionButtonComponent,
    AUFlexboxComponent,
    AUHttp,
} from "@animalus/core";

@Component({
    templateUrl: "./homepage.html",
    imports: [ActionButtonComponent, AUFlexboxComponent],
})
export class HomePageComponent {
    constructor(private auHttp: AUHttp) {}

    random() {
        this.auHttp.post("random");
    }

    stop() {
        this.auHttp.post("stop");
    }
}
