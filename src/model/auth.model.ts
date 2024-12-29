export class RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export class LoginRequest {
  email: string;
  password: string;
}

export class UserUpdateRequest {
  email: string;
  name: string;
  password: string;
}

export class UserResponse {
  email: string;
  name: string;
}

export class LoginResponse {
  token: string;
}
