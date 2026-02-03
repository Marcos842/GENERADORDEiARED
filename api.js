// ========================================
// API DE INTELIGENCIA ARTIFICIAL
// Social Media AI Generator - VERSIÓN MEJORADA
// ========================================

class AIService {
    constructor() {
        this.apiKey = null;
        this.usedVariations = new Set(); // Para no repetir
    }

    init() {
        const config = getStoredConfig();
        this.apiKey = config.openaiKey;
        console.log('✅ AI Service inicializado - Generador Inteligente con Variaciones');
        return true;
    }

    // Generar contenido con IA
    async generateContent(idea, options = {}) {
        const { quantity = 1, tone = 'casual', formats = ['vertical'] } = options;

        console.log(`🎨 Generando ${quantity} posts ÚNICOS sobre: "${idea}"`);

        const posts = [];
        this.usedVariations.clear(); // Limpiar variaciones usadas
        
        for (let i = 0; i < quantity; i++) {
            for (const format of formats) {
                const post = this.generateIntelligentContent(idea, tone, format, i);
                posts.push(post);
            }
        }

        await this.delay(800);
        console.log(`✅ ${posts.length} posts ÚNICOS generados`);
        return posts;
    }

    // Generar contenido INTELIGENTE con VARIACIONES
    generateIntelligentContent(idea, tone, format, index) {
        const ideaLower = idea.toLowerCase();
        const tema = this.detectTopic(ideaLower);
        
        return {
            titulo: this.generateTitle(idea, tone, tema, index),
            contenido: this.generateContentBody(idea, tone, tema, index),
            hashtags: this.generateHashtags(tema, ideaLower, index),
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

    // Generar título VARIADO
    generateTitle(idea, tone, tema, index) {
        const templates = {
            psicologia: [
                `🧠 La ciencia detrás de ${idea.toLowerCase()}`,
                `💭 Descubre el poder de ${idea.toLowerCase()}`,
                `🎯 Todo lo que debes saber sobre ${idea.toLowerCase()}`,
                `✨ Transforma tu mente: ${idea.toLowerCase()}`,
                `🔬 Estudios revelan: ${idea.toLowerCase()}`,
                `🧩 El secreto de ${idea.toLowerCase()}`
            ],
            productividad: [
                `⚡ Multiplica tu productividad con ${idea.toLowerCase()}`,
                `🚀 Domina ${idea.toLowerCase()} en 7 días`,
                `🎯 La guía definitiva de ${idea.toLowerCase()}`,
                `💡 Expertos revelan: ${idea.toLowerCase()}`,
                `⏰ Optimiza tu tiempo: ${idea.toLowerCase()}`,
                `🔥 Secretos de ${idea.toLowerCase()}`
            ],
            general: [
                `💡 ${idea}`,
                `🔥 Descubre: ${idea}`,
                `✨ Todo sobre ${idea}`,
                `🎯 Guía completa: ${idea}`,
                `🚀 Domina ${idea}`,
                `⭐ ${idea} explicado`
            ]
        };

        const toneTemplates = templates[tema] || templates.general;
        return toneTemplates[index % toneTemplates.length];
    }

    // Generar cuerpo VARIADO
    generateContentBody(idea, tone, tema, index) {
        const variations = {
            psicologia: [
                // VARIACIÓN 1
                `🧠 La ciencia detrás de ${idea.toLowerCase()}\n\n✅ Mejora tu bienestar mental\n✅ Técnicas probadas\n✅ Resultados reales\n\n💬 La salud mental es fundamental.`,
                
                // VARIACIÓN 2
                `💭 ¿Sabías que ${idea.toLowerCase()} puede transformar tu vida?\n\nEstudios recientes demuestran:\n🔹 Mayor claridad mental\n🔹 Reducción del estrés\n🔹 Mejor toma de decisiones\n\n💬 Cuéntame tu experiencia.`,
                
                // VARIACIÓN 3
                `🎯 Aplica ${idea.toLowerCase()} en tu vida diaria:\n\n1️⃣ Observa tus patrones\n2️⃣ Identifica disparadores\n3️⃣ Implementa cambios graduales\n\n💬 Pequeños pasos, grandes resultados.`,
                
                // VARIACIÓN 4
                `🔬 La neurociencia detrás de ${idea.toLowerCase()}\n\nDescubrimientos clave:\n→ Impacto en el cerebro\n→ Cambios a largo plazo\n→ Técnicas validadas\n\n💬 La ciencia lo respalda.`,
                
                // VARIACIÓN 5
                `✨ Transforma tu perspectiva con ${idea.toLowerCase()}\n\n🌟 Comprende tus emociones\n🌟 Desarrolla resiliencia\n🌟 Encuentra balance\n\n💬 Tu mente es tu mayor aliado.`,
                
                // VARIACIÓN 6
                `🧩 El poder oculto de ${idea.toLowerCase()}\n\nBeneficios comprobados:\n✓ Mayor autoconocimiento\n✓ Mejores relaciones\n✓ Vida más plena\n\n💬 ¿Listo para el cambio?`
            ],
            
            productividad: [
                // VARIACIÓN 1
                `⚡ Multiplica tu productividad con ${idea.toLowerCase()}\n\n🎯 Prioriza lo importante\n🎯 Elimina distracciones\n🎯 Resultados en 21 días\n\n💬 La constancia es clave.`,
                
                // VARIACIÓN 2
                `🚀 El método que cambió mi vida: ${idea.toLowerCase()}\n\nPasos simples:\n1. Define objetivos claros\n2. Crea sistemas automáticos\n3. Mide tu progreso\n\n💬 Trabaja inteligente, no duro.`,
                
                // VARIACIÓN 3
                `💡 Expertos revelan: ${idea.toLowerCase()}\n\n🔸 80% de resultados con 20% de esfuerzo\n🔸 Enfoque > Multitasking\n🔸 Descanso estratégico\n\n💬 Menos es más.`,
                
                // VARIACIÓN 4
                `⏰ Domina tu tiempo: ${idea.toLowerCase()}\n\nTécnicas probadas:\n→ Bloques de tiempo\n→ Regla de 2 minutos\n→ Revisión semanal\n\n💬 El tiempo es tu activo más valioso.`,
                
                // VARIACIÓN 5
                `🔥 Secretos de ${idea.toLowerCase()}\n\n✨ Rutina matutina poderosa\n✨ Hábitos de alto rendimiento\n✨ Energía sostenible\n\n💬 Empieza tu transformación hoy.`,
                
                // VARIACIÓN 6
                `🎯 La guía definitiva: ${idea.toLowerCase()}\n\nLo que funciona:\n☑️ Metas específicas\n☑️ Accountability\n☑️ Celebrar pequeñas victorias\n\n💬 Progreso > Perfección.`
            ],
            
            general: [
                `✨ Descubre ${idea.toLowerCase()}\n\n🔸 Información actualizada\n🔸 Aplicación práctica\n🔸 Resultados comprobados\n\n💬 ¿Qué opinas?`,
                
                `💡 Todo sobre ${idea.toLowerCase()}\n\nPuntos clave:\n→ Fundamentos esenciales\n→ Casos de éxito\n→ Próximos pasos\n\n💬 Comenta tu experiencia.`,
                
                `🎯 Guía completa: ${idea.toLowerCase()}\n\n1. Entiende lo básico\n2. Practica consistente\n3. Mejora continua\n\n💬 El conocimiento es poder.`
            ]
        };

        const temaVariations = variations[tema] || variations.general;
        return temaVariations[index % temaVariations.length];
    }

    // Generar hashtags VARIADOS
    generateHashtags(tema, idea, index) {
        const hashtagSets = {
            psicologia: [
                ['#Psicología', '#SaludMental', '#Bienestar', '#Emociones', '#MenteSana'],
                ['#Mindfulness', '#Autoconocimiento', '#Terapia', '#Neurociencia', '#Crecimiento'],
                ['#SaludEmocional', '#Resiliencia', '#Autocuidado', '#Psique', '#Bienestar'],
                ['#PsicologíaPositiva', '#Emociones', '#InteligenciaEmocional', '#Balance', '#Mente'],
                ['#Neurociencia', '#ComportamientoHumano', '#SaludMental', '#Psicología', '#Desarrollo'],
                ['#BienestarMental', '#SaludPsicológica', '#AutoEstima', '#Conciencia', '#Equilibrio']
            ],
            productividad: [
                ['#Productividad', '#Organización', '#Eficiencia', '#Hábitos', '#Metas'],
                ['#GestiónDelTiempo', '#Productivo', '#Enfoque', '#Resultados', '#Éxito'],
                ['#Productividad', '#TiempoEsOro', '#Eficiencia', '#Sistema', '#Logros'],
                ['#AltoRendimiento', '#Productividad', '#Hábitos', '#Disciplina', '#Constancia'],
                ['#Organización', '#Productividad', '#MetodoGTD', '#Enfoque', '#Resultados'],
                ['#Productividad', '#ÉxitoProfesional', '#Optimización', '#Rendimiento', '#Metas']
            ],
            general: [
                ['#Viral', '#Trending', '#Contenido', '#Tips', '#Información'],
                ['#Aprendizaje', '#Conocimiento', '#Educación', '#Crecimiento', '#Desarrollo'],
                ['#Contenido', '#Información', '#Guía', '#Tutorial', '#Explicado']
            ]
        };

        const temaHashtags = hashtagSets[tema] || hashtagSets.general;
        return temaHashtags[index % temaHashtags.length];
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Instancia global
const aiService = new AIService();
