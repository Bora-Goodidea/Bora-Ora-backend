import { Router } from 'express';
import { Default, RandomString } from '@Controllers/Api/TestController';
import { CheckStatus, BaseData, ErrorTest, SystemNotice } from '@Controllers/Api/SystemController';

export const TestsRouter = Router();
export const SystemRouter = Router();

/* 테스트 Router */
TestsRouter.get('/default', Default);
TestsRouter.get('/rand-string', RandomString);

/* System Router */
SystemRouter.get('/check-status', CheckStatus);
SystemRouter.get('/base-data', BaseData);
SystemRouter.get('/error-test', ErrorTest);
SystemRouter.get('/notice', SystemNotice);
