import { services } from "../services";


export const authHeader = () => {

    const token = services.encryptedLocalStorage.getItem("lawyerToken");
    console.log(token)

    const headers = {
        headers: {
            Authorization: `Bearer ${token.result}`
        }
    };


    return headers;
}