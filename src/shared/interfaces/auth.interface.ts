import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    nickname?: string;
  };
}

export interface RequestWithCookies extends Request {
  cookies: {
    refreshToken?: string;
  };
}
