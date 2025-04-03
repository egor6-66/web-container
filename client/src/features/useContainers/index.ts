import useZustand from 'react-use-zustand';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axios } from '@/shared/utils';
interface IContainer {
    connected: boolean;
    host: string;
    port: string;
    full?: string;
}
interface IStore {
    containers: Array<IContainer>;
}

const containersStore = useZustand<IStore>({
    keys: ['containers'],
    default: {
        containers: [
            {
                connected: true,
                host: window.location.hostname,
                port: window.location.port,
                full: `${window.location.hostname}:${process.env.WEB_CONTAINER_PORT}`,
            },
        ],
    },
    forStorage: {
        all: true,
        storageName: 'containers',
    },
});

function useRContainers() {
    const containers = containersStore.use.containers();

    const updateContainers = (container: IContainer) => {
        container.full = `${container.host}:${container.port}`;
        const foundIndex = containers.value.findIndex((i) => i.full === container.full);

        if (foundIndex === -1) {
            containers.set([...containers.value, container]);
        } else {
            containers.set(containers.value.splice(1, foundIndex, container));
        }

        // containers.set((prev) => {
        //     console.log(prev);
        //     console.log([...prev, container]);
        //
        //     return [...prev, container];
        // });
    };

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

    return { connect, getFoldersTree, containers: containers.value, updateContainers };
}

export default useRContainers;
