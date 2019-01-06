import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WalletComponent } from './wallet/wallet.component';
import { RouterModule, Routes } from '@angular/router';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {SlideMenuModule} from 'primeng/slidemenu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarModule} from 'primeng/toolbar';
import {AccountService} from './services/account.service';
import {AlertService} from './services/alert.service';
import {LoadingService} from './services/loading.service';
import { WaitingComponent } from './waiting/waiting.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChartModule} from 'primeng/chart';
import {MarketService} from './services/market.service';
import {TransfertComponent} from "./transfert/transfert.component";
import {TransfertService} from "./services/transfert.service";
import { NumericTextboxModule } from 'ngx-numeric-textbox';
import {AutoCompleteModule} from 'primeng/autocomplete';

const appRoutes: Routes = [
  
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'wallet', component: WalletComponent, children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'transfert', component: TransfertComponent}
  ]}

]

@NgModule({
  imports: [
    CardModule,
    ButtonModule,
    ToolbarModule,
    BrowserModule,
    SlideMenuModule,
    ScrollPanelModule,
    ChartModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NumericTextboxModule,
    AutoCompleteModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    WalletComponent,
    WaitingComponent,
    CreateAccountComponent,
    MenuComponent,
    DashboardComponent,
    TransfertComponent
  ],
  providers: [AccountService,AlertService,LoadingService,MarketService,TransfertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
