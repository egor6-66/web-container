import React, { useEffect } from 'react';
import { useStateCustom, useWS } from '@packages/hooks';
import { GridLayout, Icons, IGridLayout } from '@packages/ui';
import classNames from 'classnames';

import { BuildsManager, Containers, Directories, Terminal } from '@/widgets';

import styles from './styles.module.scss';

const MainPage = () => {
    const activeDnD = useStateCustom(false);
    const activeResize = useStateCustom(false);

    const widgets = useStateCustom<IGridLayout.Items>(
        [
            { name: 'containers', grid: { w: 5, h: 5, x: 0, y: 0 } },
            { name: 'builds_manager', grid: { w: 5, h: 5, x: 5, y: 0 } },
            { name: 'terminal', grid: { w: 5, h: 5, x: 0, y: 5 } },
            { name: 'directories', grid: { w: 5, h: 5, x: 5, y: 5 } },
        ]
        // {
        //     storage: {
        //         key: 'web_container_manager_grid',
        //     },
        // }
    );

    const ws = useWS();

    const handleChangeLayout = (layout: IGridLayout.Items) => {
        widgets.set(layout);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.containerInfo}>
                    <div>WEB CONTAINER: {process.env.WEB_CONTAINER_NAME}</div>
                    <div>HOST: {window.location.origin}</div>
                </div>
                <div className={styles.layoutControls}>
                    <div
                        className={classNames({ [styles.toggleLayoutRedactor]: true, [styles.toggleLayoutRedactor_active]: activeDnD.value })}
                        onClick={activeDnD.toggle}
                    >
                        <Icons icon={'layout'} />
                    </div>
                    <div
                        className={classNames({ [styles.toggleLayoutRedactor]: true, [styles.toggleLayoutRedactor_active]: activeResize.value })}
                        onClick={activeResize.toggle}
                    >
                        <Icons icon={'resize'} />
                    </div>
                </div>
            </div>

            <div className={styles.widgets}>
                <GridLayout items={widgets.value} className={styles.grid} isDraggable={activeDnD.value} isResizable={activeResize.value}>
                    {(item) => {
                        switch (item.name) {
                            case 'containers':
                                return <Containers />;

                            case 'builds_manager':
                                return <BuildsManager />;

                            case 'terminal':
                                return <Terminal />;

                            case 'directories':
                                return <Directories />;
                        }
                    }}
                </GridLayout>
            </div>
        </div>
    );
};

export default MainPage;
