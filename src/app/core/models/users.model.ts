import { ROLES } from "src/app/core/constants.config";

export class User {
  id?: number;
  full_name?: string;
  first_name?: string;
  second_name?: string;
  first_lastname?: string;
  second_lastname?: string;
  password?: string;
  email?: string;
  phone?: string;
  status?: number;
  completed?: number
  created?: Date;
  modified?: Date;
  creator?: number;
  editor?: number;
  role?: ROLES = ROLES.GENERAL;
}
