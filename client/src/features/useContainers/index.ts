import { useState } from 'react';
import { useApi } from '@packages/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { axios } from '@/shared/utils';

function useRContainers() {
    const connect = () => {
        return useMutation({
            mutationFn: async (hosts: Array<string>) => {
                const { data } = await axios.post(`/connect`, { hosts });

                return data;
            },
        });
    };

    const getFoldersTree = (host: string) => {
        const queryClient = useQueryClient();

        return (path: string) =>
            queryClient.ensureQueryData({
                queryKey: ['folders_tree', host, path],
                queryFn: async () => {
                    const { data } = await axios.get(`/folders_tree`, {
                        params: {
                            host,
                            path,
                        },
                    });

                    return data as any;
                },
            });
    };

    return { connect, getFoldersTree };
}

export default useRContainers;
