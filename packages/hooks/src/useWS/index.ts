import useZustand from 'react-use-zustand';
import { io, Socket } from 'socket.io-client';

interface IStore {
    ws: Socket;
}

const wsStore = useZustand<IStore>({
    keys: ['ws'],
    default: {
        ws: io({
            reconnection: true,
            port: process.env.WEB_CONTAINER_PORT,
            path: `ws_gateway`,
            transports: ['websocket'],
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
