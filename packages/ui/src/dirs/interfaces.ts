export interface IItem {
    path: string;
    node: Items;
    isDir: boolean;
    nestedNode: boolean;
    name: string;
    ext: string;
}

export interface IProps {
    disabled?: boolean;
    getLevel: (path: string) => Promise<IItem>;
    listHeight?: number;
}

export interface ILevelProps extends IProps {
    level: number;
}

export type Items = Array<IItem>;
