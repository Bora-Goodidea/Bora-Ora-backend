import { Router } from 'express';
import { Default, RandomString } from '@Controllers/Api/TestController';
import { CheckStatus, BaseData, ErrorTest, SystemNotice } from '@Controllers/Api/SystemController';
import * as AuthControllerV1 from '@Controllers/Api/v1/AuthController';
import * as UserControllerV1 from '@Controllers/Api/v1/UserController';

export const TestsRouter = Router();
export const SystemRouter = Router();
export const UserRouterV1 = Router();
export const AuthRouterV1 = Router();

/* 테스트 Router */
TestsRouter.get(`/default`, Default);
TestsRouter.get(`/rand-string`, RandomString);

/* System Router */
SystemRouter.get(`/check-status`, CheckStatus);
SystemRouter.get(`/base-data`, BaseData);
SystemRouter.get(`/error-test`, ErrorTest);
SystemRouter.get(`/notice`, SystemNotice);

/* User Router */
UserRouterV1.post(`/user-register`, UserControllerV1.UserRegister);
UserRouterV1.post(`/user-prefer-update`, UserControllerV1.UserPreferUpdate);

/* Auth Router */
AuthRouterV1.post(`/user-login`, AuthControllerV1.UserLogin);
