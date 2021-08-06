import { Store } from "@ngrx/store";
import { AuthService, AuthResponseData } from "./auth.service";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { SnackBarMainComponent } from "../shared/snackbar/snack-bar.component";

import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../login-dialog/store/auth.actions";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.css"],
})
export class LoginDialogComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  public openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogOverviewDialog, {
      width: "350px",
    });
  }

  ngOnInit() {}
}

@Component({
  selector: "app-login-dialog-overview-dialog",
  templateUrl: "./login-dialog-overview-dialog.html",
})
export class LoginDialogOverviewDialog implements OnInit {
  @ViewChild(SnackBarMainComponent, { static: false })
  private snackBarAlert: SnackBarMainComponent;

  isInLoginMode = true;
  authForm: FormGroup;
  isLoading = false;
  error = null;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogOverviewDialog>,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });

    this.store.select("auth").subscribe((authState) => {
      this.isLoading = authState.isLoading;
      this.error = authState.authError;
    });
  }
  switchLoginMode() {
    this.isInLoginMode = !this.isInLoginMode;
  }

  authObs: Observable<AuthResponseData>;

  onSubmit(form: FormGroup) {
    const email = form.value.email;
    const password = form.value.password;
    if (this.isInLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }
  }
}
