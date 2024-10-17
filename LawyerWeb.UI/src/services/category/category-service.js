import axios from "axios"
import { services } from "../services";
const JSONbig = require('json-bigint');


const API_URL = "https://localhost:7267/api";


// CATEGORY ENDPOINTS
const instance = axios.create({
    baseURL: API_URL,
    transformResponse: [
        function (data) {
            try {
                return JSONbig.parse(data, (key, value) => {

                    if (value && value.constructor && value.constructor.name === 'BigNumber') {
                        return value.toString();
                    }
                    return value;
                });
            } catch (error) {
                console.error('Error parsing response data:', error);
                throw error;
            }
        }
    ]
});


export const getCategories = async () => {
    try {
        const response = await instance.get(`${API_URL}/Category/GetCategory`);
        const jsonString = JSONbig.stringify(response.data);
        return JSONbig.parse(jsonString);
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

export const deleteCategory = async (categoryGuid) => {
    console.log(categoryGuid)
    const response = await axios.delete(`${API_URL}/Category/DeleteCategoryByGuid/${categoryGuid}`, services.authHeader());
    return response.data;
};

export const insertCategory = async (payload) => {
    const response = await axios.post(`${API_URL}/Category/InsertCategory`, payload, services.authHeader());
    return response.data;
};

export const updateCategory = async (payload) => {
    const response = await axios.put(`${API_URL}/Category/UpdateCategory`, payload, services.authHeader());
    return response.data;
};

