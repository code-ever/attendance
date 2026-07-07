import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create( {
    // baseURL: "https://attendanceapi-production-8964.up.railway.app/api",
    baseURL: "https://attendance-api-k5dw.onrender.com/api",
} );

// Attach token automatically
API.interceptors.request.use( ( config ) => {
    const token = getToken();

    if ( token ) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
} );

export default API;