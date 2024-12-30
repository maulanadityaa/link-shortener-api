import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Url = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.protocol + '://' + request.get('host');
  },
);
