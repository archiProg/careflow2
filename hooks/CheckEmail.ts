import { CheckEmailResponse } from "../models/CheckEmailModel";

const checkEmail = async (email: string): Promise<CheckEmailResponse> => {
    const body = { email };

    try {
        const res = await fetch("/check-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            return { message: "Server error", status: -1 };
        }

        const data = (await res.json()) as CheckEmailResponse;

        if (data) {
            return data;
        } else {
            return { message: "Server error", status: -1 };
        }
    } catch (error) {
        console.error("checkEmail error:", error);
        return { message: "Server error", status: -1 };
    }
}

export default checkEmail;