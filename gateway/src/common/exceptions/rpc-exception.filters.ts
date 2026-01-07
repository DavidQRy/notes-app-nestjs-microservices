import { ArgumentsHost, ExceptionFilter, Catch } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class GlobalRpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();

    // Caso: error tipo string
    if (typeof rpcError === 'string') {
      if (rpcError.includes('Empty response')) {
        return response.status(500).json({
          status: 500,
          message: rpcError.substring(0, rpcError.indexOf('(') - 1),
        });
      }

      return response.status(400).json({
        status: 400,
        message: rpcError,
      });
    }

    // Caso: error tipo objeto
    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const statusRaw = (rpcError as any).status;

      const status =
        typeof statusRaw === 'number' && !isNaN(statusRaw) ? statusRaw : 400;

      return response.status(status).json({
        status,
        message: (rpcError as any).message,
      });
    }

    // Fallback
    return response.status(400).json({
      status: 400,
      message: 'Unexpected RPC error',
    });
  }
}
