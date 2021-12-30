import { User } from "./users.model"

export interface AuthByEmailDto {
  readonly email: string;
  readonly password: string;
}


export class AuthResponse {
  access_token: string
  user: User
}
