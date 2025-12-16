import { Handler, HandlerEvent } from "@netlify/functions";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_INSTRUCTION = `
Você é uma assistente virtual acolhedora e inspiradora da equipe de Ariana Borges.
Seu objetivo é tirar dúvidas sobre a "Mesa de Salomão", uma jornada de transformação espiritual de 21 dias.
Use um tom de voz calmo, espiritualizado e motivacional. Seja breve e objetiva.

## INFORMAÇÕES SOBRE A JORNADA

**Estrutura:**
- Jornada total de 21 dias com gravações liberadas diariamente
- Ciclo 1: "Quebra de Maldição" (9 dias) - Limpeza de bloqueios, 23/12 à 31/12
- Ciclo 2: "Abre Caminho" (12 dias) - Ativação da prosperidade, 01/01 à 12/01
- As gravações começam a ser liberadas no dia 23/12/2024

**Investimento:**
- Jornada Completa: R$555,00 (valor único)

**Benefícios inclusos:**
- Acesso aos 21 dias completos de gravações
- Grupo VIP de acompanhamento
- Gravações vitalícias de todos os dias
- Bônus: Ritual de Encerramento ao Vivo

## COMO COMPRAR

- A compra é feita EXCLUSIVAMENTE pela plataforma Greenn
- O formato é de curso online com gravações liberadas diariamente
- Ao clicar em "Inscreva-se Agora" ou "Garantir Minha Vaga", será direcionado para o checkout seguro na Greenn
- Formas de pagamento: cartão de crédito, PIX, boleto

## APÓS A COMPRA

- Imediatamente após confirmar o pagamento, será liberado um GUIA DE PREPARAÇÃO
- Este guia deve ser lido com MUITA ATENÇÃO antes do início da jornada
- O guia contém orientações importantes para você se preparar energeticamente
- A primeira gravação será liberada no dia 23/12/2024

## SOBRE ARIANA BORGES

Ariana Borges é terapeuta holística e guia espiritual, referência em trabalhos de Mesa de Salomão, similar a Elaine Ourives e Max Tovar.

Sempre incentive a pessoa a se inscrever e iniciar sua transformação. Use frases como "Liberte-se" e "Abra seus caminhos".
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
