import { MenuOption } from "./menu-option.model";

export class MenuModule {
  id?: number;
  name?: string;
  description?: string;
  icon?: string;
  status?: number;
  options?: MenuOption[]
}
