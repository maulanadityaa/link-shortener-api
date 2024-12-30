import { UserService } from './user.service';
import { CommonResponse } from '../model/common-response.model';
import { UserResponse, UserUpdateRequest } from '../model/user.model';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(token: string): Promise<CommonResponse<UserResponse>>;
    update(token: string, id: string, request: UserUpdateRequest): Promise<CommonResponse<UserResponse>>;
}
