import { Request, Response } from 'express';
import { NoContentResponse, SuccessResponse, ClientErrorResponse } from '@Providers/ResponseProvider';
import { GenSystemData, SystemNotice as SystemNoticeService } from '@Services/SystemService';

// 서버 체크
export const CheckStatus = async (req: Request, res: Response): Promise<Response> => {
    return NoContentResponse(res);
};

// 에러
export const ErrorTest = async (req: Request, res: Response): Promise<Response> => {
    return ClientErrorResponse(res, '문제가 발생 했습니다.', Error('에러발생'));
};

// 기본 데이터
export const BaseData = async (req: Request, res: Response): Promise<Response> => {
    return SuccessResponse(res, await GenSystemData());
};

// 서버 공지사항
export const SystemNotice = async (req: Request, res: Response): Promise<Response> => {
    const notice = await SystemNoticeService();

    if (notice) {
        return SuccessResponse(res, { notice: notice });
    } else {
        return NoContentResponse(res);
    }
};
