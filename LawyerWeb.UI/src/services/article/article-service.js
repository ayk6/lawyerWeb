import axios from "axios"
import { services } from "../services";
const JSONbig = require('json-bigint');


const API_URL = "https://localhost:7267/api";


// ARTİCLE ENDPOINTS
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

export const getArticles = async () => {
    try {
        const response = await instance.get('/Article/GetArticles');
        const jsonString = JSONbig.stringify(response.data);
        return JSONbig.parse(jsonString);
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

export const getArticleById = async (id) => {
    try {
        const response = await instance.get(`/Article/GetArticleByGuid/${id}`);
        const jsonString = JSONbig.stringify(response.data);
        return JSONbig.parse(jsonString);
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}


export const getArticlesByCategoryId = async (id) => {
    try {
        const response = await instance.get(`/Article/GetArticleByCategoryGuid/${id}`);
        const jsonString = JSONbig.stringify(response.data);
        return JSONbig.parse(jsonString);
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}

export const deleteArticle = async (id) => {
    const response = await axios.delete(`${API_URL}/Article/DeleteArticleByGuid/${id}`, services.authHeader());
    console.log(response)
    console.log(response.data)
    return response.data;
}

export const insertArticle = async (payload) => {
    console.log(payload)
    const response = await axios.post(`${API_URL}/Article/InsertArticle`, payload, services.authHeader());
    console.log(response.data)
    return response.data;
}

export const updateArticle = async (payload) => {
    console.log(payload)
    const response = await axios.put(`${API_URL}/Article/UpdateArticle`, payload, services.authHeader());
    console.log(response.data)
    return response.data;
}


