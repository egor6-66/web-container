import React, { MouseEventHandler, useEffect } from 'react';
import { useElementSizeObserver, useStateCustom } from '@packages/hooks';
import classNames from 'classnames';

import AnimatePresence from '../animatePresence';
import Button from '../button';

import Icons from './icons';
import { IItem, ILevelProps, IProps } from './interfaces';

import styles from './styles.module.scss';

const Dirs = (props: IProps) => {
    const { getLevel, listHeight = 300 } = props;

    const node = useStateCustom<IItem | null>(null);

    const handleGetLevel = async (path: string) => {
        const level = await getLevel(path);
        node.set(level);
    };

    const handleBack = () => {
        handleGetLevel(node.value.path.split('/').slice(0, -1).join('/'));
    };

    const wrapperClasses = classNames({
        [styles.wrapper]: true,
    });

    const handleContextMenu = (e: any) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (!node.value) {
            handleGetLevel('/');
        }
    }, []);

    return (
        <div className={wrapperClasses}>
            <div className={styles.header}>
                <Button disabled={node.value?.path === '/'} onClick={handleBack} style={{ width: 30 }}>
                    <Icons icon={'arrow'} />
                </Button>
                <div>{node.value?.path}</div>
            </div>
            <div className={styles.listContainer} style={{ height: listHeight }} onContextMenu={handleContextMenu}>
                <AnimatePresence visible={!!node.value} animationKey={node.value?.path} className={styles.list}>
                    {node.value?.node.map((i) => (
                        <div
                            key={i.path}
                            onDoubleClick={() => (i.nestedNode ? handleGetLevel(i.path) : () => '')}
                            className={classNames({ [styles.item]: true, [styles.hovered]: i.isDir })}
                        >
                            <Icons text={i.ext} icon={i.isDir ? (i.nestedNode ? 'folder_with_content' : 'folder_without_content') : 'file'} />
                            <div className={styles.name}>{i.name}</div>
                        </div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Dirs;
