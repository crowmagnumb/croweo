import { Component } from "@angular/core";
import {
    ActionButtonComponent,
    AUFlexboxComponent,
    AUHttp,
    BaseComponent,
    LabeledDataComponent,
    SocketService,
} from "@animalus/core";
import {
    MusicFileStatus,
    SOCKET_TYPE_MUSIC,
    CroweoStatus,
} from "@crowmagnumb/croweo-core";
import { MusicFileComponent } from "../../components/musicFile";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridOptions } from "ag-grid-community";

@Component({
    templateUrl: "./homepage.html",
    imports: [
        ActionButtonComponent,
        AUFlexboxComponent,
        MusicFileComponent,
        AgGridAngular,
        LabeledDataComponent,
    ],
})
export class HomePageComponent extends BaseComponent {
    status: CroweoStatus;

    colDefs: ColDef<MusicFileStatus>[] = [
        {
            headerName: "Filename",
            valueGetter: (params) => params.data.mf.filename,
            sortable: true,
            width: 400,
        },
        {
            headerName: "Error",
            valueGetter: (params) => params.data?.error?.message,
            width: 400,
        },
    ];

    gridOptions = {} as GridOptions;

    constructor(private auHttp: AUHttp, socketService: SocketService) {
        super();

        auHttp.get<CroweoStatus>("status").then((status) => {
            this.status = status;
        });

        this.takeUntilDestroyed(
            socketService.filteredSub<CroweoStatus>(SOCKET_TYPE_MUSIC),
            (status) => {
                this.status = status;
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
