import axiosBase from 'axios';

export const baseUrl = `${window.location.origin}`;
export const storageUrl = `${baseUrl}/storage`;
export const apiUrl = `${baseUrl}/api`;
export const externalUrl = `${baseUrl}/external`;

export const containerApi = axiosBase.create({
    baseURL: apiUrl,
    timeout: 4000,
});

export const externalApi = axiosBase.create({
    baseURL: externalUrl,
    timeout: 4000,
});
