import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the client with the API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

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

export const sendMessageToGemini = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Convert history to the format expected by the SDK
    const chatHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    // Add system instruction as the first message in history
    const fullHistory = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      {
        role: 'model',
        parts: [{ text: 'Entendido! Estou aqui para ajudar com dúvidas sobre a Mesa de Salomão. Como posso te ajudar?' }]
      },
      ...chatHistory
    ];

    const chat = model.startChat({
      history: fullHistory,
    });

    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text() || "Desculpe, senti uma oscilação na energia. Poderia repetir?";
  } catch (error) {
    console.error("Erro ao conectar com o guia espiritual:", error);
    return "No momento, estamos em silêncio profundo. Tente novamente em instantes.";
  }
};