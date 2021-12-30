import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { TimeAgoPipe } from 'time-ago-pipe';
import { getConfig, ignoreSpecialCharacters, toTitleCase } from './functions.service';
import { NotificationHelper } from './helpers/notification.helper';
import { RequestsService } from './requests.service';


@Injectable({
  providedIn: 'root',
})
export class HelpersService {

  constructor(
    private _title: Title,
    private _meta: Meta,
    public notifications: NotificationHelper,
    private requestService: RequestsService,
    private datePipe: TimeAgoPipe
  ) {
  }

  /**
   * Set a new page meta title
   * @param title The new title
   * @param stringCase Case to transform
   */
  public setTitle(title: string = "") {
    title = ignoreSpecialCharacters(title.trim(), " ");
    if (title.length > 0) {
      this._title.setTitle(toTitleCase(`${title} | ${getConfig("app_name")} - ${environment.name}`))
    } else {
      this._title.setTitle(toTitleCase(`${getConfig("app_name")} - ${environment.name}`))
    }
    const navTitle = document.getElementById("aurora-nav-title")
    if (navTitle) {
      navTitle.innerHTML = `${getConfig("app_name")} > ${title}`
      setTimeout(() => {
        navTitle.innerHTML = `${getConfig("app_name")} > ${title}`
      }, 500);
    }
  }

  /**
   * Current title
   * @returns current title
   */
  public getTitle(): string {
    return this._title.getTitle()
  }
  public getTimeAgo(date: Date) {
    return this.datePipe.transform(date.toString())
  }
  /**
   * Set a meta tag element on the head of current HTML
   * @param name
   * @param content
   * @param stringCase
   */
  public setMetaTag(name: string = "", content: string = "") {
    name = name.trim();
    content = content.trim();
    if (name.length > 0 && content.length > 0) {
      const current = this._meta.getTag(`name='${name}'`)
      if (current) {
        current.setAttribute("content", content)
      } else {
        this._meta.addTag({ name, content })
      }
    }
  }

  public async getIcons() {
    const result = await this.requestService.get("/assets/properties/mat-icons.json")
    result.data && Array.isArray(result.data) ? result.data.sort() : []
    return result.data
  }
}


