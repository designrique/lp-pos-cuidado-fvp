import { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Voltar a inicializar com a chave de API via variável de ambiente.
// Isso é seguro, pois o código da função roda no servidor da Netlify.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_INSTRUCTION = `
Você é uma assistente virtual acolhedora e inspiradora da equipe de Ariana Borges.
Seu objetivo é tirar dúvidas sobre a "Mesa de Salomão", uma jornada de transformação espiritual.
Use um tom de voz calmo, espiritualizado e motivacional.

Informações chaves para responder:
- A jornada total tem 21 dias.
- Ciclo 1: "Quebra de Maldição" (9 dias) - Limpeza de bloqueios, 23/12 à 31/12.
- Ciclo 2: "Abre Caminho" (12 dias) - Ativação da prosperidade, 01/01 à 12/01.
- Preço Individual: R$333,00 por ciclo.
- Preço Completo (Recomendado): R$555,00.
- Benefícios: Limpeza energética, gravações diárias, alinhamento espiritual.
- Autoridade: Ariana Borges é referência, similar a Elaine Ourives e Max Tovar.

Seja breve e sempre incentive a pessoa a se inscrever ("Liberte-se").
`;

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { history, newMessage } = JSON.parse(event.body || "{}");

    // Usar o modelo "gemini-pro" que é estável.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chatHistory = history.map((h: { role: string; text: string }) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    }));

    const fullHistory = [
      {
        role: "user",
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Entendido! Estou aqui para ajudar com dúvidas sobre a Mesa de Salomão. Como posso te ajudar?",
          },
        ],
      },
      ...chatHistory,
    ];

    const chat = model.startChat({
      history: fullHistory,
    });

    const result = await chat.sendMessage(newMessage);
    const response = result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ response: text }),
    };
  } catch (error) {
    console.error("Error in Netlify function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

export { handler };
