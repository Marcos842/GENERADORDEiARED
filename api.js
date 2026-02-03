// ========================================
// API DE INTELIGENCIA ARTIFICIAL
// Social Media AI Generator
// ========================================

class AIService {
    constructor() {
        this.apiKey = null;
        this.baseURL = 'https://api.openai.com/v1';
        this.model = 'gpt-3.5-turbo';
    }

    // Inicializar con API key
    init() {
        const config = getStoredConfig();
        this.apiKey = config.openaiKey;
        
        if (this.apiKey) {
            console.log('✅ OpenAI API inicializada correctamente');
            return true;
        } else {
            console.warn('⚠️ OpenAI API Key no configurada');
            return false;
        }
    }

    // Generar contenido con IA
    async generateContent(idea, options = {}) {
        if (!this.apiKey) {
            console.warn('❌ Generando contenido demo (API Key no configurada)');
            alert('⚠️ Por favor configura tu OpenAI API Key en Configuración');
            return this.generateDemoContent(idea, options);
        }

        const { quantity = 1, tone = 'casual', formats = ['vertical'] } = options;

        try {
            const posts = [];
            
            for (let i = 0; i < quantity; i++) {
                for (const format of formats) {
                    console.log(`🤖 Generando post ${i + 1} - Formato: ${format} - Tono: ${tone}`);
                    
                    const post = await this.callOpenAI(idea, tone, format);
                    posts.push(post);
                }
            }

            console.log(`✅ ${posts.length} posts generados exitosamente`);
            return posts;
        } catch (error) {
            console.error('❌ Error al generar contenido:', error);
            alert('❌ Error al generar contenido. Verifica tu API Key y conexión.');
            throw error;
        }
    }

    // Llamada REAL a OpenAI API
    async callOpenAI(idea, tone, format) {
        const prompt = this.buildPrompt(idea, tone, format);

        try {
            console.log('📡 Llamando a OpenAI API...');
            
            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: 'system',
                            content: CONFIG.PROMPTS.SYSTEM
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('❌ Error de OpenAI:', errorData);
                throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log('✅ Respuesta recibida de OpenAI');

            // Parsear la respuesta JSON
            const content = data.choices[0].message.content.trim();
            
            try {
                // Intentar parsear el JSON
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsedContent = JSON.parse(jsonMatch[0]);
                    
                    return {
                        titulo: parsedContent.titulo || 'Post Generado',
                        contenido: parsedContent.contenido || content,
                        hashtags: parsedContent.hashtags || this.generateDefaultHashtags(idea),
                        tone: tone,
                        format: format,
                        created_at: new Date().toISOString()
                    };
                }
            } catch (parseError) {
                console.warn('⚠️ No se pudo parsear JSON, usando contenido directo');
            }

            // Si no se puede parsear, usar el contenido directamente
            return {
                titulo: this.extractTitle(content),
                contenido: content,
                hashtags: this.generateDefaultHashtags(idea),
                tone: tone,
                format: format,
                created_at: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Error en callOpenAI:', error);
            
            // Si falla, mostrar error y usar demo
            if (error.message.includes('401')) {
                alert('❌ API Key inválida. Por favor verifica tu OpenAI API Key en Configuración.');
            } else if (error.message.includes('429')) {
                alert('⚠️ Límite de uso excedido. Espera un momento o verifica tu cuenta de OpenAI.');
            } else {
                alert('❌ Error al conectar con OpenAI. Usando contenido demo.');
            }
            
            return this.generateDemoContent(idea, { tone, format });
        }
    }

    // Construir prompt para OpenAI
    buildPrompt(idea, tone, format) {
        return `Genera un post para redes sociales basado en esta idea: "${idea}"

Características:
- Tono: ${tone}
- Formato: ${format}
- Debe ser atractivo y generar engagement
- Incluye emojis relevantes
- Longitud: ${format === 'vertical' ? '3-5 oraciones' : '4-8 oraciones'}

Responde SOLO en formato JSON así:
{
    "titulo": "Título llamativo del post",
    "contenido": "Contenido completo del post con emojis",
    "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"]
}`;
    }

    // Extraer título del contenido
    extractTitle(content) {
        const lines = content.split('\n').filter(l => l.trim());
        if (lines.length > 0) {
            return lines[0].substring(0, 100);
        }
        return 'Post Generado';
    }

    // Generar hashtags por defecto según la idea
    generateDefaultHashtags(idea) {
        const ideaLower = idea.toLowerCase();
        
        const hashtagSets = {
            futbol: ['#Fútbol', '#Soccer', '#FutbolPeruano', '#Entrenamiento', '#DeportePasión'],
            tecnologia: ['#Tecnología', '#Tech', '#Digital', '#Innovación', '#Futuro'],
            negocios: ['#Negocios', '#Emprendimiento', '#Startup', '#Éxito', '#Finanzas'],
            salud: ['#Salud', '#Bienestar', '#Fitness', '#Vida', '#Salud'],
            educacion: ['#Educación', '#Aprendizaje', '#Conocimiento', '#Estudio', '#Tips'],
            marketing: ['#Marketing', '#SocialMedia', '#Digital', '#Content', '#Branding'],
            motivacion: ['#Motivación', '#Inspiración', '#Éxito', '#Metas', '#Crecimiento'],
            psicologia: ['#Psicología', '#MenteSana', '#Bienestar', '#Emociones', '#Desarrollo']
        };

        for (const [key, tags] of Object.entries(hashtagSets)) {
            if (ideaLower.includes(key)) {
                return tags;
            }
        }

        return ['#Viral', '#Trending', '#MustSee', '#SocialMedia', '#Content'];
    }

    // Generar contenido demo para testing (cuando no hay API Key)
    generateDemoContent(idea, options = {}) {
        const { tone = 'casual', format = 'vertical', index = 0 } = options;

        console.log('⚠️ Usando contenido DEMO basado en tu idea');

        return {
            titulo: `📝 ${idea.substring(0, 60)}`,
            contenido: `🎯 Post sobre: ${idea}\n\n✨ Este es contenido generado de forma demo.\n\n💡 Configura tu OpenAI API Key para generar contenido real personalizado con IA.\n\n🚀 Tono: ${tone} | Formato: ${format}`,
            hashtags: this.generateDefaultHashtags(idea),
            tone: tone,
            format: format,
            created_at: new Date().toISOString()
        };
    }

    // Mejorar post basado en feedback
    async improvePost(postContent, userFeedback) {
        if (!this.apiKey) {
            console.warn('⚠️ API Key no configurada');
            return postContent;
        }

        try {
            const prompt = `Mejora este post de redes sociales basándote en este feedback: "${userFeedback}"

Post actual:
${postContent}

Responde SOLO con el post mejorado en el mismo formato.`;

            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        { role: 'system', content: 'Eres un experto en redes sociales.' },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                throw new Error('Error al mejorar post');
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();

        } catch (error) {
            console.error('❌ Error al mejorar post:', error);
            return postContent;
        }
    }

    // Utilidad: delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Instancia global
const aiService = new AIService();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        aiService.init();
    });
} else {
    aiService.init();
}
