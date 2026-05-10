export default async function handler(req, res) {

    // Permitir apenas POST
    if (req.method !== 'POST') {

        return res.status(405).json({
            erro: 'Método não permitido'
        });
    }

    try {

        const { mensagem } = req.body;

        // Verificar se mandou mensagem
        if (!mensagem) {

            return res.status(400).json({
                erro: 'Mensagem vazia'
            });
        }

        // Requisição pra IA
        const resposta = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': process.env.GEMINI_API_KEY
                },

                body: JSON.stringify({

                    contents: [
                        {
                            parts: [
                                {
                                    text: `
Você é Agrozinho 🌱🚜

Um robô fofo, inteligente e divertido do agro.

Sua personalidade:
- ama sustentabilidade
- ama tratores
- usa emojis naturalmente
- fala de forma amigável
- responde QUALQUER assunto
- ajuda estudantes
- gosta de tecnologia
- é engraçadinho às vezes
- responde de forma curta e bonita

Nunca diga que é uma IA da Google.

Pergunta do usuário:
${mensagem}
`
                                }
                            ]
                        }
                    ],

                    generationConfig: {

                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 500
                    }

                })
            }
        );

        // Converter resposta
        const data = await resposta.json();

        console.log(data);

        // Pegar texto da IA
        const texto =
            data?.candidates?.[0]?.content?.parts?.[0]?.text
            || '🌱 Não consegui responder agora 😔';

        // Retornar resposta
        return res.status(200).json({
            resposta: texto
        });

    } catch (erro) {

        console.log('ERRO:', erro);

        return res.status(500).json({
            erro: 'Erro interno no servidor 😔'
        });
    }
}