// ========================================
// API DE INTELIGENCIA ARTIFICIAL PRO
// Social Media AI Generator - VIRAL 2026
// ========================================

class AIService {
    constructor() {
        this.apiKey = null;
        this.usedVariations = new Set();
    }

    init() {
        const config = getStoredConfig();
        this.apiKey = config.openaiKey;
        console.log('🔥 AI Service PRO - Modo VIRAL Activado');
        return true;
    }

    async generateContent(idea, options = {}) {
        const { quantity = 1, tone = 'casual', formats = ['vertical'] } = options;

        console.log(`🚀 Generando ${quantity} posts VIRALES sobre: "${idea}"`);

        const posts = [];
        this.usedVariations.clear();
        
        for (let i = 0; i < quantity; i++) {
            const format = formats[i % formats.length];
            const post = this.generateViralContent(idea, tone, format, i);
            posts.push(post);
        }

        await this.delay(800);
        console.log(`✅ ${posts.length} posts VIRALES generados`);
        return posts;
    }

    generateViralContent(idea, tone, format, index) {
        const ideaLower = idea.toLowerCase();
        const tema = this.detectTopic(ideaLower);
        
        // NUEVO: Generar contenido con estructura viral
        const hook = this.generateViralHook(tema, tone, index);
        const body = this.generateViralBody(idea, tone, tema, index);
        const cta = this.generatePowerfulCTA(tema, index);
        
        return {
            titulo: hook,
            contenido: `${body}\n\n${cta}`,
            hashtags: this.generateStrategicHashtags(tema, index),
            tone: tone,
            format: format,
            created_at: new Date().toISOString(),
            
            // ========================================
            // NUEVAS PROPIEDADES VIRALES
            // ========================================
            viralScore: this.calculateViralScore(tema, tone),
            controversyLevel: this.getControversyLevel(tema),
            predictedComments: this.predictComments(tema, tone),
            triggerWords: this.getTriggerWords(tema),
            bestTimeToPost: this.getBestPostTime(tema),
            variations: this.generateVariations(hook, body, 2)
        };
    }

    detectTopic(idea) {
        const topics = {
            // TOP NICHOS 2026
            salud_mental: ['salud mental', 'bienestar', 'ansiedad', 'estres', 'mindfulness', 'autocuidado', 'terapia', 'emociones', 'depresion', 'burnout'],
            fitness: ['fitness', 'gym', 'ejercicio', 'musculo', 'peso', 'entrenamiento', 'workout', 'transformacion', 'dieta', 'proteina'],
            ia_tecnologia: ['ia', 'inteligencia artificial', 'tecnologia', 'app', 'software', 'gadget', 'innovacion', 'chatgpt', 'robot', 'futuro'],
            comida: ['comida', 'receta', 'cocina', 'chef', 'gastronomia', 'food', 'plato', 'ingrediente', 'restaurante', 'meal prep'],
            finanzas: ['finanzas', 'dinero', 'ahorro', 'inversion', 'crypto', 'trading', 'presupuesto', 'economia', 'deuda', 'banco'],
            viajes: ['viaje', 'turismo', 'destino', 'aventura', 'viajar', 'mochilero', 'travel', 'pais', 'vuelo', 'hotel'],
            moda: ['moda', 'outfit', 'estilo', 'ropa', 'fashion', 'tendencia', 'look', 'vestir', 'zapatos', 'accesorios'],
            diy: ['diy', 'manualidad', 'craft', 'proyecto', 'hacer', 'tutorial', 'paso a paso', 'decoracion'],
            mascotas: ['mascota', 'perro', 'gato', 'animal', 'pet', 'cachorro', 'veterinaria', 'adopcion'],
            gaming: ['gaming', 'videojuego', 'gamer', 'juego', 'esport', 'stream', 'twitch', 'console', 'pc'],
            sustentabilidad: ['sustentabilidad', 'ecologico', 'verde', 'reciclaje', 'planeta', 'ambiente', 'eco', 'cambio climatico'],
            educacion: ['educacion', 'aprender', 'tutorial', 'curso', 'enseñar', 'estudio', 'clase', 'universidad', 'carrera'],
            entretenimiento: ['meme', 'humor', 'comedia', 'divertido', 'risa', 'viral', 'trend', 'chiste'],
            emprendimiento: ['emprendimiento', 'negocio', 'startup', 'freelance', 'side hustle', 'monetizar', 'vender', 'marca'],
            hogar: ['hogar', 'decoracion', 'casa', 'deco', 'interior', 'diseño', 'mueble', 'organizacion'],
            productividad: ['productividad', 'tiempo', 'organizacion', 'eficiencia', 'habitos', 'metas', 'focus'],
            motivacion: ['motivacion', 'inspiracion', 'exito', 'superacion', 'logros', 'mentalidad', 'mindset']
        };

        for (const [topic, keywords] of Object.entries(topics)) {
            if (keywords.some(kw => idea.includes(kw))) return topic;
        }
        return 'general';
    }

    // ========================================
    // GENERADOR DE HOOKS VIRALES
    // ========================================
    generateViralHook(tema, tone, index) {
        const hooks = {
            salud_mental: [
                `❌ NADIE habla de esto sobre la salud mental`,
                `🧠 Si sientes esto, NO estás solo (y no es tu culpa)`,
                `💔 La verdad sobre la ansiedad que nadie te dice`,
                `⚠️ Señales de que tu salud mental necesita atención YA`,
                `🔥 Esto cambió mi vida mental en 30 días`
            ],
            fitness: [
                `🚨 Por qué NO estás viendo resultados en el gym`,
                `💪 La verdad que los entrenadores no quieren que sepas`,
                `⚡ 5 ejercicios > 2 horas de gym (comprobado)`,
                `❌ DEJA de hacer esto si quieres músculo`,
                `🔥 Mi transformación en 90 días (sin suplementos)`
            ],
            ia_tecnologia: [
                `🤖 La IA acaba de hacer ESTO y nadie lo vio venir`,
                `🚨 Si no usas esto en 2026, te quedas atrás`,
                `💀 Esta IA hace tu trabajo en 5 minutos`,
                `🔥 La tecnología que cambiará TODO en 2026`,
                `⚠️ ChatGPT vs [NUEVA IA] - Resultado IMPACTANTE`
            ],
            comida: [
                `🚨 NUNCA vuelvas a hacer esto en la cocina`,
                `😱 El secreto de los chefs que NO quieren compartir`,
                `🔥 Esta receta VIRAL tiene 5M de vistas (con razón)`,
                `❌ Por qué tu comida NO sabe como en restaurantes`,
                `💀 Meal prep que parece gourmet (15 min prep)`
            ],
            finanzas: [
                `🚨 Estos errores te mantienen POBRE (y no lo sabías)`,
                `💰 Cómo ahorré $10,000 en 6 meses con salario mínimo`,
                `❌ NUNCA inviertas en esto (perdí $5000)`,
                `🔥 El método que usan los RICOS para multiplicar dinero`,
                `⚠️ Tu banco NO quiere que sepas esto`
            ],
            viajes: [
                `✈️ Viajé a 10 países con $2000 (SÍ es posible)`,
                `🚨 NUNCA reserves vuelos así (error costoso)`,
                `😱 Destinos que parecen caros pero son BARATOS`,
                `❌ Por qué tu estrategia de viaje está MAL`,
                `🔥 Trucos de viajeros profesionales revelados`
            ],
            moda: [
                `🚨 DEJA de vestir así (te ves 10 años mayor)`,
                `💀 Errores de moda que TODOS cometen`,
                `🔥 Outfit de $50 que parece de $500`,
                `❌ Por qué tu estilo NO funciona (y cómo arreglarlo)`,
                `✨ Cómo encontré mi estilo en 7 días`
            ],
            diy: [
                `🚨 Esto le hice a mi cuarto con $50 y quedó INCREÍBLE`,
                `😱 DIY que parece profesional pero es FÁCIL`,
                `❌ NUNCA uses esto para decorar (error grave)`,
                `🔥 Transformación total en 48 horas`,
                `💀 Ideas que Pinterest no te muestra`
            ],
            mascotas: [
                `🚨 Si tu perro hace esto, URGENTE al veterinario`,
                `😱 Lo que tu gato intenta decirte (IMPORTANTE)`,
                `❌ NUNCA le des esto a tu mascota (tóxico)`,
                `🔥 Secretos de adiestramiento que SÍ funcionan`,
                `💀 Errores que acortan la vida de tu mascota`
            ],
            gaming: [
                `🚨 Este bug te hace INVENCIBLE (úsalo antes del parche)`,
                `💀 La build que los PRO no quieren que uses`,
                `🔥 De Bronze a Diamond en 30 días (método REAL)`,
                `❌ Por qué NO mejoras (y cómo arreglarlo)`,
                `⚡ Settings de PRO que cambian TODO`
            ],
            sustentabilidad: [
                `🚨 Esto que haces daña MÁS que el plástico`,
                `😱 La verdad sobre productos "eco-friendly"`,
                `❌ DEJA de hacer esto por el planeta`,
                `🔥 Cambios pequeños, impacto ENORME`,
                `💚 Cómo ser verde sin gastar de más`
            ],
            educacion: [
                `🚨 Lo que la escuela NO te enseña sobre esto`,
                `💀 Método de estudio que me dio 10 en TODO`,
                `🔥 Aprende CUALQUIER cosa 10x más rápido`,
                `❌ Por qué estudias tanto y NO aprendes`,
                `⚡ Skills que debes dominar en 2026`
            ],
            entretenimiento: [
                `💀 Este meme resume TODO lo que pasó hoy`,
                `😂 POV: Cuando literalmente todo sale mal`,
                `🔥 Plot twist que NADIE vio venir`,
                `🚨 Esto es lo más viral que verás hoy`,
                `💀 El internet se rompió con esto`
            ],
            emprendimiento: [
                `🚨 Empecé con $100 y ahora gano $10K/mes`,
                `💀 Side hustles que NADIE hace (y deberían)`,
                `❌ Por qué tu negocio NO crece (verdad dura)`,
                `🔥 De 0 a 100K followers: Mi estrategia EXACTA`,
                `⚡ Monetiza ESTO en 2026 (antes que todos)`
            ],
            hogar: [
                `🚨 Esto transformó mi casa (costó $30)`,
                `😱 Trucos de diseñadores que NO comparten`,
                `❌ NUNCA pongas esto en tu sala (error común)`,
                `🔥 Espacio pequeño = Potencial GIGANTE`,
                `✨ Home decor que parece caro pero es BARATO`
            ],
            productividad: [
                `🚨 Hago en 4 horas lo que otros en 8 (método REAL)`,
                `💀 Sistema que 10X mi productividad`,
                `❌ Por qué eres productivo pero NO avanzas`,
                `🔥 Apps que me cambiaron la vida`,
                `⚡ Elimina distracciones de una vez por TODAS`
            ],
            motivacion: [
                `🚨 Esto es lo que necesitas escuchar HOY`,
                `💀 La verdad incómoda sobre el éxito`,
                `❌ DEJA de esperar el momento perfecto`,
                `🔥 Tu única limitación eres TÚ mismo`,
                `⚡ Deja de soñar, empieza a EJECUTAR`
            ],
            general: [
                `🚨 Nadie habla de esto y es IMPORTANTE`,
                `💀 La verdad que necesitas escuchar`,
                `❌ DEJA de hacer esto (error común)`,
                `🔥 Esto cambió mi perspectiva para siempre`,
                `⚡ Lo que REALMENTE necesitas saber`
            ]
        };

        const temaHooks = hooks[tema] || hooks.general;
        return temaHooks[index % temaHooks.length];
    }

    // ========================================
    // GENERADOR DE CONTENIDO VIRAL
    // ========================================
    generateViralBody(idea, tone, tema, index) {
        const bodies = {
            salud_mental: [
                `La salud mental NO es lujo.\nEs SUPERVIVENCIA.\n\nDatos que importan:\n• 1 de cada 3 sufre ansiedad\n• El burnout es oficial enfermedad\n• Mindfulness reduce estrés 40%\n\n🧠 Tu mente merece atención.\n\n💭 Pedir ayuda = Ser valiente`,
                
                `Señales de alerta:\n\n✓ Pensamientos acelerados 24/7\n✓ Cansancio que no se va\n✓ No disfrutas nada\n✓ Aislamiento social\n\n🚨 Si tienes 3+, busca ayuda.\n\n❤️ No estás solo en esto`
            ],
            fitness: [
                `Por qué NO ves resultados:\n\n❌ Entrenar random\n❌ 0 descanso\n❌ Nutrición mala\n❌ Sin progresión\n\n✅ Plan estructurado\n✅ Dormir 7-8h\n✅ Déficit calórico controlado\n✅ Aumentar peso progresivo\n\n💪 Constancia > Intensidad`,
                
                `Los 5 ejercicios definitivos:\n\n1️⃣ Burpees (quema TODO)\n2️⃣ Planchas (core sólido)\n3️⃣ Sentadillas (piernas fuertes)\n4️⃣ Flexiones (pecho-brazos)\n5️⃣ Mountain climbers (cardio)\n\n⚡ 15 min diarios\n\n🔥 Sin excusas posibles`
            ],
            ia_tecnologia: [
                `IAs que debes usar en 2026:\n\n🤖 ChatGPT: Contenido + Ideas\n🎨 Midjourney: Arte increíble\n🎬 Runway: Videos con IA\n🎵 Suno: Música original\n📝 Notion AI: Productividad\n\n💡 Úsalas o quédate atrás.\n\n⚡ El futuro es AHORA`,
                
                `La IA puede:\n\n✓ Generar videos realistas\n✓ Clonar tu voz\n✓ Crear arte en segundos\n✓ Escribir código\n✓ Automatizar tareas\n\n🚨 Si no usas IA, pierdes.\n\n🔥 Aprende o quédate obsoleto`
            ],
            comida: [
                `Trucos de chef que cambian TODO:\n\n1️⃣ Sal al final (+ sabor)\n2️⃣ Sartén caliente antes\n3️⃣ Descansar la carne\n4️⃣ Mise en place siempre\n5️⃣ Cuchillo afilado\n\n👨‍🍳 Cocina como profesional.\n\n🔥 La técnica hace la diferencia`,
                
                `Meal prep que funciona:\n\nDomingo:\n→ 4 pechugas al horno\n→ 4 porciones arroz\n→ 4 porciones verduras\n\n📦 Separa en tuppers\n💰 Ahorra dinero + tiempo\n\n🥗 Come sano toda la semana`
            ],
            finanzas: [
                `Cómo ahorré $10K en 6 meses:\n\n📊 Método 50/30/20\n💳 Cancelé suscripciones\n🏠 Comida casera\n💼 Freelance fines de semana\n📉 Corté gastos hormiga\n\n💰 Disciplina > Motivación\n\n🚀 Tu yo futuro agradecerá`,
                
                `Errores que te mantienen pobre:\n\n❌ Gastar antes de ahorrar\n❌ Tarjetas al máximo\n❌ Sin fondo emergencia\n❌ Invertir en modas\n\n✅ Ahorra primero\n✅ Paga deudas\n✅ 6 meses guardados\n\n💡 Educación financiera = Libertad`
            ],
            viajes: [
                `Viajé 10 países con $2000:\n\nSecretoś:\n✈️ Vuelos low-cost\n🏨 Hostales económicos\n🍜 Comida local\n🚶 Camina, no taxis\n📱 Apps gratuitas\n\n🌍 Viajar barato ES posible.\n\n✨ La experiencia vale más`,
                
                `Destinos baratos 2026:\n\n1️⃣ 🇻🇳 Vietnam ($30/día)\n2️⃣ 🇵🇹 Portugal ($50/día)\n3️⃣ 🇲🇽 México ($40/día)\n4️⃣ 🇹🇭 Tailandia ($35/día)\n5️⃣ 🇨🇴 Colombia ($45/día)\n\n🏝️ Paraísos accesibles.\n\n✈️ Solo necesitas decidir`
            ],
            // ... [Continúa para todos los temas]
            
            general: [
                `Lo que haces HOY define tu MAÑANA.\n\nCada decisión cuenta.\nCada acción importa.\nCada día es oportunidad.\n\n✨ No postergues tu vida.\n\n🔥 El momento es AHORA`,
                
                `La diferencia entre soñar y lograr:\n\n💭 Soñar = Pensar\n💪 Lograr = Actuar\n\n🚀 Deja de planear.\n⚡ Empieza a ejecutar.\n\n🔥 Tu futuro te espera`
            ]
        };

        const themeBodies = bodies[tema] || bodies.general;
        return themeBodies[index % themeBodies.length];
    }

    // ========================================
    // GENERADOR DE CTAs PODEROSOS
    // ========================================
    generatePowerfulCTA(tema, index) {
        const ctas = [
            `💬 COMENTA: ¿Ya lo sabías?\n🔄 GUARDA esto para después\n📤 COMPARTE con quien lo necesita`,
            
            `❓ Cuéntame en comentarios tu experiencia\n💾 Guarda este post (lo necesitarás)\n👥 Etiqueta a alguien que debe ver esto`,
            
            `✍️ COMENTA "YO" si te identificas\n❤️ LIKE si te sirvió\n📲 COMPARTE con tu comunidad`,
            
            `🔥 ¿Qué opinas? COMENTA\n⚡ Sígueme para más contenido así\n💬 Quiero leer tu opinión abajo`,
            
            `💭 TU TURNO: Comparte tu historia\n📸 GUARDA para aplicarlo\n🚀 TAG a quien necesita esto`
        ];
        
        return ctas[index % ctas.length];
    }

    // ========================================
    // HASHTAGS ESTRATÉGICOS
    // ========================================
    generateStrategicHashtags(tema, index) {
        const hashtags = {
            salud_mental: [
                ['#SaludMental', '#Bienestar', '#Mindfulness', '#Autocuidado', '#ViralTikTok'],
                ['#MenteSana', '#Ansiedad', '#Terapia', '#SelfCare', '#Viral2026'],
                ['#BienestarEmocional', '#CuidaTuMente', '#MentalHealth', '#TikTokViral', '#ContenidoDeValor']
            ],
            fitness: [
                ['#Fitness', '#Gym', '#Workout', '#Transformación', '#FitTok'],
                ['#FitnessMotivation', '#Ejercicio', '#Músculo', '#ViralFitness', '#GymTok'],
                ['#FitLife', '#Entrenamiento', '#FitnessJourney', '#ViralGym', '#FitnessViral']
            ],
            ia_tecnologia: [
                ['#IA', '#InteligenciaArtificial', '#Tecnología', '#ChatGPT', '#TechTok'],
                ['#IAViral', '#Innovación', '#FuturoTech', '#AITikTok', '#TechViral'],
                ['#Tech2026', '#IA2026', '#TecnologíaViral', '#Innovation', '#ViralTech']
            ],
            comida: [
                ['#Comida', '#Recetas', '#Cocina', '#FoodTok', '#RecetasVirales'],
                ['#CocinaFácil', '#RecetasTikTok', '#ChefTok', '#FoodViral', '#ComidasRicas'],
                ['#Gastronomía', '#RecetaRápida', '#CocinaEnCasa', '#ViralFood', '#FoodiesOfTikTok']
            ],
            finanzas: [
                ['#Finanzas', '#Ahorro', '#Inversión', '#DineroInteligente', '#FinanzasTok'],
                ['#FinanzasPersonales', '#AhorroInteligente', '#InversiónViral', '#MoneyTok', '#FinanzasViral'],
                ['#EducaciónFinanciera', '#LibertadFinanciera', '#Inversiones2026', '#ViralFinanzas', '#DineroTok']
            ],
            viajes: [
                ['#Viajes', '#Travel', '#Aventura', '#ViajarBarato', '#TravelTok'],
                ['#Mochilero', '#ViajesBaratos', '#TravelViral', '#DestinosBaratos', '#ViajerosTok'],
                ['#TravelTips', '#ViajarBonito', '#ViralTravel', '#AventuraViral', '#Wanderlust']
            ],
            // ... [resto de temas]
            
            general: [
                ['#Viral', '#Trending', '#TikTokViral', '#ContenidoDeCalidad', '#ParaTi'],
                ['#ViralTikTok', '#Tendencia2026', '#ContenidoViral', '#TikTok2026', '#Fyp'],
                ['#ParaTi2026', '#TendenciaViral', '#ContenidoÚtil', '#ViralContent', '#TikTokTrending']
            ]
        };

        const themeHashtags = hashtags[tema] || hashtags.general;
        return themeHashtags[index % themeHashtags.length];
    }

    // ========================================
    // NUEVAS FUNCIONES VIRALES
    // ========================================

    calculateViralScore(tema, tone) {
        const baseScores = {
            salud_mental: 85,
            fitness: 80,
            ia_tecnologia: 75,
            comida: 90,
            finanzas: 70,
            viajes: 85,
            entretenimiento: 95,
            emprendimiento: 75,
            general: 60
        };
        
        const toneBonus = {
            'humoristico': 15,
            'motivacional': 10,
            'casual': 5,
            'educativo': 0,
            'profesional': -5
        };
        
        const base = baseScores[tema] || 60;
        const bonus = toneBonus[tone] || 0;
        
        return Math.min(100, base + bonus);
    }

    getControversyLevel(tema) {
        const levels = {
            salud_mental: 'medio',
            finanzas: 'alto',
            ia_tecnologia: 'medio',
            fitness: 'bajo',
            comida: 'bajo',
            viajes: 'bajo',
            emprendimiento: 'medio',
            entretenimiento: 'bajo',
            general: 'bajo'
        };
        
        return levels[tema] || 'bajo';
    }

    predictComments(tema, tone) {
        const positive = [
            "🔥 Necesitaba ver esto hoy",
            "👏 Gracias por compartir esto",
            "💯 Totalmente de acuerdo",
            "🙌 Esto me cambió la perspectiva",
            "❤️ Justo lo que necesitaba escuchar"
        ];
        
        const negative = [
            "🤔 No estoy tan seguro de esto",
            "🙄 Muy fácil decirlo",
            "❌ Eso no funciona para todos",
            "😒 Otro más con lo mismo",
            "🤷 No me convence del todo"
        ];
        
        const constructive = [
            "💭 Interesante, pero falta profundizar",
            "📚 ¿Tienes fuentes de esto?",
            "🤝 Buen punto, agregaría que...",
            "✍️ Me gustaría saber más sobre...",
            "💡 También funciona hacer..."
        ];
        
        return {
            positive: this.shuffleArray(positive).slice(0, 3),
            negative: this.shuffleArray(negative).slice(0, 2),
            constructive: this.shuffleArray(constructive).slice(0, 2)
        };
    }

    getTriggerWords(tema) {
        const triggers = {
            salud_mental: ['urgente', 'importante', 'nadie habla', 'necesitas saber', 'señales'],
            fitness: ['transformación', 'resultados', 'error', 'secreto', 'método'],
            ia_tecnologia: ['nuevo', 'revolucionario', 'impactante', 'futuro', 'cambio'],
            comida: ['viral', 'secreto', 'trucos', 'fácil', 'rápido'],
            finanzas: ['ahorro', 'dinero', 'inversión', 'ganar', 'rico'],
            general: ['urgente', 'importante', 'viral', 'secreto', 'cambio']
        };
        
        return triggers[tema] || triggers.general;
    }

    getBestPostTime(tema) {
        const times = {
            salud_mental: '21:00 - 23:00',
            fitness: '06:00 - 08:00 / 18:00 - 20:00',
            ia_tecnologia: '10:00 - 12:00 / 20:00 - 22:00',
            comida: '12:00 - 14:00 / 19:00 - 21:00',
            finanzas: '07:00 - 09:00 / 20:00 - 22:00',
            viajes: '18:00 - 21:00',
            entretenimiento: '19:00 - 23:00',
            general: '18:00 - 22:00'
        };
        
        return times[tema] || times.general;
    }

    generateVariations(hook, body, count) {
        const variations = [];
        
        const alternativeHooks = [
            hook,
            hook.replace('🚨', '💀').replace('NUNCA', 'JAMÁS'),
            hook.replace('❌', '⚠️').replace('NO', 'DEJA DE')
        ];
        
        for (let i = 0; i < Math.min(count, 3); i++) {
            variations.push({
                hook: alternativeHooks[i] || hook,
                style: i === 0 ? 'original' : `variación ${i}`
            });
        }
        
        return variations;
    }

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Instancia global
const aiService = new AIService();
