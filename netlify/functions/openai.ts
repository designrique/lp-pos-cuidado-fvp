import { Handler, HandlerEvent } from "@netlify/functions";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

        // Build messages array for OpenAI
        const messages: OpenAI.ChatCompletionMessageParam[] = [
            { role: "system", content: SYSTEM_INSTRUCTION },
        ];

        // Add conversation history
        for (const h of history) {
            messages.push({
                role: h.role === "user" ? "user" : "assistant",
                content: h.text,
            });
        }

        // Add new message
        messages.push({ role: "user", content: newMessage });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            max_tokens: 500,
            temperature: 0.7,
        });

        const text = completion.choices[0]?.message?.content ||
            "A energia está um pouco instável. Poderia tentar novamente?";

        return {
            statusCode: 200,
            body: JSON.stringify({ response: text }),
        };
    } catch (error) {
        console.error("Error in OpenAI function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

export { handler };
