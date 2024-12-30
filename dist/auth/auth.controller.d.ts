import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../model/auth.model';
import { CommonResponse } from '../model/common-response.model';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(request: RegisterRequest): Promise<CommonResponse<RegisterResponse>>;
    login(request: LoginRequest): Promise<CommonResponse<LoginResponse>>;
    logout(token: string): Promise<CommonResponse<boolean>>;
}
