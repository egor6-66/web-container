import useZustand from 'react-use-zustand';
import { io, Socket } from 'socket.io-client';

interface IStore {
    ws: Socket;
}

const wsStore = useZustand<IStore>({
    keys: ['ws'],
    default: {
        ws: io(`${window.location.protocol}//${window.location.hostname}:${Number(process.env.WEB_CONTAINER_PORT)}`, {
            reconnection: true,
            path: `/ws_gateway`,
        }),
    },
});

function useWS() {
    const ws = wsStore.use.ws();

    const listener = (event: string, cb: (data: any) => void) => {
        ws.value.on(event, cb);

        return () => ws.value.off(event, cb);
    };

    return { listener };
}

export default useWS;
