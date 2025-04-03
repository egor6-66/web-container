import React from 'react';
import { Button, Icons, Input } from '@packages/ui';
import classNames from 'classnames';

import { useContainers } from '@/features';

import styles from './styles.module.scss';

const Containers = () => {
    const hostInput = Input.use({
        displayName: 'host',
        trim: true,
    });

    const portInput = Input.use({
        displayName: 'port',
        trim: true,
    });

    const { connect, containers, updateContainers } = useContainers();
    const { mutate: connectMutate } = connect();

    const handleAdded = async () => {
        try {
            const url = `${hostInput.value}:${portInput.value}`;
            await hostInput.checkValid((value, yap) => {
                return yap.string().ipv4().validate(value);
            });
            await portInput.checkValid((value, yap) => {
                return yap.number().validate(value);
            });
            connectMutate([url], {
                onSuccess: () => updateContainers({ connected: true, port: portInput.value, host: hostInput.value }),
                onError: () => updateContainers({ connected: false, port: portInput.value, host: hostInput.value }),
            });
        } catch (e) {
            throw Error;
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Серверы</div>
            <div className={styles.addContainer}>
                <div>Добавить сервер</div>
                <div className={styles.controls}>
                    <div className={styles.inputs}>
                        <Input {...hostInput} wrapperStyle={{ width: 260 }} />
                        <Input {...portInput} wrapperStyle={{ width: 120 }} />
                    </div>
                    <Button disabled={!hostInput.value || !portInput.value} style={{ width: 100 }} onClick={handleAdded}>
                        добавить
                    </Button>
                </div>
            </div>
            <div className={styles.servers}>
                <div>{`Доступные контейнеры: ${process.env.WEB_CONTAINER_NAME}`}</div>
                <ul className={styles.list}>
                    {containers?.map((container) => (
                        <li key={container.full} className={styles.item}>
                            <span className={styles.host}>{container.full}</span>
                            <span className={classNames({ [styles.checkConnect]: true, [styles.connected]: container.connected })}>
                                <Icons icon={container.connected ? 'select' : 'close'} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Containers;
