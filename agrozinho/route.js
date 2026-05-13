import 'dotenv/config'; // Carrega as variáveis do arquivo .env

import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Ler o corpo da requisição no padrão Next.js Moderno
        const { mensagem } = await req.json();

        // Verificar se mandou mensagem
        if (!mensagem) {
            return NextResponse.json({ erro: 'Mensagem vazia' }, { status: 400 });
        }

        // Requisição para a API do Gemini
        const resposta = await fetch(
            'googleapis.com',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: mensagem }]
                        }
                    ],
                    systemInstruction: {
                        parts: [
                            {
                                text: `Você é o Agrozinho 🌱🚜. Um robô fofo, inteligente e divertido do agro.
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

Nunca diga que é uma IA da Google.`
                            }
                        ]
                    },
                    generationConfig: {
                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 500
                    }
                })
            }
        );

        const data = await resposta.json();

        if (data.error) {
            console.error('Erro da API Gemini:', data.error);
            return NextResponse.json({ erro: data.error.message }, { status: 400 });
        }

        // Pegar texto da IA
        const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text 
                      || '🌱 Não consegui responder agora 😔';

        // Retornar resposta no padrão Next.js Moderno
        return NextResponse.json({ resposta: texto });

    } catch (erro) {
        console.error('ERRO INTERNO:', erro);
        return NextResponse.json({ erro: 'Erro interno no servidor 😔' }, { status: 500 });
    }
}
