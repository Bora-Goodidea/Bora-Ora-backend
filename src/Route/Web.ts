import { Router } from 'express';
import { Default } from '@Controllers/Web/DefaultController';
import { EnailAuth } from '@Controllers/Web/v1/AuthController';
export const DefaultRouter = Router();
export const AuthRouter = Router();

// 기본 테스트.
DefaultRouter.get('/', Default);

// 인증처리 페이지
AuthRouter.get('/email-auth/:authCode', EnailAuth);
