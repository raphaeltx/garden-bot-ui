import OpenAI, { ClientOptions } from "openai";

class OpenAIService {
  private client: OpenAI;

  public constructor() {
    const { REACT_APP_OPEN_AI_KEY, REACT_APP_PROJECT_ID } = process.env;

    const clientOptions: ClientOptions = {
      apiKey: REACT_APP_OPEN_AI_KEY,
      project: REACT_APP_PROJECT_ID,
      dangerouslyAllowBrowser: true
    }
    
    this.client = new OpenAI(clientOptions);
  }

  public async askQuestion(prompt: string): Promise<string> {
    prompt += `(Responda sempre em português. Caso a mensagem não seja relacionada ao cultivo de plantas, responda de formas diferentes explicando que só pode auxiliar sobre tudo relacionado à jardinagem.
    A mensagem deve ser especificamente sobre jardinagem.
    Coloque um emogi na mensagem quando explicar que não pode tratar de outros assuntos. No começo da mensagem, sempre coloque um emoji relacionado a chatbot.)`;
    const stream = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    let response = "";
    
    for await (const chunk of stream) {
      response += chunk.choices[0]?.delta?.content || "";
    }
    
    return response;
  }
}

export default OpenAIService;
