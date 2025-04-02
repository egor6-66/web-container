import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRouting, useWS } from '@packages/hooks';
import { AnimatePresence, GridLayout, IGridLayout, Navigation } from '@packages/ui';

import { useModules } from '@/features';
import { AppState, BuildsManager, Containers, Directories, Download } from '@/widgets';

import InfoPage from './info';
import MainPage from './main';

import styles from './styles.module.scss';

const Pages = () => {
    const { location, navigate, getSegment } = useRouting();

    const { getAvailableModules } = useModules();

    const { data: availableModules } = getAvailableModules();
    const animationKey = getSegment(1);

    const pages = [
        { name: '/main', displayName: 'управление контейнерами', component: <MainPage /> },
        { name: '/info', displayName: 'информация', component: <InfoPage /> },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Navigation items={pages} handleNavClick={(item: any) => navigate(item.name)} />
                <AppState operatorName={'WEB_CONTAINER'} />
            </div>
            <AnimatePresence visible={true} className={styles.content} animationKey={animationKey}>
                <Routes location={location}>
                    {pages.map((i) => (
                        <Route key={i.name} path={i.name} element={i.component} />
                    ))}
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default Pages;
