import express, { Application } from 'express';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import * as API from '@Routes/Api';
import * as WEB from '@Routes/Web';
import { RestDefaultMiddleware } from '@Middlewares/RestDefaultMiddleware';
import { Logger, AccessLogStream, LogDateTime } from '@Logger';
import Config from '@Config';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileupload from 'express-fileupload';
import morgan from 'morgan';
import AppDataSource from '@Database/AppDataSource';
import { createServer } from 'http';

export const checkEnvironment = (): { state: boolean; message: string } => {
    const envFileExist = fs.existsSync('.env');

    if (!envFileExist) {
        return {
            state: false,
            message: `Environment File not found...`,
        };
    }

    const ConfigList: string[] = Object.keys(Config);

    const envCheck = ConfigList.map((e) => {
        if (_.has(Config, e) && _.isEmpty(String(_.get(Config, e)))) {
            return e;
        }
    }).filter((e) => e);

    if (envCheck.length > 0) {
        return {
            state: false,
            message: `${envCheck.join(', ')} Environment Not Found...........`,
        };
    }

    return {
        state: true,
        message: `check end `,
    };
};

// 라우터 등록
const addRouters = (app: Application): void => {
    const baseApiRoute = '/api';
    const baseWebRoute = '/web';

    const versionV1 = `v1`;

    /* apiRoute */
    app.use(`${baseApiRoute}/tests`, API.TestsRouter);
    app.use(`${baseApiRoute}/system`, RestDefaultMiddleware, API.SystemRouter);

    /* v1 */
    app.use(`${baseApiRoute}/${versionV1}/user`, RestDefaultMiddleware, API.UserRouterV1);

    /* webRoute */
    app.use(`${baseWebRoute}/${versionV1}/auth`, WEB.AuthRouter);
    app.use(`/`, WEB.DefaultRouter);
};

// 서버 초기화 설정.
export const initServer = (app: Application, Path: string): void => {
    morgan.token('timestamp', () => {
        return LogDateTime();
    });

    app.set('view engine', 'pug');
    app.set('views', path.join(Path, 'Resources/View'));
    app.set('AppRootDir', Path);
    app.use(express.static(path.join(Path, 'Resources/Public')));

    app.use(
        morgan(':remote-addr - :remote-user [:timestamp] ":method :url HTTP/:http-version" :status :res[content-length]', {
            stream: AccessLogStream,
        }),
    );

    app.use(
        cors({
            origin: '*',
        }),
    );

    app.locals.user = {
        auth: false,
        user_id: 0,
        uid: '',
        email: '',
        status: '',
        level: '',
    };

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(
        fileupload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
        }),
    );

    addRouters(app);
    return;
};

// 서버 시작.
export const startServer = async (app: Application) => {
    Logger.console(``);
    const port = Number(Config.PORT);
    const appName = Config.APP_NAME;
    const appEnv = Config.APP_ENV;

    const AppDatainit = await AppDataSource.initialize();

    if (!AppDatainit.isInitialized) {
        Logger.error(`Database Init Error`);
        return;
    } else {
        Logger.warn(`:: Database Init Success ::`);
    }

    const server = createServer(app);

    server.listen(port, () => {
        Logger.console(``);
        Logger.console(`Running Name - ${appName}`);
        Logger.console(`Running Environment - ${appEnv}`);
        Logger.console(`Running on port - ${port}`);
        Logger.console(``);
        Logger.warn(`:: Server Start Success ::`);
        Logger.console(``);
    });
};
