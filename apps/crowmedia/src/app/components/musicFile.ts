import { Component, Input } from "@angular/core";

import { LabeledDataComponent } from "@animalus/core";
import { MusicFile } from "@crowmagnumb/croweo-core";

@Component({
    selector: "music-file",
    templateUrl: "./musicFile.html",
    imports: [LabeledDataComponent],
})
export class MusicFileComponent {
    @Input() mf: MusicFile;
}
