import React, { useEffect } from 'react';
import { useWS } from '@packages/hooks';
import { GridLayout, IGridLayout } from '@packages/ui';

import { AppState, BuildsManager, Containers, Directories, Download } from '@/widgets';

import styles from './styles.module.scss';

const InfoPage = () => {
    return <div className={styles.wrapper}>info</div>;
};

export default InfoPage;
