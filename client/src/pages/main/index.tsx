import React from 'react';
import { useStateCustom } from '@packages/hooks';
import { GridLayout, Icons, IGridLayout } from '@packages/ui';
import classNames from 'classnames';

import { Containers, Directories, Modules, Terminal } from '@/widgets';

import styles from './styles.module.scss';

const MainPage = () => {
    const activeDnD = useStateCustom(false);
    const activeResize = useStateCustom(false);

    const widgets = useStateCustom<IGridLayout.Items>(
        [
            { i: 'containers', w: 5, h: 5, x: 0, y: 0 },
            { i: 'modules', w: 5, h: 5, x: 5, y: 0 },
            { i: 'terminal', w: 5, h: 5, x: 0, y: 5 },
            { i: 'directories', w: 5, h: 5, x: 5, y: 5 },
        ],
        {
            storage: {
                key: 'web_container_manager_grid',
            },
        }
    );

    const handleChangeLayout = (layout: any) => {
        widgets.set(layout);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.containerInfo}>
                    <div>HOST: {window.location.hostname + ':' + window.location.port}</div>
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
                <GridLayout
                    items={widgets.value}
                    className={styles.grid}
                    isDraggable={activeDnD.value}
                    isResizable={activeResize.value}
                    onLayoutChange={handleChangeLayout}
                >
                    {(item) => {
                        switch (item.i) {
                            case 'containers':
                                return <Containers />;

                            case 'modules':
                                return <Modules />;

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
