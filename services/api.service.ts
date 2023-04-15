import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

class Api {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.get<T>(`${this.baseUrl}${url}`, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.post<T>(`${this.baseUrl}${url}`, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.put<T>(`${this.baseUrl}${url}`, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.delete<T>(`${this.baseUrl}${url}`, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: unknown): Error {
        const axiosError = error as AxiosError<unknown>;
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return new Error(`Request failed with status code ${axiosError.response.status}: ${axiosError.response.data}`);
        } else if (axiosError.request) {
            // The request was made but no response was received
            return new Error(`No response received from server: ${axiosError.message}`);
        } else {
            // Something happened in setting up the request that triggered an Error
            return new Error(`Error making request: ${axiosError.message}`);
        }
    }
}

export default Api