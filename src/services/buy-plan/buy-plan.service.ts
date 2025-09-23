/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosService } from "@/apis/axios.base";

class BuyPlanServicesBase extends AxiosService {
  protected readonly basePath = "/checkout";
  async buyPlan(data: { planId: string; note?: string }): Promise<any> {
    return this.post(`${this.basePath}/buy-plan`, data);
  }
}

const BuyPlanServices = new BuyPlanServicesBase();
export default BuyPlanServices;
