import { Route } from "@angular/router";
import { HomePageComponent } from "./pages/home/homepage";

export const appRoutes: Route[] = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    {
        path: "home",
        component: HomePageComponent,
    },
];
