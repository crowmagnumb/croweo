import { bootstrapApplication } from "@angular/platform-browser";
import { getAppProviders, initApp } from "@animalus/core";
import { AppComponent } from "./app/app.component";
import { appRoutes } from "./app/app.routes";

initApp();

bootstrapApplication(AppComponent, {
    providers: getAppProviders("assets/app-config.yml", appRoutes),
});
