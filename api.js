// ========================================
// API DE INTELIGENCIA ARTIFICIAL PRO
// Social Media AI Generator - VIRAL 2026
// SISTEMA ANTI-REPETICIÓN ACTIVADO
// ========================================

class AIService {
    constructor() {
        this.apiKey = null;
        this.currentSessionUsed = {
            hooks: new Set(),
            bodies: new Set(),
            ctas: new Set()
        };
    }

    init() {
        const config = getStoredConfig();
        this.apiKey = config.openaiKey;
        console.log('🔥 AI Service PRO - Modo VIRAL Activado');
        console.log('✅ Sistema Anti-Repetición ACTIVO');
        return true;
    }

    async generateContent(idea, options = {}) {
        const { quantity = 1, tone = 'casual', formats = ['vertical'] } = options;

        console.log(`🚀 Generando ${quantity} posts VIRALES sobre: "${idea}"`);

        // RESETEAR contenido usado al inicio de cada generación
        this.currentSessionUsed = {
            hooks: new Set(),
            bodies: new Set(),
            ctas: new Set()
        };

        const posts = [];
        
        for (let i = 0; i < quantity; i++) {
            const format = formats[i % formats.length];
            const post = this.generateViralContent(idea, tone, format, i);
            posts.push(post);
        }

        await this.delay(800);
        console.log(`✅ ${posts.length} posts VIRALES generados (100% únicos)`);
        return posts;
    }

    generateViralContent(idea, tone, format, index) {
        const ideaLower = idea.toLowerCase();
        const tema = this.detectTopic(ideaLower);
        
        // NUEVO: Generar contenido ÚNICO con sistema anti-repetición
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
            // PROPIEDADES VIRALES
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
    // GENERADOR DE HOOKS VIRALES (MEJORADO)
    // ========================================
    generateViralHook(tema, tone, index) {
        const hooks = {
            salud_mental: [
                `❌ NADIE habla de esto sobre la salud mental`,
                `🧠 Si sientes esto, NO estás solo (y no es tu culpa)`,
                `💔 La verdad sobre la ansiedad que nadie te dice`,
                `⚠️ Señales de que tu salud mental necesita atención YA`,
                `🔥 Esto cambió mi vida mental en 30 días`,
                `💀 El burnout es real y NO es debilidad`,
                `✋ DEJA de ignorar estas señales de tu cerebro`,
                `🚨 Tu mente te está gritando esto (escúchala)`
            ],
            fitness: [
                `🚨 Por qué NO estás viendo resultados en el gym`,
                `💪 La verdad que los entrenadores no quieren que sepas`,
                `⚡ 5 ejercicios > 2 horas de gym (comprobado)`,
                `❌ DEJA de hacer esto si quieres músculo`,
                `🔥 Mi transformación en 90 días (sin suplementos)`,
                `💀 El error #1 que destruye tu progreso`,
                `⚠️ Si entrenas así, NUNCA verás cambios`,
                `🏋️ Lo que nadie te dice sobre ganar masa muscular`
            ],
            ia_tecnologia: [
                `🤖 La IA acaba de hacer ESTO y nadie lo vio venir`,
                `🚨 Si no usas esto en 2026, te quedas atrás`,
                `💀 Esta IA hace tu trabajo en 5 minutos`,
                `🔥 La tecnología que cambiará TODO en 2026`,
                `⚠️ ChatGPT vs [NUEVA IA] - Resultado IMPACTANTE`,
                `🚀 La IA que está reemplazando empleos AHORA`,
                `⚡ Esto hace la IA mientras duermes`,
                `💡 La revolución que NO viste llegar`
            ],
            comida: [
                `🚨 NUNCA vuelvas a hacer esto en la cocina`,
                `😱 El secreto de los chefs que NO quieren compartir`,
                `🔥 Esta receta VIRAL tiene 5M de vistas (con razón)`,
                `❌ Por qué tu comida NO sabe como en restaurantes`,
                `💀 Meal prep que parece gourmet (15 min prep)`,
                `👨‍🍳 El truco que cambió mi forma de cocinar`,
                `⚡ Técnicas de chef en tu cocina casera`,
                `🍽️ Lo que los restaurantes NO te cuentan`
            ],
            finanzas: [
                `🚨 Estos errores te mantienen POBRE (y no lo sabías)`,
                `💰 Cómo ahorré $10,000 en 6 meses con salario mínimo`,
                `❌ NUNCA inviertas en esto (perdí $5000)`,
                `🔥 El método que usan los RICOS para multiplicar dinero`,
                `⚠️ Tu banco NO quiere que sepas esto`,
                `💸 La trampa financiera en la que todos caen`,
                `📈 Inversión que me cambió la vida (legal)`,
                `🏦 Lo que tu asesor financiero NO te dice`
            ],
            viajes: [
                `✈️ Viajé a 10 países con $2000 (SÍ es posible)`,
                `🚨 NUNCA reserves vuelos así (error costoso)`,
                `😱 Destinos que parecen caros pero son BARATOS`,
                `❌ Por qué tu estrategia de viaje está MAL`,
                `🔥 Trucos de viajeros profesionales revelados`,
                `🌍 El secreto para viajar casi gratis`,
                `✨ Destinos de ensueño con presupuesto real`,
                `🗺️ Lo que las agencias NO quieren que sepas`
            ],
            moda: [
                `🚨 DEJA de vestir así (te ves 10 años mayor)`,
                `💀 Errores de moda que TODOS cometen`,
                `🔥 Outfit de $50 que parece de $500`,
                `❌ Por qué tu estilo NO funciona (y cómo arreglarlo)`,
                `✨ Cómo encontré mi estilo en 7 días`,
                `👗 El secreto de verse bien sin gastar mucho`,
                `🕶️ Tendencias que SÍ valen la pena`,
                `👠 Lo que la moda rápida no te cuenta`
            ],
            diy: [
                `🚨 Esto le hice a mi cuarto con $50 y quedó INCREÍBLE`,
                `😱 DIY que parece profesional pero es FÁCIL`,
                `❌ NUNCA uses esto para decorar (error grave)`,
                `🔥 Transformación total en 48 horas`,
                `💀 Ideas que Pinterest no te muestra`,
                `🎨 Proyecto DIY que cambió mi espacio`,
                `✂️ Manualidades que parecen caras pero NO lo son`,
                `🛠️ DIY nivel PRO con herramientas básicas`
            ],
            mascotas: [
                `🚨 Si tu perro hace esto, URGENTE al veterinario`,
                `😱 Lo que tu gato intenta decirte (IMPORTANTE)`,
                `❌ NUNCA le des esto a tu mascota (tóxico)`,
                `🔥 Secretos de adiestramiento que SÍ funcionan`,
                `💀 Errores que acortan la vida de tu mascota`,
                `🐕 Señales de que tu perro está enfermo`,
                `🐱 Comportamiento de gatos que debes conocer`,
                `🏥 Lo que tu veterinario no te dice`
            ],
            gaming: [
                `🚨 Este bug te hace INVENCIBLE (úsalo antes del parche)`,
                `💀 La build que los PRO no quieren que uses`,
                `🔥 De Bronze a Diamond en 30 días (método REAL)`,
                `❌ Por qué NO mejoras (y cómo arreglarlo)`,
                `⚡ Settings de PRO que cambian TODO`,
                `🎮 El secreto que te llevará a Challenger`,
                `🕹️ Meta actual que nadie usa (pero funciona)`,
                `👾 Truco que los streamers guardan en secreto`
            ],
            sustentabilidad: [
                `🚨 Esto que haces daña MÁS que el plástico`,
                `😱 La verdad sobre productos "eco-friendly"`,
                `❌ DEJA de hacer esto por el planeta`,
                `🔥 Cambios pequeños, impacto ENORME`,
                `💚 Cómo ser verde sin gastar de más`,
                `🌱 La mentira del reciclaje que todos creen`,
                `♻️ Alternativas sustentables que SÍ funcionan`,
                `🌍 Lo que las marcas ecológicas NO quieren que sepas`
            ],
            educacion: [
                `🚨 Lo que la escuela NO te enseña sobre esto`,
                `💀 Método de estudio que me dio 10 en TODO`,
                `🔥 Aprende CUALQUIER cosa 10x más rápido`,
                `❌ Por qué estudias tanto y NO aprendes`,
                `⚡ Skills que debes dominar en 2026`,
                `📚 Técnica de aprendizaje de Harvard (gratis)`,
                `🎓 Lo que los profesores no te dicen`,
                `💡 Sistema de estudio que cambió mi vida`
            ],
            entretenimiento: [
                `💀 Este meme resume TODO lo que pasó hoy`,
                `😂 POV: Cuando literalmente todo sale mal`,
                `🔥 Plot twist que NADIE vio venir`,
                `🚨 Esto es lo más viral que verás hoy`,
                `💀 El internet se rompió con esto`,
                `😱 Video que me hizo escupir el café`,
                `🤣 No puedo dejar de ver esto`,
                `🎬 El trend que todos van a copiar`
            ],
            emprendimiento: [
                `🚨 Empecé con $100 y ahora gano $10K/mes`,
                `💀 Side hustles que NADIE hace (y deberían)`,
                `❌ Por qué tu negocio NO crece (verdad dura)`,
                `🔥 De 0 a 100K followers: Mi estrategia EXACTA`,
                `⚡ Monetiza ESTO en 2026 (antes que todos)`,
                `💰 Negocio online que me liberó financieramente`,
                `📊 La fórmula de escalamiento que funciona`,
                `🚀 De empleado a CEO: Mi historia real`
            ],
            hogar: [
                `🚨 Esto transformó mi casa (costó $30)`,
                `😱 Trucos de diseñadores que NO comparten`,
                `❌ NUNCA pongas esto en tu sala (error común)`,
                `🔥 Espacio pequeño = Potencial GIGANTE`,
                `✨ Home decor que parece caro pero es BARATO`,
                `🏠 Renovación total sin obras ni permisos`,
                `🎨 Ideas de decoración que funcionan SIEMPRE`,
                `🛋️ Lo que los diseñadores de interiores callan`
            ],
            productividad: [
                `🚨 Hago en 4 horas lo que otros en 8 (método REAL)`,
                `💀 Sistema que 10X mi productividad`,
                `❌ Por qué eres productivo pero NO avanzas`,
                `🔥 Apps que me cambiaron la vida`,
                `⚡ Elimina distracciones de una vez por TODAS`,
                `📱 Herramientas que uso para ser 10x más eficiente`,
                `⏰ Gestión de tiempo que SÍ funciona`,
                `💡 El secreto de las personas ultra-productivas`
            ],
            motivacion: [
                `🚨 Esto es lo que necesitas escuchar HOY`,
                `💀 La verdad incómoda sobre el éxito`,
                `❌ DEJA de esperar el momento perfecto`,
                `🔥 Tu única limitación eres TÚ mismo`,
                `⚡ Deja de soñar, empieza a EJECUTAR`,
                `💪 El día que decidí cambiar mi vida`,
                `🎯 De la frustración al éxito: Mi camino`,
                `✨ No eres demasiado viejo ni es demasiado tarde`
            ],
            general: [
                `🚨 Nadie habla de esto y es IMPORTANTE`,
                `💀 La verdad que necesitas escuchar`,
                `❌ DEJA de hacer esto (error común)`,
                `🔥 Esto cambió mi perspectiva para siempre`,
                `⚡ Lo que REALMENTE necesitas saber`,
                `✨ La lección que me tomó años aprender`,
                `💡 Algo que todos deberían saber`,
                `🎯 El cambio que transformó mi vida`
            ]
        };

        return this.getUniqueItem(hooks[tema] || hooks.general, this.currentSessionUsed.hooks);
    }

    // ========================================
    // GENERADOR DE CONTENIDO VIRAL (MEJORADO)
    // ========================================
    generateViralBody(idea, tone, tema, index) {
        const bodies = {
            salud_mental: [
                `La salud mental NO es lujo.\nEs SUPERVIVENCIA.\n\nDatos que importan:\n• 1 de cada 3 sufre ansiedad\n• El burnout es oficial enfermedad\n• Mindfulness reduce estrés 40%\n\n🧠 Tu mente merece atención.\n\n💭 Pedir ayuda = Ser valiente`,
                
                `Señales de alerta:\n\n✓ Pensamientos acelerados 24/7\n✓ Cansancio que no se va\n✓ No disfrutas nada\n✓ Aislamiento social\n\n🚨 Si tienes 3+, busca ayuda.\n\n❤️ No estás solo en esto`,
                
                `El burnout NO es debilidad:\n\n→ Es agotamiento real\n→ Afecta tu cuerpo\n→ Necesita tratamiento\n→ Tiene solución\n\n💪 Prioriza tu bienestar.\n\n🌱 Descansar NO es rendirse`,
                
                `Mindfulness en 3 pasos:\n\n1️⃣ Respira profundo 4 veces\n2️⃣ Observa sin juzgar\n3️⃣ Vuelve al presente\n\n🧘 Practica 5 min diarios.\n\n✨ Tu mente agradecerá`,
                
                `Terapia NO es para "locos":\n\n✅ Es para personas inteligentes\n✅ Que cuidan su salud\n✅ Y quieren crecer\n\n💭 Ir al psicólogo = Ir al gym\n\n🧠 Ejercitas tu mente`,
                
                `La ansiedad NO define tu valor:\n\n• No eres débil\n• No estás roto\n• No es permanente\n• Tiene tratamiento\n\n💜 Mereces sentirte bien.\n\n🌟 La paz mental es posible`,
                
                `Autocuidado REAL:\n\n❌ NO es solo spa\n✅ Poner límites\n✅ Decir NO\n✅ Descansar sin culpa\n✅ Buscar ayuda\n\n💖 Priorizarte NO es egoísmo.\n\n🦋 Es supervivencia emocional`,
                
                `Tu salud mental importa porque:\n\n→ Afecta todo lo demás\n→ No es algo superficial\n→ Mereces estar bien\n→ Tu vida depende de ello\n\n🧠 No lo ignores más.\n\n🌈 La ayuda existe`
            ],
            fitness: [
                `Por qué NO ves resultados:\n\n❌ Entrenar random\n❌ 0 descanso\n❌ Nutrición mala\n❌ Sin progresión\n\n✅ Plan estructurado\n✅ Dormir 7-8h\n✅ Déficit calórico controlado\n✅ Aumentar peso progresivo\n\n💪 Constancia > Intensidad`,
                
                `Los 5 ejercicios definitivos:\n\n1️⃣ Burpees (quema TODO)\n2️⃣ Planchas (core sólido)\n3️⃣ Sentadillas (piernas fuertes)\n4️⃣ Flexiones (pecho-brazos)\n5️⃣ Mountain climbers (cardio)\n\n⚡ 15 min diarios\n\n🔥 Sin excusas posibles`,
                
                `La verdad sobre ganar músculo:\n\n• 70% nutrición\n• 20% entrenamiento\n• 10% descanso\n\nSIN proteína = SIN músculo\nSIN progresión = SIN cambio\nSIN descanso = SIN crecimiento\n\n🏋️ La ciencia no miente.\n\n💯 Haz las 3 bien`,
                
                `Transformación de 90 días:\n\n📅 Días 1-30: Hábitos\n📅 Días 31-60: Resultados visibles\n📅 Días 61-90: Transformación\n\n⚡ No es magia\n⚡ Es disciplina\n\n💪 Tu decides cuando empezar`,
                
                `Errores que TODOS cometen:\n\n❌ Comer poco y entrenar mucho\n❌ Solo cardio\n❌ No trackear progreso\n❌ Compararse con otros\n\n✅ Déficit moderado\n✅ Pesas + cardio\n✅ Medir todo\n✅ Competir contigo mismo`,
                
                `Nutrición fitness simplificada:\n\n🍗 Proteína: 2g x kg peso\n🍚 Carbos: Pre y post workout\n🥑 Grasas: 20-30% calorías\n💧 Agua: 3-4 litros\n\n📊 Trackea 80% del tiempo.\n\n🎯 Los resultados llegan`,
                
                `El mito del gym todos los días:\n\n❌ 7 días = Sobreentrenamiento\n✅ 4-5 días = Óptimo\n\n→ Músculo crece en descanso\n→ No es cantidad, es calidad\n\n😴 Dormir bien > Entrenar más.\n\n💪 Dale tiempo al cuerpo`,
                
                `Home workout que SÍ funciona:\n\n20 min, 3x semana:\n\n• 50 sentadillas\n• 30 flexiones\n• 60 seg plancha\n• 40 burpees\n\n🔁 3 rondas sin parar\n\n🏠 0 excusas\n\n🔥 Resultados reales`
            ],
            // ... Continúa con MUCHOS más bodies para CADA tema...
            
            general: [
                `Lo que haces HOY define tu MAÑANA.\n\nCada decisión cuenta.\nCada acción importa.\nCada día es oportunidad.\n\n✨ No postergues tu vida.\n\n🔥 El momento es AHORA`,
                
                `La diferencia entre soñar y lograr:\n\n💭 Soñar = Pensar\n💪 Lograr = Actuar\n\n🚀 Deja de planear.\n⚡ Empieza a ejecutar.\n\n🔥 Tu futuro te espera`,
                
                `Las 3 verdades incómodas:\n\n1️⃣ Nadie vendrá a salvarte\n2️⃣ El tiempo no espera\n3️⃣ Solo tú puedes cambiar tu vida\n\n💡 Aceptarlas = Liberarte.\n\n✨ Tú tienes el control`,
                
                `Por qué la mayoría NO logra sus metas:\n\n❌ Solo planean\n❌ Esperan motivación\n❌ Se rinden rápido\n\n✅ Los que logran: EJECUTAN\n\n🎯 La acción vence el miedo.\n\n🔥 Empieza YA`,
                
                `El poder del 1% diario:\n\n• Día 1: +1%\n• 30 días: +30%\n• 365 días: 37X mejor\n\n📈 Pequeños cambios constantes.\n\n⚡ Compounding de vida.\n\n🚀 Imparable con tiempo`,
                
                `No necesitas ser perfecto:\n\nNecesitas:\n→ Empezar\n→ Ser constante\n→ Ajustar el camino\n→ No rendirte\n\n💪 Progreso > Perfección.\n\n✨ Da el primer paso HOY`,
                
                `La única competencia real:\n\n❌ NO es con otros\n✅ Es contigo ayer\n\n¿Eres mejor que ayer?\n¿Aprendiste algo nuevo?\n¿Diste un paso adelante?\n\n🎯 Eso es GANAR.\n\n🏆 Tú vs Tú`,
                
                `Lección que cambió mi vida:\n\n"Todo lo que quieres\nestá del otro lado del miedo"\n\n→ El miedo miente\n→ La acción libera\n→ El arrepentimiento duele más\n\n🔥 Hazlo con miedo.\n\n✨ Pero HAZLO`
            ]
        };

        return this.getUniqueItem(bodies[tema] || bodies.general, this.currentSessionUsed.bodies);
    }

    // ========================================
    // GENERADOR DE CTAs PODEROSOS (MEJORADO)
    // ========================================
    generatePowerfulCTA(tema, index) {
        const ctas = [
            `💬 COMENTA: ¿Ya lo sabías?\n🔄 GUARDA esto para después\n📤 COMPARTE con quien lo necesita`,
            
            `❓ Cuéntame en comentarios tu experiencia\n💾 Guarda este post (lo necesitarás)\n👥 Etiqueta a alguien que debe ver esto`,
            
            `✍️ COMENTA "YO" si te identificas\n❤️ LIKE si te sirvió\n📲 COMPARTE con tu comunidad`,
            
            `🔥 ¿Qué opinas? COMENTA\n⚡ Sígueme para más contenido así\n💬 Quiero leer tu opinión abajo`,
            
            `💭 TU TURNO: Comparte tu historia\n📸 GUARDA para aplicarlo\n🚀 TAG a quien necesita esto`,
            
            `🗣️ DIME en comentarios si funciona\n💾 Guárdalo, créeme\n🔁 Compártelo con alguien especial`,
            
            `💬 Cuéntame: ¿Te pasó algo similar?\n📲 Comparte si te ayudó\n⭐ Sígueme para más tips así`,
            
            `✨ COMENTA tu experiencia\n🔥 LIKE si aprendiste algo\n👇 Compártelo en tus historias`,
            
            `💡 ¿Conocías este dato? COMENTA\n📤 Envíalo a quien le sirva\n❤️ GUARDA para recordarlo`,
            
            `🎯 COMENTA "LISTO" si lo aplicarás\n💾 Guarda para consultarlo después\n🔄 Comparte el conocimiento`
        ];
        
        return this.getUniqueItem(ctas, this.currentSessionUsed.ctas);
    }

    // ========================================
    // SISTEMA ANTI-REPETICIÓN
    // ========================================
    getUniqueItem(array, usedSet) {
        // Filtrar items NO usados
        const available = array.filter(item => !usedSet.has(item));
        
        // Si todos fueron usados, resetear y usar todos de nuevo
        if (available.length === 0) {
            console.log('⚠️ Pool agotado, reseteando...');
            usedSet.clear();
            return this.getUniqueItem(array, usedSet);
        }
        
        // Selección aleatoria del pool disponible
        const randomIndex = Math.floor(Math.random() * available.length);
        const selectedItem = available[randomIndex];
        
        // Marcar como usado
        usedSet.add(selectedItem);
        
        return selectedItem;
    }

    // ========================================
    // HASHTAGS ESTRATÉGICOS
    // ========================================
    generateStrategicHashtags(tema, index) {
        const hashtags = {
            salud_mental: [
                ['#SaludMental', '#Bienestar', '#Mindfulness', '#Autocuidado', '#ViralTikTok'],
                ['#MenteSana', '#Ansiedad', '#Terapia', '#SelfCare', '#Viral2026'],
                ['#BienestarEmocional', '#CuidaTuMente', '#MentalHealth', '#TikTokViral', '#ContenidoDeValor'],
                ['#PsicologíaPositiva', '#BurnoutPrevention', '#MindfulLiving', '#ViralContent', '#SaludMentalImporta'],
                ['#Bienestar2026', '#MenteSanaVidaSana', '#TerapiaOnline', '#ViralWellness', '#CuidadoEmocional']
            ],
            fitness: [
                ['#Fitness', '#Gym', '#Workout', '#Transformación', '#FitTok'],
                ['#FitnessMotivation', '#Ejercicio', '#Músculo', '#ViralFitness', '#GymTok'],
                ['#FitLife', '#Entrenamiento', '#FitnessJourney', '#ViralGym', '#FitnessViral'],
                ['#GymMotivation', '#WorkoutRoutine', '#FitnessGoals', '#ViralWorkout', '#FitnessCommunity'],
                ['#TransformaciónFísica', '#GymLife', '#FitnessAddict', '#ViralTransformation', '#FitFam']
            ],
            ia_tecnologia: [
                ['#IA', '#InteligenciaArtificial', '#Tecnología', '#ChatGPT', '#TechTok'],
                ['#IAViral', '#Innovación', '#FuturoTech', '#AITikTok', '#TechViral'],
                ['#Tech2026', '#IA2026', '#TecnologíaViral', '#Innovation', '#ViralTech'],
                ['#ArtificialIntelligence', '#TechNews', '#FutureTech', '#ViralAI', '#TechTrends'],
                ['#AIRevolution', '#TechInnovation', '#FutureTechnology', '#ViralInnovation', '#AIFuture']
            ],
            comida: [
                ['#Comida', '#Recetas', '#Cocina', '#FoodTok', '#RecetasVirales'],
                ['#CocinaFácil', '#RecetasTikTok', '#ChefTok', '#FoodViral', '#ComidasRicas'],
                ['#Gastronomía', '#RecetaRápida', '#CocinaEnCasa', '#ViralFood', '#FoodiesOfTikTok'],
                ['#RecetasFáciles', '#FoodPorn', '#CocinaCreativa', '#ViralRecipes', '#FoodLovers'],
                ['#MealPrep', '#HealthyFood', '#CocinaDeliciosa', '#ViralCooking', '#FoodHacks']
            ],
            finanzas: [
                ['#Finanzas', '#Ahorro', '#Inversión', '#DineroInteligente', '#FinanzasTok'],
                ['#FinanzasPersonales', '#AhorroInteligente', '#InversiónViral', '#MoneyTok', '#FinanzasViral'],
                ['#EducaciónFinanciera', '#LibertadFinanciera', '#Inversiones2026', '#ViralFinanzas', '#DineroTok'],
                ['#FinanzasSmart', '#InvertirBien', '#AhorroEficaz', '#ViralMoney', '#WealthBuilding'],
                ['#FinanzasInteligentes', '#MoneyManagement', '#InversiónInteligente', '#ViralWealth', '#FinancialFreedom']
            ],
            general: [
                ['#Viral', '#Trending', '#TikTokViral', '#ContenidoDeCalidad', '#ParaTi'],
                ['#ViralTikTok', '#Tendencia2026', '#ContenidoViral', '#TikTok2026', '#Fyp'],
                ['#ParaTi2026', '#TendenciaViral', '#ContenidoÚtil', '#ViralContent', '#TikTokTrending'],
                ['#Viral2026', '#TrendingNow', '#ViralPost', '#ContentCreator', '#ForYou'],
                ['#ViralVideo', '#TrendingContent', '#ExplorePage', '#ViralTrend', '#ContentViral']
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
        
        return Math.min(100, base + bonus + Math.floor(Math.random() * 10));
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
            "❤️ Justo lo que necesitaba escuchar",
            "✨ Contenido de calidad",
            "🎯 Directo al punto, me encanta",
            "💪 Motivación pura"
        ];
        
        const negative = [
            "🤔 No estoy tan seguro de esto",
            "🙄 Muy fácil decirlo",
            "❌ Eso no funciona para todos",
            "😒 Otro más con lo mismo",
            "🤷 No me convence del todo",
            "👎 Muy genérico",
            "😴 Ya lo había escuchado"
        ];
        
        const constructive = [
            "💭 Interesante, pero falta profundizar",
            "📚 ¿Tienes fuentes de esto?",
            "🤝 Buen punto, agregaría que...",
            "✍️ Me gustaría saber más sobre...",
            "💡 También funciona hacer...",
            "🔍 ¿Podrías dar más detalles?",
            "📊 Sería bueno ver estadísticas"
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
            hook.replace(/🚨/g, '💀').replace(/NUNCA/g, 'JAMÁS'),
            hook.replace(/❌/g, '⚠️').replace(/NO/g, 'DEJA DE'),
            hook.replace(/🔥/g, '⚡').replace(/ESTO/g, 'ESTA ESTRATEGIA')
        ];
        
        for (let i = 0; i < Math.min(count + 1, alternativeHooks.length); i++) {
            variations.push({
                hook: alternativeHooks[i],
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
