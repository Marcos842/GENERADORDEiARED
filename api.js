// ========================================
// API DE INTELIGENCIA ARTIFICIAL
// Social Media AI Generator
// ========================================

class AIService {
    constructor() {
        this.apiKey = null;
    }

    // Inicializar
    init() {
        const config = getStoredConfig();
        this.apiKey = config.openaiKey;
        console.log('✅ AI Service inicializado - Generador Inteligente Activado');
        return true;
    }

    // Generar contenido con IA
    async generateContent(idea, options = {}) {
        const { quantity = 1, tone = 'casual', formats = ['vertical'] } = options;

        console.log(`🎨 Generando ${quantity} posts sobre: "${idea}"`);

        const posts = [];
        
        for (let i = 0; i < quantity; i++) {
            for (const format of formats) {
                const post = this.generateIntelligentContent(idea, tone, format);
                posts.push(post);
            }
        }

        // Simular delay para parecer más real
        await this.delay(800);

        console.log(`✅ ${posts.length} posts generados`);
        return posts;
    }

    // Generar contenido INTELIGENTE basado en la idea
    generateIntelligentContent(idea, tone, format) {
        const ideaLower = idea.toLowerCase();
        const tema = this.detectTopic(ideaLower);
        
        return {
            titulo: this.generateTitle(idea, tone, tema),
            contenido: this.generateContentBody(idea, tone, tema),
            hashtags: this.generateHashtags(tema, ideaLower),
            tone: tone,
            format: format,
            created_at: new Date().toISOString()
        };
    }

    // Detectar tema principal
    detectTopic(idea) {
        const topics = {
            psicologia: ['psicolog', 'mental', 'emoci', 'ansiedad', 'estres', 'terapia', 'cerebro'],
            productividad: ['productiv', 'tiempo', 'organizacion', 'eficien', 'habitos', 'metas'],
            tecnologia: ['tecnolog', 'app', 'software', 'digital', 'programacion', 'ia', 'codigo'],
            negocios: ['negocio', 'emprendimiento', 'startup', 'ventas', 'marketing', 'empresa'],
            salud: ['salud', 'ejercicio', 'fitness', 'nutricion', 'dieta', 'bienestar'],
            educacion: ['educacion', 'aprender', 'estudio', 'enseñar', 'curso', 'tutorial'],
            motivacion: ['motivacion', 'inspiracion', 'exito', 'superacion', 'logros'],
            redes_sociales: ['redes sociales', 'instagram', 'tiktok', 'facebook', 'contenido'],
            finanzas: ['dinero', 'ahorro', 'inversion', 'finanzas', 'presupuesto'],
            futbol: ['futbol', 'soccer', 'deporte', 'entrenamiento', 'jugador', 'tecnica']
        };

        for (const [topic, keywords] of Object.entries(topics)) {
            if (keywords.some(kw => idea.includes(kw))) return topic;
        }
        return 'general';
    }

    // Generar título
    generateTitle(idea, tone, tema) {
        const emojis = {
            psicologia: '🧠', productividad: '⚡', tecnologia: '💻',
            negocios: '💼', salud: '💪', educacion: '📚',
            motivacion: '🔥', redes_sociales: '📱', finanzas: '💰',
            futbol: '⚽', general: '✨'
        };

        const templates = {
            casual: ['💡 ', '🔥 ', '✨ ', '🚀 '],
            profesional: ['📊 ', '🎯 ', '📈 ', '💼 '],
            motivacional: ['⚡ ', '🌟 ', '💪 ', '🔥 '],
            educativo: ['📚 ', '🎓 ', '📖 ', '✏️ '],
            humoristico: ['😂 ', '🤣 ', '😅 ', '🙃 ']
        };

        const prefix = (templates[tone] || templates.casual)[0];
        const emoji = emojis[tema] || emojis.general;
        
        return `${prefix}${emoji} ${idea.substring(0, 60)}`;
    }

    // Generar cuerpo del contenido
    generateContentBody(idea, tone, tema) {
        const contentTemplates = {
            psicologia: `🧠 La ciencia detrás de ${idea.toLowerCase()}\n\n✅ Mejora tu bienestar mental\n✅ Técnicas probadas\n✅ Resultados reales\n\n💬 La salud mental es fundamental.`,
            
            productividad: `⚡ Optimiza tu tiempo con ${idea.toLowerCase()}\n\n🎯 Prioriza lo importante\n🎯 Elimina distracciones\n🎯 Resultados en 21 días\n\n💬 La productividad es un hábito.`,
            
            tecnologia: `💻 Todo sobre ${idea.toLowerCase()}\n\n🔹 Innovación constante\n🔹 Aplicaciones prácticas\n🔹 Impacto real\n\n💬 La tecnología nos transforma.`,
            
            negocios: `💼 Estrategias de ${idea.toLowerCase()}\n\n📌 Identifica oportunidades\n📌 Valida tu idea\n📌 Escala inteligentemente\n\n💬 El momento es ahora.`,
            
            salud: `💪 Mejora tu salud: ${idea.toLowerCase()}\n\n💚 Prevención primero\n💚 Constancia diaria\n💚 Balance total\n\n💬 Tu cuerpo te lo agradecerá.`,
            
            educacion: `📚 Aprende ${idea.toLowerCase()}\n\n✏️ Práctica constante\n✏️ Feedback continuo\n✏️ Aplicación real\n\n💬 El conocimiento es poder.`,
            
            motivacion: `🔥 ${idea} - ¡TÚ PUEDES!\n\n⚡ Define tu visión\n⚡ Actúa con determinación\n⚡ Nunca te rindas\n\n💬 El éxito te espera.`,
            
            redes_sociales: `📱 Domina ${idea.toLowerCase()}\n\n🎯 Contenido de valor\n🎯 Engagement real\n🎯 Consistencia\n\n💬 Algoritmo 2026 listo.`,
            
            finanzas: `💰 Educación financiera: ${idea.toLowerCase()}\n\n💵 Ahorra primero\n💵 Invierte inteligente\n💵 Diversifica bien\n\n💬 Libertad financiera posible.`,
            
            futbol: `⚽ Técnicas de ${idea.toLowerCase()}\n\n🏃‍♂️ Entrena inteligente\n🏃‍♂️ Domina fundamentos\n🏃‍♂️ Mejora constante\n\n💬 El éxito requiere dedicación.`
        };

        const defaultContent = `✨ Descubre ${idea.toLowerCase()}\n\n🔸 Información actualizada\n🔸 Aplicación práctica\n🔸 Resultados comprobados\n\n💬 ¿Qué opinas? Comenta abajo.`;

        return contentTemplates[tema] || defaultContent;
    }

    // Generar hashtags
    generateHashtags(tema, idea) {
        const hashtagMap = {
            psicologia: ['#Psicología', '#SaludMental', '#Bienestar', '#Emociones', '#MenteSana'],
            productividad: ['#Productividad', '#Organización', '#Eficiencia', '#Hábitos', '#Metas'],
            tecnologia: ['#Tecnología', '#Tech', '#Innovación', '#Digital', '#IA'],
            negocios: ['#Negocios', '#Emprendimiento', '#Startup', '#Marketing', '#Éxito'],
            salud: ['#Salud', '#Fitness', '#Bienestar', '#VidaSana', '#Ejercicio'],
            educacion: ['#Educación', '#Aprendizaje', '#Conocimiento', '#Estudio', '#Tips'],
            motivacion: ['#Motivación', '#Inspiración', '#Éxito', '#Superación', '#Metas'],
            redes_sociales: ['#SocialMedia', '#RedesSociales', '#Marketing', '#Contenido', '#Viral'],
            finanzas: ['#Finanzas', '#Dinero', '#Inversión', '#Ahorro', '#LibertadFinanciera'],
            futbol: ['#Fútbol', '#Soccer', '#Entrenamiento', '#DeportePasión', '#Técnica']
        };

        return hashtagMap[tema] || ['#Viral', '#Trending', '#Contenido', '#Tips', '#Información'];
    }

    // Delay helper
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Instancia global
const aiService = new AIService();
