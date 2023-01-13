import { createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";

export const RawHeaders = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest()
        return req.rawHeaders
    }
)