import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { hideSpinner, isPassword, showSpinner } from 'src/app/core/services/functions.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { arrayNotEmpty, isInt, isNotEmptyObject, isString } from 'class-validator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from 'src/app/services/tests.service';
@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  multiplicaciones: any[] = []

  form: FormGroup

  constructor(
    private testsService: TestsService,
    private helpers: HelpersService,
    private formBuilder: FormBuilder,
    protected dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      numero1: [0, [Validators.required, Validators.maxLength(50)]],
      numero2: [0, [Validators.maxLength(50)]],
    })
    this.resetForm()
    const data = this.activatedRoute.snapshot.data
    if (data && data.title) {
      this.helpers.setTitle(data.title)
    }
    this.getAll()
  }

  async ngOnInit() {
  }

  async getAll() {
    this.resetForm()
    showSpinner("Cargando historial de multiplicaciones")
    const result = await this.testsService.findAll()
    hideSpinner()
    if (result.success) {
      this.multiplicaciones = result.data
      console.log(this.multiplicaciones)
    } else {
      this.helpers.notifications.errorMessage(result.message)
    }
  }


  async create() {
    console.log(this.form.value)
    if (this.form.valid) {
      if (isInt(this.form.value.numero1) && isInt(this.form.value.numero2)) {
        showSpinner("Calculando resultado en el servidor")
        const result = await this.testsService.create(this.form.value)
        hideSpinner()
        if (result.success) {
          await this.getAll()
          this.helpers.notifications.successMessage(result.message)
        } else {
          this.helpers.notifications.errorMessage(result.message)
        }
      } else {
        this.helpers.notifications.errorMessage("Los números deben ser enteros, no se permiten letras")
      }
    } else {
      this.helpers.notifications.errorMessage("Por favor digite todos los campos")
    }
  }

  showResult(selected: any[]) {
    this.helpers.notifications.successDialog(`Detalles de la multiplicación`,
      `<strong>Valor 1:</strong> ${BigInt(selected[0].numero1).toString()}
      <br><strong>Valor 2:</strong> ${BigInt(selected[0].numero2).toString()}
      <br><strong>Resultado:</strong> ${BigInt(selected[0].resultado).toString()}`, "Ok", undefined, "fit-content", "fit-content")
  }

  print(value) {
    return JSON.stringify(value)
  }

  setNewValue(controlName: string, value: string) {
    this.form.get(controlName)?.setValue(value)
    return value
  }

  resetForm() {
    this.form.reset()
  }

}
