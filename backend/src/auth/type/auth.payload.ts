import { Role } from "src/user/enum/user.role";

export interface AuthJwtPayload {
  id: number;
  email: string;
  role:Role
}