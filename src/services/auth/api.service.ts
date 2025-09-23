import { UserResponseGetUserItem } from "@/dtos/auth/auth.response.dto";
import { AxiosService } from "../../apis/axios.base";

class AuthServicesBase extends AxiosService {
  protected readonly basePath = "/auth/accounts";
  async getUser(): Promise<UserResponseGetUserItem> {
    return this.get(`${this.basePath}/me`);
  }
}

const AuthServices = new AuthServicesBase();
export default AuthServices;
