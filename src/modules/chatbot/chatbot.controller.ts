import { Body, Controller, Post } from '@nestjs/common';
import { ApiSuccessResponse, successResponse } from '../../shared/http/api-response';
import { ChatbotAnswer } from './chatbot-response';
import { ChatbotService } from './chatbot.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('query')
  answerQuestion(@Body() input: ChatbotQueryDto): ApiSuccessResponse<ChatbotAnswer> {
    return successResponse(this.chatbotService.answerQuestion(input));
  }
}
