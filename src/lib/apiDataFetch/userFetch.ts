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