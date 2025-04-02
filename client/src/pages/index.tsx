import React from 'react';
import { GridLayout, IGridLayout } from '@packages/ui';

import { AppState, Containers, Directories, Download, Terminal } from '@/widgets';

import styles from './styles.module.scss';

const Pages = () => {
    const widgets: IGridLayout.Items = [
        { name: 'containers', grid: { w: 5, h: 5, x: 0, y: 0, static: true } },
        { name: 'terminal', grid: { w: 5, h: 5, x: 5, y: 0, static: true } },
        { name: 'download', grid: { w: 5, h: 5, x: 0, y: 5, static: true } },
        { name: 'directories', grid: { w: 5, h: 5, x: 5, y: 5, static: true } },
    ];

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

                            case 'terminal':
                                return <Terminal />;

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
