import { Component } from "@angular/core";
import {
    ActionButtonComponent,
    AUFlexboxComponent,
    AUHttp,
    BaseComponent,
    ErrorInfoComponent,
    SocketService,
} from "@animalus/core";
import {
    MusicFile,
    MusicFileStatus,
    SOCKET_TYPE_MUSIC,
} from "@crowmagnumb/croweo-core";
import { LastN } from "../../LastN";
import { MusicFileComponent } from "../../components/musicFile";
import { ErrorInfo } from "@animalus/corejs";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridOptions } from "ag-grid-community";

@Component({
    templateUrl: "./homepage.html",
    imports: [
        ActionButtonComponent,
        AUFlexboxComponent,
        MusicFileComponent,
        ErrorInfoComponent,
        AgGridAngular,
    ],
})
export class HomePageComponent extends BaseComponent {
    history: LastN<MusicFileStatus>;
    hist: MusicFileStatus[];
    mf: MusicFile;
    error: ErrorInfo;

    colDefs: ColDef<MusicFileStatus>[] = [
        {
            headerName: "Filename",
            valueGetter: (params) => params.data.mf.filename,
            sortable: true,
            width: 200,
        },
        {
            headerName: "Error",
            valueGetter: (params) => params.data?.error,
            width: 200,
        },
    ];

    gridOptions = {} as GridOptions;

    constructor(private auHttp: AUHttp, socketService: SocketService) {
        super();

        this.takeUntilDestroyed(
            socketService.filteredSub<MusicFileStatus>(SOCKET_TYPE_MUSIC),
            (item) => {
                this.hist = this.history.add(item);
                this.mf = item.mf;
                if (item.error) {
                    this.error = item.error;
                }
            }
        );
    }

    random() {
        this.auHttp.post("random");
    }

    skip() {
        this.auHttp.post("skip");
    }

    stop() {
        this.auHttp.post("stop");
    }
}
