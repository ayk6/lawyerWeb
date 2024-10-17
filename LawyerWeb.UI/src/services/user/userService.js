import axios from "axios"
import { services } from "../services";

const API_URL = "https://localhost:7267/api";

export const login = async (payload) => {
    const response = await axios.post(`${API_URL}/auth/login`, payload);
    console.log(response)
    console.log(response.data)
    return response.data;
}

// USER ENDPOINTS
export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/me`, services.authHeader());
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user:', error)
        throw error;
    }
};

