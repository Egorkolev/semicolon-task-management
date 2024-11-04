"use client";
import apiRequest from "../apiFetcher";
import { apiKeys } from "../apiKeys";

export async function userRegisterFetch(data: any) {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await apiRequest({
            method: 'POST',
            url: apiKeys.POST_CREATE_NEW_USER,
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
        
    } catch (error) {
        console.error('Error submiting data:', (error as Error).message)
    }
};

export async function userLoginFetch(data: any) {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await apiRequest({
            method: 'POST',
            url: apiKeys.POST_USER_LOGIN,
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
        
    } catch (error) {
        console.error('Error submiting data:', (error as Error).message)
    }
};

export async function userAvatarFetch(file: File) {
    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append("file", file)
    try {
        const response = await apiRequest({
            method: 'POST',
            url: apiKeys.POST_USER_AVATAR,
            data: formData,
            headers: {
                'apiKey': apiKeys.SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
        
    } catch (error) {
        console.error('Error submiting data:', (error as Error).message)
    }
};

export async function userDataFetch() {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await apiRequest({
            method: 'GET',
            url: apiKeys.GET_USER_DATA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
        
    } catch (error) {
        console.error('Error submiting data:', (error as Error).message)
    }
};