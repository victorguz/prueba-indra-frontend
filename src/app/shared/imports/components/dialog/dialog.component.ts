import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'aurora-helper-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content [innerHTML]="data.text"></div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancelClick($event)">Cancelar</button>
      <button mat-button (click)="onOkClick()" class="{{data.type}}" cdkFocusInitial>{{data.button}}</button>
    </div>

  `
})
export class AuroraHelperDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AuroraHelperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER" | "WARNING" | "INFO" | "DARK" | "WHITE" | "GRAY",
      title: string, text: string, button: string, func?: () => any
    }
  ) {

    this.data.button = this.data.button ? this.data.button : "Ok"
  }

  onCancelClick(event: Event): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    if (typeof this.data.func == 'function') {
      this.data.func()
    }
    this.dialogRef.close();
  }


}

