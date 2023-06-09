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
import { UserOrderComponent } from './pages/user-order/user-order.component';
import {MatTableModule} from "@angular/material/table";
import { ReservationsTableComponent } from './pages/user-reservations/reservations-table/reservations-table.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
import { MenuItemComponent } from './pages/menu-items-admin/components/menu-item/menu-item.component';
import {MatCardModule} from "@angular/material/card";
import { MenuItemFormDialogComponent } from './pages/menu-items-admin/components/menu-item-form-dialog/menu-item-form-dialog.component';
import { PasswordConfirmationComponent } from './components/form/password-confirmation/password-confirmation.component';
import { ImageFileInputComponent } from './components/form/image-file-input/image-file-input.component';
import { UsernameInputComponent } from './components/form/username-input/username-input.component';
import { CarouselComponent } from './pages/home/components/carousel/carousel.component';
import { MenuSectionFormDialogComponent } from './components/form-dialogs/menu-section-form-dialog/menu-section-form-dialog.component';
import { CartComponent } from './components/cart/cart.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { UserOrderHistoryComponent } from './pages/user-order-history/user-order-history.component';
import { SuccessfulOrderComponent } from './pages/successful-order/successful-order.component';
import { TipSelectorComponent } from './components/tip-selector/tip-selector.component';
import { HomeDeliverySelectorComponent } from './components/home-delivery-selector/home-delivery-selector.component';
import { OrderHistoryAdminComponent } from './pages/order-history-admin/order-history-admin.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ReviewsPreviewComponent } from './components/reviews-preview/reviews-preview.component';
import { WriteReviewComponent } from './pages/write-review/write-review.component';
import { ReviewComponent } from './components/review/review.component';
import { StarsRatingComponent } from './components/stars-rating/stars-rating.component';
import { StarsRatingInputComponent } from './components/form/stars-rating-input/stars-rating-input.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import {CustomMatPaginatorIntlService} from "./services/custom-mat-paginator-intl.service";
import { JobApplicationComponent } from './pages/job-application/job-application.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { JobApplicationsAdminComponent } from './pages/job-applications-admin/job-applications-admin.component';
import { MapComponent } from './components/map/map.component';

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
    UserOrderComponent,
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
    PasswordConfirmationComponent,
    ImageFileInputComponent,
    UsernameInputComponent,
    CarouselComponent,
    MenuSectionFormDialogComponent,
    CartComponent,
    UserOrderHistoryComponent,
    SuccessfulOrderComponent,
    TipSelectorComponent,
    HomeDeliverySelectorComponent,
    OrderHistoryAdminComponent,
    ReviewsPreviewComponent,
    WriteReviewComponent,
    ReviewComponent,
    StarsRatingComponent,
    StarsRatingInputComponent,
    ReviewsComponent,
    JobApplicationComponent,
    PdfViewerComponent,
    JobApplicationsAdminComponent,
    MapComponent
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
    MatCardModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
