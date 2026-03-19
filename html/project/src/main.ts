import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

import { CommonModule } from "@angular/common";
import {  provideHttpClient, withFetch } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";
import Aura from "@primeuix/themes/aura";
import { ButtonModule } from "primeng/button";
import { provideRouter, RouterOutlet } from "@angular/router";
import { routes } from "./app.routes";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".app-dark",
          cssLayer: {
            name: "primeng",
            order: "theme, base, primeng",
          },
        },
      },
    }),
    provideRouter(routes),
  ],
});
