import axios from 'axios';

interface RequestType {
    method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
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
            return (error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', (error as Error).message);
            return (error as Error).message;
        }
    }
}

export default apiRequest;