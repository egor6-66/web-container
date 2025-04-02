import React, { useRef } from 'react';
import { useStateCustom } from '@packages/hooks';
import { AnimatePresence, Button, Checkbox, Input } from '@packages/ui';

import { useModules } from '@/features';

import styles from './styles.module.scss';

const BuildsManager = () => {
    const ref = useRef(null);
    const file = useStateCustom(null);
    const { downloadModule, getAvailableModules, deleteBuild } = useModules();
    const { mutate: downloadBuildMutate } = downloadModule();
    const { mutate: deleteBuildMutate } = deleteBuild();
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
        deleteBuildMutate(
            { name: i.manifest.name, version: i.manifest.version },
            {
                onSuccess: () => {
                    file.set(null);
                    ref.current.value = '';
                    refetch();
                },
            }
        );
    };

    console.log(availableModulesData);

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

                                        return (
                                            <div key={i.manifest.version} className={styles.build}>
                                                <div className={styles.version}>v_{i.manifest.version}</div>
                                                <Button style={{ backgroundColor: 'green' }} disabled={latest}>
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
