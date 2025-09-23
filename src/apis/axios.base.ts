import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { Authorization } from "./authorization";
import { RepositoryPort } from "./ddd/repository.port";
import { NEXT_PUBLIC_SITE_URL } from "@/constants/api-constants";
import { isValidToken } from "@/utils/client/api";

export class AxiosService extends Authorization implements RepositoryPort {
  private static instance: AxiosService;
  protected baseUrl: string;
  constructor(baseUrl?: string) {
    super();
    this.baseUrl =
      baseUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? NEXT_PUBLIC_SITE_URL;
  }

  static getInstance(baseUrl?: string): AxiosService {
    this.instance = this.instance ?? new AxiosService(baseUrl);
    return this.instance;
  }

  async get<T>(url: string): Promise<T> {
    const http = await this._http();
    const response = await http.get<T>(url);
    return response.data;
  }

  async getWithParams<T>(url: string, params: URLSearchParams): Promise<T> {
    const http = await this._http();
    const response = await http.get<T>(url, { params });
    return response.data;
  }

  async post<T, FromData>(url: string, data: FromData): Promise<T> {
    const http = await this._http();
    const response = await http.post<T>(url, data);
    return response.data;
  }

  async put<T, FromData>(url: string, data: FromData): Promise<T> {
    const http = await this._http();
    const response = await http.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const http = await this._http();
    const response = await http.delete<T>(url);
    return response.data;
  }

  protected async _http(): Promise<AxiosInstance> {
    const http = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    });

    http.interceptors.request.use(async (config) => {
      const header = {
        Accept: "application/json",
      } as AxiosRequestHeaders;

      if (isValidToken(this.token)) {
        header.Authorization = `Bearer ${this.token}`;
      }

      config.headers = header;
      return config;
    });
    return http;
  }
}
