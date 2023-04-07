import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../model/user-info.model";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {translate} from "@ngneat/transloco";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  userInfo: UserInfo = this.userService.getUserInfo()!

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

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

  async deleteAccount() {
    try {
      await this.userService.deleteUser()
      await this.router.navigate(['/log-in'])
    } catch (e: any) {
      console.error(e.name + ': ' + e.message)
      if (e.message === 'redirect-to-login') {
        this.openLogInRedirectConfirmation()
      }
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
}
