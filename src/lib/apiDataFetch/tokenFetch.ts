"use client";
import apiRequest from "../apiFetcher";
import { apiKeys } from "../apiKeys";

export async function verifiedToken(token: any) {
    try {
        const response = await apiRequest({
            method: 'POST',
            url: apiKeys.POST_VERIFY_TOKEN,
            data: {token},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
       return response;
        
    } catch (error) {
        console.error('Error submiting data:', (error as Error).message)
    }
}

export async function refreshedToken(token: any) {
    try {
        const response = await apiRequest({
            method: 'POST',
            url: apiKeys.POST_REFRESH_TOKEN,
            data: {token},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
       return response;
        
    } catch (error) {
        console.error('Error submiting data:', (error as Error).message)
    }
}