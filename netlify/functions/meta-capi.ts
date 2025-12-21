import { Handler, HandlerEvent } from "@netlify/functions";
import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || "1414964383316703";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

const hashData = (data: string) => {
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const { email, phone, value, currency, event_name = "Purchase" } = body;

        if (!ACCESS_TOKEN) {
            console.error("META_ACCESS_TOKEN not set");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Configuration Error: META_ACCESS_TOKEN is missing" }),
            };
        }

        const capiPayload = {
            data: [
                {
                    event_name: event_name,
                    event_time: Math.floor(Date.now() / 1000),
                    action_source: "website",
                    user_data: {
                        em: email ? [hashData(email)] : [],
                        ph: phone ? [hashData(phone)] : []
                    },
                    custom_data: {
                        currency: currency || "BRL",
                        value: value ? value.toString() : "555.00"
                    }
                }
            ]
        };

        const response = await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(capiPayload),
        });

        const result = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error("Error in meta-capi function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

export { handler };
