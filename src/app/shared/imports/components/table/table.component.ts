import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { isEmpty, isNotEmpty, isNumber, isString } from "class-validator";
import { toTitleCase } from "src/app/core/services/functions.service";


@Component({
  selector: 'aurora-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class AuroraTableComponent implements OnChanges, AfterViewInit, OnInit {


  @Input() multipleSelection: boolean = false
  @Output() clickRow = new EventEmitter<any[]>()
  @Input() pageSizeOptions: number[] = [5, 10, 20]
  @Input() class: string = ""



  @Input() title: string = ""
  @Input() description: string = ""
  @Input() columns: AuroraTableColumn[] = []
  @Input() data: any[] = []

  displayedColumns: string[] = this.columns.map(value => { return value.name })
  dataSource = new MatTableDataSource<Set<any>>(this.data);
  selected = new Set<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges() {
    this.ngOnInit()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
    this.selected = new Set<any>();
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    //Si no viene el parametro de columnas por defecto, se llena desde el parámetro "data"
    if (this.columns.length == 0 && this.dataSource.data.length > 0) {
      for (const key in this.data[0]) {
        if (Object.prototype.hasOwnProperty.call(this.data[0], key)) {
          this.columns.push({ name: key.toLowerCase(), title: toTitleCase(key) })
        }
      }
    }
    this.displayedColumns = this.columns.map(value => { return value.name })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRowToItems(row: any) {
    if (this.multipleSelection) {
      if (this.selected.has(row)) {
        this.selected.delete(row)
      } else {
        this.selected.add(row)
      }
      this.clickRow.emit(Array.from(this.selected))
    } else {
      this.clickRow.emit([row])
    }
  }

  print(value: any) {
    return JSON.stringify(value)
  }

  render(item: AuroraTableColumn, element: any) {
    const el = {}
    for (const key in element) {
      if (Object.prototype.hasOwnProperty.call(element, key)) {
        el[key.toLowerCase()] = element[key]
      }
    }
    const result = item.render ? item.render(el[item.name], el) :
      (isString(el[item.name]) || isNumber(el[item.name]) || isEmpty(el[item.name]) ? el[item.name] : JSON.stringify(el[item.name]))
    return isNotEmpty(result) ? String(isNaN(Number(result)) ? result : Number(result)) : ""
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface AuroraTableColumn {
  name: string
  title: string
  render?: (value: any, row: any) => string
}
