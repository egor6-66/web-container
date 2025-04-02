import React from 'react';
import { useThemes } from '@packages/hooks';
import { Popover } from '@packages/ui';

import { IProps } from './interfaces';

import styles from './styles.module.scss';

const AppState = (props: IProps) => {
    const { operatorName } = props;

    const { value, toggleBlackAndWhite } = useThemes();

    const items = [{ name: 'change_theme', component: <div onClick={toggleBlackAndWhite}>THEME CHANGE</div> }];

    return (
        <div className={styles.wrapper}>
            <div className={styles.operatorName}>{operatorName}</div>

            <Popover className={styles.popover}>
                {items.map((i) => (
                    <div key={i.name} className={styles.item}>
                        {i.component}
                    </div>
                ))}
            </Popover>
        </div>
    );
};

export default AppState;
