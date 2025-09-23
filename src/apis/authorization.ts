import { removePrefixToken } from "@/utils/client/api";
import { AuthorizationPort } from "./ddd/repository.port";

export class Authorization implements AuthorizationPort {
  protected token: string = "";

  constructor() {
    if (typeof window !== "undefined") {
      this.initToken();
    }
  }

  private initToken() {
    const cookies = document.cookie.split(";");
    const cookieObj = cookies.reduce(
      (acc: { [key: string]: string }, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name.trim()] = value;
        return acc;
      },
      {}
    );
    this.token = cookieObj["token"] || "";
  }

  getToken() {
    return this.token;
  }

  setToken(token: string, expires?: string) {
    if (this.token) {
      const cookies = document.cookie.split("; ");
      const updatedCookies = [];
      let tokenUpdated = false;

      for (const cookie of cookies) {
        if (cookie.startsWith("token=")) {
          updatedCookies.push(`token=${token}`);
          tokenUpdated = true;
        } else {
          updatedCookies.push(cookie);
        }
      }

      if (!tokenUpdated) {
        updatedCookies.push(`token=${token}`);
      }
      document.cookie = updatedCookies.join("; ");
    } else {
      document.cookie = `token=${token}; expires=${
        expires ?? "Fri, 31 Dec 9999 23:59:59 GMT"
      }; path=/`;
    }
    this.token = removePrefixToken(token);
  }

  removeToken() {
    this.token = "";
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }
}
