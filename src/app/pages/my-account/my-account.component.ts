import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {translate} from "@ngneat/transloco";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {AlertError} from "../../errors/alert-error.errors";
import {AlertsService} from "../../services/alerts.service";
import {UserDeletionService} from "../../services/user-deletion.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  user: User | null = null
  userSubscription?: Subscription

  constructor(
    private readonly userService: UserService,
    private readonly userDeletionService: UserDeletionService,
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly alertsService: AlertsService
  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.getCurrentUserObservable().subscribe(user => {
      this.user = user
    })
  }

  async logOut() {
    try {
      await this.authService.logOut()
      await this.router.navigate(['/log-in'])
    } catch (e) {
      console.error(e)
    }
  }

  onDeleteAccountButtonClicked() {
    this.openDeleteAccountConfirmation()
  }

  async deleteAccount(): Promise<void> {
    try {
      await this.userDeletionService.deleteCurrentUser()
      await this.router.navigate(['/log-in'])
    } catch (e: any) {
      console.error(e)
      if (e.name === AlertError.RECENT_LOGIN_REQUIRED)
        return this.openLogInRedirectConfirmation()
      await this.alertsService.showErrorAlert(e.name)
    }
  }

  openDeleteAccountConfirmation(isSecondConfirmation: boolean = false) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: translate('confirmationTitles.deleteAccount'),
        message: translate('confirmations.deleteAccount' + (isSecondConfirmation ? '2' : '')),
        yes: translate('confirmationOptions.yes'),
        no: translate('confirmationOptions.no')
      }
    })
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        if (isSecondConfirmation) return await this.deleteAccount()
        this.openDeleteAccountConfirmation(true)
      }
    })
  }

  openLogInRedirectConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: translate('confirmationTitles.deleteAccount'),
        message: translate('confirmations.logInBeforeDeleteAccount'),
        yes: translate('confirmationOptions.logIn'),
        no: translate('confirmationOptions.cancel')
      }
    })
    dialogRef.afterClosed().subscribe(async result => {
      if (result) await this.logOut()
    })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }
}
