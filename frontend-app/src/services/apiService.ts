import axios, {type AxiosResponse} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, 
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(
    (config) => {
        console.log(`Request made to ${config.url} with method ${config.method}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
)

export interface CaptionResponse {
    success: boolean;
    caption?: string;
}

export interface ErrorResponse {
    success: boolean;
    error: string;
}

export const apiService = {
    captionImage: async (imageFile: File): Promise<CaptionResponse> => {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response: AxiosResponse<CaptionResponse> = await apiClient.post(
            'api/caption',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    }
}