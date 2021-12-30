import { ROLES, STATUS } from "./constants.config";
import { MenuModule } from "./models/menu-module.model";

export const modules: MenuModule[] = [
  {
    id: 1,
    name: "Clientes",
    description: "Acciones de gestión de clientes",
    icon: "home",
    status: STATUS.ENABLED,
    options: [
      {
        id: 1,
        name: "Gestionar",
        description: "Gestiona la información de tus clientes",
        icon: "home",
        route: "clients",
        roles: [ROLES.GENERAL],
        status: STATUS.ENABLED,
      },
      {
        id: 2,
        name: "Autenticar",
        description: "Aquí se autentican los clientes",
        icon: "home",
        route: "clients/auth",
        roles: [ROLES.GENERAL],
        status: STATUS.ENABLED,
      },

    ]
  },
  {
    id: 2,
    name: "Administrar",
    description: "Administra configuración de tu negocio",
    icon: "home",
    status: STATUS.ENABLED,
    options: [
      {
        id: 1,
        name: "Usuarios",
        description: "Administra quienes usan la app",
        icon: "home",
        route: "users",
        roles: [ROLES.ADMIN],
        status: STATUS.ENABLED,
      },
    ]
  },
  {
    id: 3,
    name: "Membresías",
    description: "Gestiona las membresías",
    icon: "home",
    status: STATUS.ENABLED,
    options: [
      {
        id: 1,
        name: "Membresías",
        description: "Administra tus membresías",
        icon: "home",
        route: "memberships",
        roles: [ROLES.ADMIN],
        status: STATUS.ENABLED,
      },
      {
        id: 2,
        name: "Miembros",
        description: "Administra las membresías de los clientes",
        icon: "home",
        route: "memberships/inscriptions",
        roles: [ROLES.ADMIN],
        status: STATUS.ENABLED,
      }
    ]
  },
]
