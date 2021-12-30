import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuroraHelperDialogComponent } from "src/app/shared/imports/components/dialog/dialog.component";
import { AuroraHelperSnackbarComponent } from "src/app/shared/imports/components/snackbar/snackbar.component";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class NotificationHelper {
  constructor(
    protected _snackBar: MatSnackBar,
    protected _dialog: MatDialog,
  ) { }
  /**
    * Open a snakbar type with the message and function
    * @param type
    * @param message
    * @param button
    * @param time
    * @param action
    */
  public showMessage(type: "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER" | "WARNING" | "INFO" | "DARK" | "WHITE" | "GRAY",
    text: string,
    button: string = "",
    time = 2000,
    action: (() => any) = (() => { })): void {
    let _class = "whiteSnackbar"
    let _icon = ""
    switch (type) {
      case "WHITE":
        _class = "whiteSnackbar"
        _icon = ""
        break;
      case "DARK":
        _class = "darkSnackbar"
        _icon = ""
        break;
      case "PRIMARY":
        _class = "primarySnackbar"
        _icon = ""
        break;
      case "SECONDARY":
        _class = "secondarySnackbar"
        _icon = ""
        break;
      case "GRAY":
        _class = "graySnackbar"
        _icon = ""
        break;
      case "SUCCESS":
        _class = "successSnackbar"
        _icon = "check_circle"
        break;
      case "WARNING":
        _class = "warningSnackbar"
        _icon = "error_outline"
        break;
      case "DANGER":
        _class = "dangerSnackbar"
        _icon = "dangerous"
        break;
      case "INFO":
        _class = "infoSnackbar"
        _icon = "info"
        break;
    }

    const snackBarRef = this._snackBar.openFromComponent(AuroraHelperSnackbarComponent, {
      duration: time,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: _class,
      data: {
        icon: _icon, text, button, action
      }
    });

    snackBarRef.onAction().subscribe(action())
  }



  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public successMessage(message: string, button: string = "", action: (() => any) = (() => { })): void {
    this.showMessage("SUCCESS", message, button, environment.MESSAGES_DURATION, action)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public errorMessage(message: string, button: string = "", action: (() => any) = (() => { })): void {
    this.showMessage("DANGER", message, button, environment.MESSAGES_DURATION, action)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public warningMessage(message: string, button: string = "", action: (() => any) = (() => { })): void {
    this.showMessage("WARNING", message, button, environment.MESSAGES_DURATION, action)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public infoMessage(message: string, button: string = "", action: (() => any) = (() => { })): void {
    this.showMessage("INFO", message, button, environment.MESSAGES_DURATION, action)
  }
  /**
       * Shows a toast message
       * @param message
       * @param button
       * @param action
       */
  public whiteMessage(message: string, button: string = "", action: (() => any) = (() => { })): void {
    this.showMessage("WHITE", message, button, environment.MESSAGES_DURATION, action)
  }
  /**
   * Shows a modal dialog
   * @param options
   */
  showDialog(type: "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER" | "WARNING" | "INFO" | "DARK" | "WHITE" | "GRAY",
    title: string,
    text: string,
    button: string = "",
    action: (() => any) = (() => { }),
    width: string = "fit-content",
    height: string = "fit-content"): void {

    const dialogRef = this._dialog.open(AuroraHelperDialogComponent, {
      data: { type, title, text, button, action },
      width,
      height,
    });

  }


  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public successDialog(title: string, message: string, button: string = "OK", action: (() => any) = (() => { }), width: string = "400px", height: string = "fit-content") {
    this.showDialog("SUCCESS", title, message, button, action, width, height)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public errorDialog(title: string, message: string, button: string = "OK", action: (() => any) = (() => { }), width: string = "400px", height: string = "fit-content") {
    this.showDialog("DANGER", title, message, button, action, width, height)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public warningDialog(title: string, message: string, button: string = "OK", action: (() => any) = (() => { }), width: string = "400px", height: string = "fit-content") {
    this.showDialog("WARNING", title, message, button, action, width, height)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public infoDialog(title: string, message: string, button: string = "OK", action: (() => any) = (() => { }), width: string = "400px", height: string = "fit-content") {
    this.showDialog("INFO", title, message, button, action, width, height)
  }
}
