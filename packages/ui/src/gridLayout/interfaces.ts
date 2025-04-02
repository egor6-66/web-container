import { ReactNode } from 'react';
import { ItemCallback, Layout, ReactGridLayoutProps } from 'react-grid-layout';

export interface IItem {
    name: string;
    displayName?: string;
    grid: Omit<Layout, 'i'>;
}

// @ts-ignore
export interface IProps extends ReactGridLayoutProps {
    items: Items;
    children: (item: IItem, index: number) => ReactNode;
    // className?: string;
}

export interface IData {
    layout: Array<Layout>;
    children: Array<ReactNode>;
}
export type Items = Array<IItem>;
