import { useMutation, useQuery } from '@tanstack/react-query';

import { axios } from '@/shared/utils';

const staleMin = 5;

function useModules() {
    const getAvailableModules = () => {
        return useQuery<any>({
            queryKey: ['reportsConfig'],
            staleTime: 1000 * 60 * staleMin,
            queryFn: async () => {
                const { data } = await axios.get(`/available_modules`);

                return data;
            },
        });
    };

    const downloadModule = () => {
        return useMutation({
            mutationFn: async (data: { file: FormData; msg: string }) => {
                await axios.post(`/build`, data);

                return {};
            },
        });
    };

    const getModule = (name?: string) => {
        return useQuery<any>({
            queryKey: ['module', name],
            staleTime: 1000 * 60 * staleMin,
            enabled: !!name,
            queryFn: async () => {
                const { data } = await axios.get(`/module`, {
                    params: {
                        name,
                    },
                });

                return data;
            },
        });
    };

    const deleteBuild = () => {
        return useMutation({
            mutationFn: async (data: { name: string; version: string; msg: string }) => {
                await axios.delete(`/build`, {
                    params: data,
                });

                return {};
            },
        });
    };

    return { getAvailableModules, downloadModule, getModule, deleteBuild };
}

export default useModules;
