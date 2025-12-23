import { RequestApi } from "../services/RequestApi";
import { CheckEmailResponse } from "../types/CheckEmailModel";

const CheckEmail = async (email: string): Promise<CheckEmailResponse> => {
    const body = { email };
    const api = new RequestApi();
    try {
        const response = await api.postApi("/check-email", JSON.stringify(body));

        if (!response.success) {
            return { message: response.response, status: -1 };
        }
        let getResponse: CheckEmailResponse;

        getResponse = JSON.parse(response.response);

        if (getResponse != null) {
            return getResponse;
        } else {
            return { message: "Server error", status: -1 };
        }
    } catch (error) {
        console.error("checkEmail error:", error);
        return { message: "Server error", status: -1 };
    }
}


const CheckFormmartEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export { CheckEmail, CheckFormmartEmail };

