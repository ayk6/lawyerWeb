import axios from "axios"
import { services } from "../services";
const JSONbig = require('json-bigint');

const API_URL = "https://localhost:7267/api";


// Comment ENDPOINTS

export const getComments = async () => {
    const response = await axios.get(`${API_URL}/Comment/GetComments`, {
        transformResponse: [(data) => {
            return parseBigIntToString(data);
        }]
    });
    return response.data;
};

const parseBigIntToString = (data) => {
    const parsedData = JSONbig({ storeAsString: true }).parse(data);
    if (Array.isArray(parsedData)) {
        return parsedData.map(item => {
            item.guid = item.guid.toString();
            return item;
        });
    }

    if (parsedData.guid) {
        parsedData.guid = parsedData.guid.toString();
    }

    return parsedData;
};

export const getCommentById = async (id) => {
    const response = await axios.get(`${API_URL}/Comment/GetCommentByGuid/${id}`, {
        transformResponse: [(data) => {
            const parsedData = JSONbig({ storeAsString: true }).parse(data);
            return Array.isArray(parsedData) ? parsedData : [parsedData];
        }]
    });
    return response.data;
}

export const getCommentByArticleId = async (id) => {
    const response = await axios.get(`${API_URL}/Comment/GetCommentByArticleGuid/${id}`, {
        transformResponse: [(data) => {
            const parsedData = JSONbig({ storeAsString: true }).parse(data);
            return Array.isArray(parsedData) ? parsedData : [parsedData];
        }]
    });
    return response.data;
}


export const postComment = async (payload) => {
    const response = await axios.post(`${API_URL}/Comment/InsertComment`, payload);
    return response.data;
};


export const updateComment = async (payload) => {
    const response = await axios.put(`${API_URL}/Comment/UpdateComment`, payload, services.authHeader());
    return response.data;
};

export const deleteCommentById = async (id) => {
    const response = await axios.delete(`${API_URL}/Comment/DeleteCommentByGuid/${id}`, services.authHeader());
    return response;
}