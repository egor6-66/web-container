import React, { useEffect } from 'react';
import { useStateCustom, useWS } from '@packages/hooks';
import { Input } from '@packages/ui';

import { useTerminal } from '@/features';

import styles from './styles.module.scss';

const Terminal = () => {
    const { sendCommand } = useTerminal();
    const messages = useStateCustom([]);

    const { mutate: mutateCommand } = sendCommand();
    const commandInput = Input.use({});
    const disabledInput = useStateCustom(false);
    const ws = useWS();

    const handleKeyPress = (e: any) => {
        if (e.code === 'Enter') {
            disabledInput.set(true);
            mutateCommand(commandInput.value, {
                onSuccess: () => {
                    messages.set((prev) => [...prev, commandInput.value]);
                    commandInput.setValue('');
                },
            });
        }
    };

    useEffect(() => {
        const listener = ws.listener('terminal', (message) => {
            messages.set((prev) => [...prev, message]);
        });

        return () => {
            listener();
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <div>ТЕРМИНАЛ</div>
            <div className={styles.terminal} onClick={commandInput.focus}>
                {messages.value.map((i, index) => (
                    <div key={index}>{i}</div>
                ))}
                <input ref={commandInput.ref} onKeyPress={handleKeyPress} autoFocus {...commandInput.inputAttrs} />
            </div>
        </div>
    );
};

export default Terminal;
