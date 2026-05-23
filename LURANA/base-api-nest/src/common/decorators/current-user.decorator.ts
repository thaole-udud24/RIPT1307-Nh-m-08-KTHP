import { createParamDecorator, ExecutionContext } from '@nestjs/common';

<<<<<<< HEAD
export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
=======
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
