import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { NewMessageDto } from './dto/new-message.dto';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) { }

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.auth as string;
    let payload: JwtPayload
    try {
      payload = this.jwtService.verify(token)
      await this.messagesWsService.registerClient(client, payload.id)

    } catch (error) {
      client.disconnect()
      return
    }

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
    console.log(this.messagesWsService.getConnectedClients())
  }
  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id)
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    client.broadcast.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName( client.id),
      message: payload.message || 'null'
    })
  }

}
