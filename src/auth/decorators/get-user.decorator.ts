import { createParamDecorator } from "@nestjs/common";
import { InternalServerErrorException } from "@nestjs/common/exceptions";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest()
        const user = req.user

        if (!user)
            throw new InternalServerErrorException('User not found')

        return (!data) ? user : user[data]
    }
)