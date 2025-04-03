import React, { useRef } from 'react';
import { useStateCustom } from '@packages/hooks';
import { AnimatePresence, Button } from '@packages/ui';

import { useModules } from '@/features';
import { constants } from '@/shared/utils';

import styles from './styles.module.scss';

const BuildsManager = () => {
    const ref = useRef(null);
    const file = useStateCustom(null);
    const { downloadModule, getAvailableModules, deleteBuild, activate } = useModules();
    const { mutate: downloadBuildMutate } = downloadModule();
    const { mutate: deleteBuildMutate } = deleteBuild();
    const { mutate: activateMutate } = activate();
    const { data: availableModulesData, refetch } = getAvailableModules();

    const handleDownloadBuild = () => {
        downloadBuildMutate(file.value, {
            onSuccess: () => {
                file.set(null);
                ref.current.value = '';
                refetch();
            },
        });
    };

    const handleDeleteBuild = (i: any) => {
        deleteBuildMutate(i.manifest, {
            onSuccess: () => {
                refetch();
            },
        });
    };

    const handleActivate = (i: any) => {
        console.log(i);
        activateMutate(i.manifest, {
            onSuccess: () => {
                refetch();
            },
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Модули и версии</div>
            <div className={styles.downloadModule}>
                <div>Загрузить сборку</div>
                <div className={styles.controls}>
                    <input
                        ref={ref}
                        type={'file'}
                        accept=".zip"
                        onChange={(e) => {
                            const formData = new FormData();
                            formData.append('file', e.target.files[0]);
                            file.set(formData);
                        }}
                    />
                    <AnimatePresence visible={!!file.value} className={styles.sendBtn}>
                        <Button onClick={handleDownloadBuild}>отправить</Button>
                    </AnimatePresence>
                </div>
            </div>
            <div className={styles.modules}>
                {availableModulesData &&
                    Object.entries(availableModulesData.modules).map(([key, value]: any) =>
                        value.builds.length ? (
                            <div className={styles.module} key={key}>
                                <div className={styles.name}>{key}</div>
                                <div className={styles.builds}>
                                    {value.builds.map((i: any) => {
                                        const latest = i.buildName === 'latest';
                                        const url = `${constants.origin}/standalone/${i.manifest.name}/${i.manifest.version}`;

                                        return (
                                            <div key={i.manifest.version} className={styles.build}>
                                                <div className={styles.buttons}>
                                                    <div className={styles.version}>v_{i.manifest.version}</div>
                                                    <Button
                                                        style={{ backgroundColor: latest ? 'green' : '' }}
                                                        disabled={latest}
                                                        onClick={() => handleActivate(i)}
                                                    >
                                                        {latest ? 'активна' : 'активировать'}
                                                    </Button>
                                                    <Button
                                                        style={{ backgroundColor: latest ? 'gray' : 'red' }}
                                                        disabled={latest}
                                                        onClick={() => handleDeleteBuild(i)}
                                                    >
                                                        удалить
                                                    </Button>
                                                </div>
                                                <div className={styles.link} onClick={() => window.open(url, '_blank')}>
                                                    {url}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null
                    )}
            </div>
        </div>
    );
};

export default BuildsManager;
