import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessagesService } from 'src/chat-messages/chat-messages.service';
import { ChatMessageCreateDto } from 'src/chat-messages/dto/create-chat-message.dto';
import { returnResult } from 'src/shared/utils/websocket.response';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/chat',
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatMessagesService: ChatMessagesService) {}

  // 새로운 클라이언트 연결
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // 클라이언트 연결 해제
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() payload: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await client.join(payload.roomId);
      console.log(`client: ${client.id} / roomId: ${payload.roomId}`);

      // 해당 방의 기존 메시지 불러오기
      const messages = await this.chatMessagesService.index(payload.roomId);
      client.emit('joinedRoom', { priviousMessages: messages });
      return returnResult('success', 200, '채팅방 참여에 성공했습니다.');
    } catch (error) {
      console.error('기존 메시지 불러오기 중 에러 발생', error);
      return returnResult('fail', 500, '채팅방 참여에 실패했습니다.');
    }
  }

  /* 채팅 모달을 닫으면 자동으로 disconnect => 추후 필요하면 사용
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
    console.log(`client: ${client.id} / roomId: ${roomId}`);
  }
  */

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() payload: ChatMessageCreateDto) {
    try {
      const message = await this.chatMessagesService.create(payload);
      this.server.to(payload.roomId).emit('receiveMessage', {
        message,
      });

      return returnResult('success', 200, '메시지 전송에 성공했습니다.');
    } catch (error) {
      console.error('DB 저장 중 에러 발생', error);
      return returnResult('fail', 500, '메시지 전송에 실패했습니다.');
    }
  }
}
