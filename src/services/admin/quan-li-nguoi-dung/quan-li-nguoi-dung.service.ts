/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosService } from "../../../apis/axios.base";

class QuanlyNguoiDungServicesBase extends AxiosService {
  protected readonly basePath = "/customers";
  async getAllUser(): Promise<any> {
    return this.get(`${this.basePath}/list`);
  }

  // Add booking management functions
  async getAllBookings(): Promise<any> {
    return this.get(`/bookings/list`);
  }
  
  async updateBookingStatus(id: string, status: string): Promise<any> {
    return this.put(`/bookings/${id}/status`, { status });
  }
  
  async assignMentor(bookingId: string, mentorId: string): Promise<any> {
    return this.put(`/bookings/${bookingId}/assign-mentor`, { mentorId });
  }
  
  async getBookingDetails(id: string): Promise<any> {
    return this.get(`/bookings/${id}`);
  }
}

const QuanlyNguoiDungServices = new QuanlyNguoiDungServicesBase();
export default QuanlyNguoiDungServices;
