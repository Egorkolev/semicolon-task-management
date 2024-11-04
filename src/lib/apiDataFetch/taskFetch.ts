"use client";
import apiRequest from "../apiFetcher";
import { apiKeys } from "../apiKeys";

export async function createNewTaskFetch(data: any) {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await apiRequest({
            method: "POST",
            url: apiKeys.POST_CREATE_TASK,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response;

    } catch (error) {
        console.error('Error submiting data:', (error as Error).message)
    }
}

export async function userTaskFetch() {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await apiRequest({
            method: "GET",
            url: apiKeys.GET_USER_TASKS,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response;

    } catch (error) {
        console.error('Error submiting data:', (error as Error).message)
    }
}