import axios, { AxiosInstance } from "axios";

export const RestConnector: AxiosInstance = axios.create({
    baseURL: ProcessingInstruction.env.BASE_API_URL
})