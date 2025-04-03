import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRouting } from '@packages/hooks';
import { AnimatePresence, Navigation } from '@packages/ui';

import { AppState } from '@/widgets';

import InfoPage from './info';
import MainPage from './main';

import styles from './styles.module.scss';

const Pages = () => {
    const { location, navigate, getSegment } = useRouting();

    const animationKey = getSegment(1);

    const pages = [
        { name: 'manager/main', displayName: 'управление контейнерами', component: <MainPage /> },
        { name: 'manager/info', displayName: 'информация', component: <InfoPage /> },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Navigation items={pages} handleNavClick={(item: any) => navigate(item.name)} />
                <AppState operatorName={'WEB_CONTAINER'} />
            </div>
            <AnimatePresence visible={true} className={styles.content} animationKey={animationKey}>
                <Routes location={location}>
                    <Route path={'*'} element={<Navigate to={'/manager/main'} />} />
                    {pages.map((i) => (
                        <Route key={i.name} path={i.name} element={i.component} />
                    ))}
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default Pages;
