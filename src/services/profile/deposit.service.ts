/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosService } from "@/apis/axios.base";
import { DepositRequestItem } from "@/dtos/profile/profile.request.dto";

class DepositServicesBase extends AxiosService {
  protected readonly basePath = "/customers";
  async deposit(data: DepositRequestItem): Promise<any> {
    return this.post(`${this.basePath}/deposit`, data);
  }
}

const DepositServices = new DepositServicesBase();
export default DepositServices;
