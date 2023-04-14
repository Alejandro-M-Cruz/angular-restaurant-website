import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { FooterComponent } from './components/footer/footer.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { StoryComponent } from './components/story/story.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimePickerComponent } from './components/form/time-picker/time-picker.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DatePickerComponent } from './components/form/date-picker/date-picker.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { LogInComponent } from './pages/log-in/log-in.component';
import { NewReservationComponent } from './pages/new-reservation/new-reservation.component';
import { EmailInputComponent } from './components/form/email-input/email-input.component';
import { PasswordInputComponent } from './components/form/password-input/password-input.component';
import { AlreadySignedUpLinkComponent } from './components/already-signed-up/already-signed-up-link.component';
import { MenuComponent } from './pages/home/components/menu/menu.component';
import { UserReservationsComponent } from './pages/user-reservations/user-reservations.component';
import {MatTableModule} from "@angular/material/table";
import { ReservationsTableComponent } from './pages/user-reservations/reservations-table/reservations-table.component';

import es from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AlertComponent } from './components/alert/alert.component';
import { CustomersInputComponent } from './components/form/customers-input/customers-input.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { TextareaComponent } from './components/form/textarea/textarea.component';
import {MatNativeDateModule} from "@angular/material/core";
import { MyAccountComponent } from './pages/my-account/my-account.component';
import {ComplaintsAdminComponent} from "./pages/complaints-admin/complaints-admin.component";
import { AdminReservationsComponent } from './pages/reservations-admin/admin-reservations.component';
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import { AdminReservationsTableComponent } from './pages/reservations-admin/admin-reservations-table/admin-reservations-table.component';
import {getStorage, provideStorage} from "@angular/fire/storage";
import { MenuSectionsAdminComponent } from './pages/menu-sections-admin/menu-sections-admin.component';
import { MenuItemsAdminComponent } from './pages/menu-items-admin/menu-items-admin.component';
import { TextInputDialogComponent } from './components/text-input-dialog/text-input-dialog.component';
import { ReservationsPaginatorIntl } from "./pages/reservations-admin/admin-reservations-table/reservations-paginator-intl";
import { MenuItemComponent } from './pages/menu-items-admin/components/menu-item/menu-item.component';
import {MatCardModule} from "@angular/material/card";
import { MenuItemFormDialogComponent } from './pages/menu-items-admin/components/menu-item-form-dialog/menu-item-form-dialog.component';
registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignUpComponent,
    FooterComponent,
    StoryComponent,
    TimePickerComponent,
    DatePickerComponent,
    LogInComponent,
    NewReservationComponent,
    EmailInputComponent,
    PasswordInputComponent,
    AlreadySignedUpLinkComponent,
    UserReservationsComponent,
    ReservationsTableComponent,
    MenuComponent,
    ConfirmationDialogComponent,
    AlertComponent,
    CustomersInputComponent,
    ComplaintsComponent,
    ComplaintsAdminComponent,
    TextareaComponent,
    MyAccountComponent,
    AdminReservationsComponent,
    AdminReservationsTableComponent,
    MenuSectionsAdminComponent,
    MenuItemsAdminComponent,
    TextInputDialogComponent,
    MenuItemComponent,
    MenuItemFormDialogComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslocoRootModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        FormsModule,
        NgbModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatDatepickerModule,
        MatListModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        MatDialogModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatCardModule
    ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: MatPaginatorIntl, useClass: ReservationsPaginatorIntl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
