import React from 'react';
import { useStateCustom } from '@packages/hooks';
import { Button, Icons, Input } from '@packages/ui';
import classNames from 'classnames';

import { useContainers } from '@/features';

import styles from './styles.module.scss';

interface IContainer {
    connected: boolean;
}

const Containers = () => {
    const containers = useStateCustom<Record<any, IContainer>>(
        { [window.location.origin]: { connected: true } },
        {
            storage: {
                key: `containers_${process.env.WEB_CONTAINER_NAME}`,
            },
        }
    );

    const newContainerInput = Input.use({
        displayName: 'Добавить контейнер',
        trim: true,
    });

    const { connect } = useContainers();
    const { mutate: connectMutate } = connect();

    const updateContainers = (host: string, opts: IContainer) => {
        containers.set((prev) => ({
            ...prev,
            [host]: {
                ...prev[host],
                ...opts,
            },
        }));
    };

    const handleAdded = async () => {
        try {
            await newContainerInput.checkValid((value, yap) => {
                return yap.string().ipv4().validate(value);
            });
            connectMutate([newContainerInput.value], {
                onSuccess: () => updateContainers(newContainerInput.value, { connected: true }),
                onError: () => updateContainers(newContainerInput.value, { connected: false }),
            });
        } catch (e) {
            throw Error;
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{`Доступные контейнеры: ${process.env.WEB_CONTAINER_NAME}`}</div>
            <div className={styles.addContainer}>
                <Input {...newContainerInput} />
                <Button disabled={!newContainerInput.value} style={{ width: 100 }} onClick={handleAdded}>
                    добавить
                </Button>
            </div>
            <ul className={styles.list}>
                {Object.entries(containers.value).map(([key, val]) => (
                    <li key={key} className={styles.item}>
                        <span className={styles.host}>{key}</span>
                        <span className={classNames({ [styles.checkConnect]: true, [styles.connected]: val.connected })}>
                            <Icons icon={val.connected ? 'select' : 'close'} />
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Containers;
