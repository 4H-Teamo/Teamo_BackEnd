export interface KakaoAccessToken {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}

interface KakaoUserProfile {
  nickname: string;
  is_default_nickname: boolean;
}

interface KakaoAccount {
  profile_nickname_needs_agreement: boolean;
  profile: KakaoUserProfile;
}

interface KakaoUserProperties {
  nickname: string;
}

export interface KakaoUserInfo {
  id: number;
  connected_at: string;
  properties: KakaoUserProperties;
  kakao_account: KakaoAccount;
}

export interface KakaoErrorResponse {
  error?: string;
  error_description?: string;
  error_code?: string;
  code?: number;
  msg?: string;
}
