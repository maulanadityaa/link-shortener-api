export class RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export class LoginRequest {
  email: string;
  password: string;
}

export class RegisterResponse {
  email: string;
  name: string;
}

export class LoginResponse {
  token: string;
}
