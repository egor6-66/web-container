import { useMutation, useQuery } from '@tanstack/react-query';

import { axios } from '@/shared/utils';

const staleMin = 5;

function useModules() {
    const getModules = () => {
        return useQuery<any>({
            queryKey: ['availableModules'],
            staleTime: 1000 * 60 * staleMin,
            queryFn: async () => {
                const { data } = await axios.get(`/modules`);

                return data;
            },
        });
    };

    const addRemoteModuleUrl = () => {
        return useMutation({
            mutationFn: async (data: { url: string }) => {
                await axios.post(`/remote_modules`, data);

                return {};
            },
        });
    };

    const downloadModule = () => {
        return useMutation({
            mutationFn: async (data: { file: FormData; msg: string }) => {
                await axios.post(`/local_modules`, data);

                return {};
            },
        });
    };

    const activate = () => {
        return useMutation({
            mutationFn: async (data: any) => {
                await axios.post(`/modules/activate`, data);

                return {};
            },
        });
    };

    const removeLocalModule = () => {
        return useMutation({
            mutationFn: async (data: any) => {
                await axios.delete(`/local_modules`, {
                    params: data,
                });

                return {};
            },
        });
    };

    const removeRemoteModule = () => {
        return useMutation({
            mutationFn: async (data: any) => {
                await axios.delete(`/remote_modules`, {
                    params: data,
                });

                return {};
            },
        });
    };

    return { getModules, downloadModule, removeLocalModule, activate, addRemoteModuleUrl, removeRemoteModule };
}

export default useModules;
