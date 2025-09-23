/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosService } from "@/apis/axios.base";

class BookingHistoryServicesBase extends AxiosService {
  protected readonly basePath = "/bookings";
  async getBookingHistory(page: number, limit: number): Promise<any> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.getWithParams(`${this.basePath}/history`, params);
  }
}

const BookingHistoryServices = new BookingHistoryServicesBase();
export default BookingHistoryServices;
