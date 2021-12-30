import { environment } from "src/environments/environment";
import { toTitleCase } from "./services/functions.service";

/**
 * Global constant for default configurations
 */
export const config: any = []

/**
 * Styles
 */

//navbar
config["css_style_properties"] = [
  //colors
  // { name: "light", value: "#f8f9fe" },
  // { name: "primary", value: "#f33" },
  // { name: "secondary", value: "#f56036" },
  // { name: "gray", value: "#88A0C5" },
  // { name: "dark", value: "#191E4D" },
  // { name: "danger", value: "#FA6F6F" },
  // { name: "warning", value: "#f1bc2a" },
  // { name: "success", value: "#4cca79" },
  // { name: "info", value: "#1999c0" },
  //radius
  { name: "default_radius", value: "5px" },
  { name: "dropdown_radius", value: "5px" },
  { name: "card_radius", value: ".375rem" },
  { name: "field_radius", value: "8px" },
  { name: "button_radius", value: "8px" },
  //Other colors
  { name: "border-color", value: "#e9e9e9" },
  { name: "shadow-color", value: "#0000003b" },
  { name: "input-color", value: "#f0f2f5" },

  //sizes
  { name: "rounded-sm", value: "10px" },
  { name: "rounded:", value: "15px" },
  { name: "border:", value: "1px solid rgba(0,0,0,.05)" },

  //effects
  { name: "shadow-xs", value: "1px 1px 2px 0px #0000003b" },
  { name: "shadow-sm", value: "3px 3px 4px 0px #0000003b" },
  { name: "shadow-md", value: "0 50px 100px rgb(50 50 93 / 10%), 0 15px 35px rgb(50 50 93 / 15%), 0 5px 15px rgb(0 0 0 / 10%)" },
  { name: "shadow:", value: "0 0 2rem 0 rgba(136,152,170,.15)" },
  { name: "shadow-fb", value: "0 1px 2px rgba(0, 0, 0, 0.2)" },

  //Fonts
  { name: "default-font-size", value: "16px" },
  { name: "primary-font", value: "Montserrat" },
  { name: "secondary-font", value: "Karla" },
  { name: "last-font", value: "Poppins" },

  { name: "font-thin", value: 100 },
  { name: "font-extra-light", value: 200 },
  { name: "font-light", value: 300 },
  { name: "font-regular", value: 400 },
  { name: "font-medium", value: 500 },
  { name: "font-semibold", value: 600 },
  { name: "font-bold", value: 700 },
  { name: "font-extra-bold", value: 800 },
  { name: "font-black", value: 900 },

  //transitions
  { name: "transition-basic", value: "all ease 0.3s" },
]

//app
config["app_name"] = "Aurora";
config["app_version"] = "0.0.1";
config["app_developer"] = "IVVI";
config["app_developer_link"] = "https://github.com/victorguz?tab=repositories";
config["app_owner"] = "Aurora";
config["app_owner_link"] = "https://www.google.com";
config["app_wellcome"] = "Bienvenido a Aurora,";
config["app_description"] = `gestiona la información de tus clientes, membresías, inventarios e ingresos en un solo lugar.`
config["app_keywords"] = ["clientes", "membresías", "inventarios", "ingresos", "finanzas",]

//Default routes
config["route_on_login"] = "/home";
config["route_on_cant_register"] = "/dashboard";
config["route_on_forbidden"] = "/403";

//Default configuration
config["users_can_unlock_their_own_user"] = true;
config["users_can_register_themselves"] = false;

//Meta tags


