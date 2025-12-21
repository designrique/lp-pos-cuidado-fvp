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
        const data = JSON.parse(event.body || "{}");
        console.log("Received webhook from InfinitePay:", JSON.stringify(data, null, 2));

        // InfinitePay typically sends a 'paid' boolean or status
        // Adjust this condition based on the actual InfinitePay webhook payload
        if (data.status === 'approved' || data.paid === true) {
            console.log("Payment confirmed. Sending Meta CAPI event...");

            if (ACCESS_TOKEN) {
                const email = data.customer?.email || "";
                const phone = data.customer?.phone_number || "";
                const value = data.amount ? data.amount / 100 : 555.00;

                const capiPayload = {
                    data: [
                        {
                            event_name: "Purchase",
                            event_time: Math.floor(Date.now() / 1000),
                            action_source: "website",
                            user_data: {
                                em: email ? [hashData(email)] : [],
                                ph: phone ? [hashData(phone)] : []
                            },
                            custom_data: {
                                currency: "BRL",
                                value: value.toString()
                            }
                        }
                    ]
                };

                const metaResponse = await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(capiPayload)
                });

                const metaResult = await metaResponse.json();
                console.log("Meta CAPI Response:", JSON.stringify(metaResult));
            } else {
                console.warn("META_ACCESS_TOKEN not set. Skipping CAPI.");
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Webhook processed" }),
        };
    } catch (error) {
        console.error("Error in webhook-infinitepay function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

export { handler };
