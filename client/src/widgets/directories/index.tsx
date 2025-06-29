import React from 'react';
import { useElementSizeObserver } from '@packages/hooks';
import { Dirs } from '@packages/ui';

import { useContainers } from '@/features';

import styles from './styles.module.scss';

const Directories = () => {
    const { getFoldersTree } = useContainers();
    // const getFolder = getFoldersTree();

    // const getLevel = async (path: string) => {
    //     return await getFolder(path);
    // };

    const [ref, size] = useElementSizeObserver({
        debounceDelay: 0,
        realTime: true,
    });

    return (
        <div className={styles.wrapper} ref={ref}>
            <div className={styles.title}>ДИРЕКТОРИИ</div>
            <div className={styles.dirs}>
                demo
                {/*<Dirs getLevel={getLevel} listHeight={size.height - 66} />*/}
            </div>
        </div>
    );
};

export default Directories;
