import axios from 'axios';

interface RequestType {
    method: 'POST' | 'GET' | 'DELETE' | 'PUT';
    url: string;
    data?: any;
    headers?: Record<string, string>;
}

const apiRequest = async ({method, url, data = null, headers = {}}: RequestType) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            headers,
        })
        return response.data;
    } catch (error: unknown) {
        if(axios.isAxiosError(error)) {
            console.error('Axios Error:', error.response?.data || error.message);
            throw new Error(error.response?.data || 'Something went wrong with the request');
        } else {
            console.error('Unexpected error:', (error as Error).message);
            throw new Error('An unexpected error occurred') 
        }
    }
}

export default apiRequest;