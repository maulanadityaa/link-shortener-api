export class UserUpdateRequest {
  email: string;
  name: string;
  password: string;
}

export class UserResponse {
  id: string;
  email: string;
  name: string;
}
