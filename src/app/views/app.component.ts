import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getConfig } from '../core/services/functions.service';
import { HelpersService } from '../core/services/helpers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  APP_OWNER: string = getConfig("app_owner");
  APP_DESCRIPTION: string = getConfig("app_description");


  constructor(private helpers: HelpersService,) {
    this.helpers.setTitle();
    this.helpers.setMetaTag("description", getConfig("app_description"))
    this.helpers.setMetaTag("author", getConfig("app_description"))
    this.title = this.helpers.getTitle();
    this.setInitialStyles();
  }
  ngOnInit() {
    console.info(environment.name.toUpperCase())
  }

  private setInitialStyles() {
    const properties: { name: string, value: string }[] = getConfig("css_style_properties")
    properties.forEach(prop => {
      document.documentElement.style.setProperty(`--${prop.name.replaceAll("_", "-")}`, prop.value)
    });
  }
}
