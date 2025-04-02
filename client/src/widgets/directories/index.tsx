import React from 'react';
import { useElementSizeObserver } from '@packages/hooks';
import { Dirs } from '@packages/ui';

import { useContainers } from '@/features';

import styles from './styles.module.scss';

const Directories = () => {
    const { getFoldersTree } = useContainers();
    const getFolder = getFoldersTree('172.16.211.136');

    const getLevel = async (path: string) => {
        return await getFolder(path);
    };

    const [ref, size] = useElementSizeObserver({
        debounceDelay: 0,
        realTime: true,
    });

    return (
        <div className={styles.wrapper} ref={ref}>
            <div className={styles.title}>ДИРЕКТОРИИ</div>
            <div className={styles.dirs}>
                <Dirs getLevel={getLevel} listHeight={size.height - 66} />
            </div>
        </div>
    );
};

export default Directories;
