import React, { useEffect, useState } from 'react';
import { useStateCustom, useWS } from '@packages/hooks';
import { Button, Input } from '@packages/ui';

import { useTerminal } from '@/features';

import styles from './styles.module.scss';

const defaultHost = ' 172.16.211.136';

const Terminal = () => {
    const { sendCommand, connect } = useTerminal();
    const messages = useStateCustom([]);

    const { mutate: mutateCommand } = sendCommand();
    const hostInput = Input.use({ initValue: defaultHost });
    const commandInput = Input.use({});
    const disabledInput = useStateCustom(false);
    const ws = useWS();
    const connectState = useStateCustom<'try' | 'connected' | 'disconnect' | 'error'>('disconnect');

    const { mutate: mutateConnect } = connect();

    const handleKeyPress = (e: any) => {
        if (e.code === 'Enter') {
            disabledInput.set(true);
            mutateCommand(commandInput.value, {
                onSuccess: () => {
                    messages.set((prev) => [...prev, { text: commandInput.value }]);
                    commandInput.setValue('');
                },
            });
        }
    };

    useEffect(() => {
        const listener = ws.listener('terminal', (message) => {
            messages.set((prev) => [...prev, { text: message }]);
        });

        return () => {
            listener();
        };
    }, []);

    const handleConnect = () => {
        if (connectState.value === 'disconnect') {
            connectState.set('try');
            mutateConnect(hostInput.value, {
                onSuccess: (e) => {
                    connectState.set('connected');
                    messages.set((prev) => [...prev, e]);
                    commandInput.focus();
                },
                onError: (e) => {
                    console.log(e);
                    connectState.set('error');
                    messages.set((prev) => [...prev, 'error']);
                },
            });
        }
    };

    console.log(messages);

    return (
        <div className={styles.wrapper}>
            <div>ТЕРМИНАЛ</div>
            <div className={styles.host}>
                <Input inputAttrs={hostInput.inputAttrs} displayName={'Host'} />

                <Button disabled={!hostInput.value || connectState.value === 'try'} style={{ width: 190 }} onClick={handleConnect}>
                    {connectState.value === 'connected' ? 'отключиться' : 'подключиться'}
                </Button>
            </div>
            <div className={styles.terminal} onClick={commandInput.focus}>
                {messages.value.map((i, index) => (
                    <div key={index}>{i}</div>
                ))}
                <input
                    ref={commandInput.ref}
                    disabled={connectState.value !== 'connected'}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    {...commandInput.inputAttrs}
                />
            </div>
        </div>
    );
};

export default Terminal;
