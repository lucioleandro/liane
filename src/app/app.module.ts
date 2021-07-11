import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {PickListModule} from 'primeng/picklist';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';

// Application Components
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppConfigComponent} from './core/page-configs/app.config.component';
import {AppMenuComponent} from './core/menu/app.menu.component';
import {AppMenuitemComponent} from './core/menu/app.menuitem.component';

// Demo pages
import { AppCodeModule } from './shared/components/app-code/app.code.component';
import {DashboardDemoComponent} from './sistema/view/dashboarddemo.component';
import {AppLoginComponent} from './pages/app.login.component';

// Demo services
import {IconService} from './sistema/service/iconservice';
import {PhotoService} from './sistema/service/photoservice';

// Application services
import {MenuService} from './core/menu/services/app.menu.service';
import { DocumentationComponent } from './sistema/view/documentation.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ButtonModule,
        CardModule,
        CheckboxModule,
        InputSwitchModule,
        PickListModule,
        RadioButtonModule,
        RippleModule,
        ToastModule,
        AppCodeModule
    ],
    declarations: [
        AppAccessdeniedComponent,
        AppErrorComponent,
        AppNotfoundComponent,
        DocumentationComponent,
        AppComponent,
        AppMainComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        DashboardDemoComponent,
        AppLoginComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
         IconService, PhotoService, MenuService, MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
