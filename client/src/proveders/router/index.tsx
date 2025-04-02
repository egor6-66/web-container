import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

const RouterProvider = (props: PropsWithChildren) => {
    const { children } = props;

    return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>;
};

export default RouterProvider;
