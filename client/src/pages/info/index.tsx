import React from 'react';
import { api } from '@packages/utils';

import styles from './styles.module.scss';

const InfoPage = () => {
    return (
        <div className={styles.wrapper}>
            <h1>WEB CONTAINER</h1>
            <h2>Контейнер для быстрого развертывания веб приложений и управления версиями.</h2>
            <h2>Действия:</h2>
            <p>Установите docker, если его нет: sudo apt install docker.io docker-compose-v2</p>
            <a href={`${api.storageUrl}/zip/web_container.zip`} className={styles.link}>
                Распакуйте архив в любое место на машине.
            </a>
            <p>
                Перейдите в каталог web_container
                <br />
                Откройте файл .env в любом редакторе. <br />
                <br />
                WEB_CONTAINER_PORT=9999 /____________порт на котором запускается контейнер
                <br />
                NODE_TLS_REJECT_UNAUTHORIZED=0 /____отключает проверку сертификатов
                <br />
                <br />
            </p>
            <p>
                Откройте терминал и апустите команду: <strong>docker compose -f docker-compose.yml up --build -d</strong>
            </p>
            <img src={`${api.storageUrl}/img/1.png`} alt="" />
            <img src={`${api.storageUrl}/img/2.png`} alt="" />
            <p>
                Открываем браузер и заходим на
                <a target={'_blank'} href={'https://127.0.0.1:9999'} rel="noreferrer">
                    https://127.0.0.1:9999/
                </a>
                /___подставляем свой ip и порт(если меняли в конфиге)
                <br />
                Если сертификаты не заверены, может выскочить предупреждение, просто переходим.
                <br />
            </p>
            <img src={`${api.storageUrl}/img/3.png`} alt="" />
            <p>Если видим это</p>
            <img src={`${api.storageUrl}/img/4.png`} alt="" />
            <p>Значит все ок!!!</p>
            <p>
                переходим на
                <a target={'_blank'} href={'https://127.0.0.1:9999/manager/main'} rel="noreferrer">
                    https://127.0.0.1:9999/manager
                </a>
            </p>
            <p>Если видим это</p>
            <img src={`${api.storageUrl}/img/5.png`} alt="" />
            <p>Значит все работает 🤟😝🤟</p>
            <p>Виджеты</p>
            <img src={`${api.storageUrl}/img/6.png`} alt="" />
            <p>
                <strong>Серверы</strong>: Подключение к удаленным серверам где есть запущенный контейнер.
                <br /> Так мы можем синхронизировать действия, например если нужно залить релиз сразу на несколько серверов или сделать откат и т.д. <br />
                При работе с несколькими серверами одновременно, все действия выполняются асинхронно, и не влияют друг на друга.{' '}
                <strong>В разработке, пока доступна только работа с одним</strong>.
            </p>
            <br />
            <img src={`${api.storageUrl}/img/7.png`} alt="" />
            <p>
                <strong>Терминал</strong>: Ввод команд в терминал сервера nodejs.
            </p>
            <br />
            <img src={`${api.storageUrl}/img/8.png`} alt="" />
            <p>
                <strong>Директории</strong>: Директории и файлы внутри контейнера.
            </p>
            <br />
            <img src={`${api.storageUrl}/img/9.png`} alt="" />
            <p>
                <strong>Модули и версии</strong>: Контейнер абстрактный и работает с любыми модулями. <br /> Модуль - может работать как автономно так и внутри
                другого модуля.
            </p>
            <p>
                <a href={`${api.storageUrl}/zip/mail_sender_1.0.0.zip`} className={styles.link}>
                    Скачайте сборку мэйлсендера.
                </a>
                и загрузите в контейнер
            </p>

            <img src={`${api.storageUrl}/img/10.png`} alt="" />
            <img src={`${api.storageUrl}/img/11.png`} alt="" />
            <p>Модуль загружен 😎</p>
            <p>
                Когда вы активируете сборку, она помечается как latest то есть <br />
                самая актуальная и ее будут подтягивать к себе другие модули. <br />
                При Этом в режиме стэндалон можно использовать любую версию сборки изменяя путь в маршруте.
            </p>
            <p>
                переходим на
                <a target={'_blank'} href={`https://127.0.0.1:9999/standalone/mail_sender/1.0.0/`} className={styles.link} rel="noreferrer">
                    https://127.0.0.1:9999/standalone/mail_sender/1.0.0/
                </a>
            </p>
            <img src={`${api.storageUrl}/img/12.png`} alt="" />
            <p>🔥🔥🔥🔥🔥</p>
            <br />
            <p>
                <a href={`${api.storageUrl}/zip/host_1.0.0.zip`} className={styles.link}>
                    Скачайте сборку хоста.
                </a>
                и загрузите в контейнер
            </p>
            <img src={`${api.storageUrl}/img/13.png`} alt="" />
            <p>
                Теперь хост также доступен по адресу{' '}
                <a target={'_blank'} href={`https://127.0.0.1:9999/standalone/host/1.0.0/`} className={styles.link} rel="noreferrer">
                    https://127.0.0.1:9999/standalone/mail_sender/1.0.0/
                </a>
            </p>
            <p>
                После его активации он будет доступен по рутовому маршруту{' '}
                <a target={'_blank'} href={`https://127.0.0.1:9999`} className={styles.link} rel="noreferrer">
                    https://127.0.0.1:9999
                </a>
            </p>
            <img src={`${api.storageUrl}/img/14.png`} alt="" />
            <p>Сейчас модуль не загружается потому что он не активирован, после активации все будет ок</p>
            <img src={`${api.storageUrl}/img/15.png`} alt="" />
            <br />
            <br />
            <br />
            <br />
            <p>
                <a href={`${api.storageUrl}/zip/mail_sender_1.0.1.zip`} className={styles.link}>
                    Сборка майлсендер 1.0.1 с багом алерт.
                </a>
            </p>
            <p>
                <a href={`${api.storageUrl}/zip/mail_sender_1.0.2.zip`} className={styles.link}>
                    Сборка майлсендер 1.0.2 без бага.
                </a>
            </p>
            <p>
                <a href={`${api.storageUrl}/zip/host_1.0.1.zip`} className={styles.link}>
                    Сборка хост 1.0.1.
                </a>
            </p>
            <p>Активируя разные версии можно легко апгрэйдить и дау</p>
            <div className={styles.bottom}></div>
        </div>
    );
};

export default InfoPage;
