export const sendMessage = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
    try {
        const response = await fetch('/.netlify/functions/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ history, newMessage }),
        });

        if (!response.ok) {
            throw new Error(`Netlify function error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response || "A energia está um pouco instável. Poderia tentar novamente?";

    } catch (error) {
        console.error("Erro ao chamar a função Netlify:", error);
        return "No momento, estamos em silêncio profundo. Tente novamente em instantes.";
    }
};
