import React, { useEffect } from 'react';
import { useWS } from '@packages/hooks';
import { GridLayout, IGridLayout } from '@packages/ui';

import { AppState, BuildsManager, Containers, Directories, Download } from '@/widgets';

import styles from './styles.module.scss';

const Pages = () => {
    const widgets: IGridLayout.Items = [
        { name: 'containers', grid: { w: 5, h: 5, x: 0, y: 0, static: true } },
        { name: 'builds_manager', grid: { w: 5, h: 5, x: 5, y: 0, static: true } },
        { name: 'download', grid: { w: 5, h: 5, x: 0, y: 5, static: true } },
        { name: 'directories', grid: { w: 5, h: 5, x: 5, y: 5, static: true } },
    ];

    const ws = useWS();

    useEffect(() => {
        const listener = ws.listener('receiveMessage', (msg) => {
            console.log(msg);
        });

        return () => {
            listener();
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <div>WEB CONTAINER: {process.env.WEB_CONTAINER_NAME}</div>
                    <div>HOST: {window.location.origin}</div>
                </div>
                <AppState operatorName={'EGOR'} />
            </div>

            <div className={styles.widgets}>
                <GridLayout items={widgets} className={styles.grid}>
                    {(item) => {
                        switch (item.name) {
                            case 'containers':
                                return <Containers />;

                            case 'builds_manager':
                                return <BuildsManager />;

                            case 'download':
                                return <Download />;

                            case 'directories':
                                return <Directories />;
                        }
                    }}
                </GridLayout>
            </div>
        </div>
    );
};

export default Pages;
