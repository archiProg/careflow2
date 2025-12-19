import { ApiResponse } from "@/models/ApiModel";
import { Platform } from "react-native";
import Provider from "./Provider";

export class RequestApi {
  private baseUrl = Provider.HostApi;

  public async postApi(
    endpoint: string,
    jsonData: string = "",
    headers?: Record<string, string>,
    files?: Record<string, string>
  ): Promise<ApiResponse> {
    const apiResponse: ApiResponse = { success: false, response: "" };

    try {
      let body: FormData | string = "";

      if (files && Object.keys(files).length > 0) {
        const formData = new FormData();

        for (const key in files) {
          formData.append(key, {
            uri: Platform.OS === "ios" ? files[key] : "file://" + files[key],
            type: "application/octet-stream",
            name: key,
          } as any);
        }

        if (headers) {
          for (const key in headers) {
            formData.append(key, headers[key]);
          }
        }

        body = formData;
      } else if (jsonData != "") {
        body = jsonData;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": files ? "multipart/form-data" : "application/json",
          ...headers,
        },
        body,
      });

      const contentType = response.headers.get("content-type") || "";
      let responseData: string = "";

      responseData = await response.text();

      if (response.status === 500) {
        apiResponse.success = false;
        apiResponse.response = "Server error (500): " + responseData;
      } else if (response.ok || response.status === 401) {
        apiResponse.success = true;
        apiResponse.response = responseData;
      } else {
        apiResponse.success = false;
        apiResponse.response = `Error ${response.status}: ${responseData}`;
      }

      return apiResponse;
    } catch (error: any) {
      apiResponse.success = false;
      apiResponse.response = `Exception: ${error.message}`;
      return apiResponse;
    }
  }

  public async getApi(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse> {
    const apiResponse: ApiResponse = { success: false, response: "" };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers,
      });

      const contentType = response.headers.get("content-type") || "";
      let responseData: any = null;

      if (contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (response.ok) {
        apiResponse.success = true;
        apiResponse.response = responseData;
      } else {
        apiResponse.success = false;
        apiResponse.response = `Error ${response.status}: ${responseData}`;
      }

      return apiResponse;
    } catch (error: any) {
      apiResponse.success = false;
      apiResponse.response = `Exception: ${error.message}`;
      return apiResponse;
    }
  }
}
