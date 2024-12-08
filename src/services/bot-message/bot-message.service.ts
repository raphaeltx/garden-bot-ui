import OpenAIService from "../open-ai/open-ai.service";

class BotMessageService { 
  private openAIService: OpenAIService;

  public constructor() {
    console.log("BotMessageService constructor called.")
    this.openAIService = new OpenAIService();
  }

  public async handleMessage(userMessage: string): Promise<string> {
    try {
        const botResponse = await this.openAIService.askQuestion(userMessage);
        return botResponse;
    } catch (error) {
        return "Desculpe ocorreu um erro. Tente novamente mais tarde.";
    }
  }
}

export default BotMessageService;