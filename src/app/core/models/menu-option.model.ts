import { ROLES, STATUS } from "../constants.config";

export class MenuOption {
  id?: number;
  name?: string;
  description?: string;
  icon?: string;
  status?: STATUS;
  route?: string
  options?: MenuOption[]
  roles?: ROLES[]
}
