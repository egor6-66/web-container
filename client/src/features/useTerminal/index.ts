import { useMutation, useQuery } from '@tanstack/react-query';

import { axios } from '@/shared/utils';

function useTerminal() {
    const connect = () => {
        return useMutation({
            mutationFn: async (host: string) => {
                const { data } = await axios.post(`/connect`, { host });

                return data;
            },
        });
    };

    const sendCommand = () => {
        return useMutation({
            mutationFn: async (command: string) => {
                await axios.post(`/command`, { command });

                return {};
            },
        });
    };

    return { sendCommand, connect };
}

export default useTerminal;
