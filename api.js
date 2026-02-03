// ========================================
// API DE INTELIGENCIA ARTIFICIAL
// Social Media AI Generator - NICHOS 2026
// ========================================

class AIService {
    constructor() {
        this.apiKey = null;
        this.usedVariations = new Set();
    }

    init() {
        const config = getStoredConfig();
        this.apiKey = config.openaiKey;
        console.log('✅ AI Service - Nichos Populares 2026 Cargados');
        return true;
    }

    async generateContent(idea, options = {}) {
        const { quantity = 1, tone = 'casual', formats = ['vertical'] } = options;

        console.log(`🎨 Generando EXACTAMENTE ${quantity} posts sobre: "${idea}"`);

        const posts = [];
        this.usedVariations.clear();
        
        for (let i = 0; i < quantity; i++) {
            const format = formats[i % formats.length];
            const post = this.generateProfessionalContent(idea, tone, format, i);
            posts.push(post);
        }

        await this.delay(800);
        console.log(`✅ ${posts.length} posts generados`);
        return posts;
    }

    generateProfessionalContent(idea, tone, format, index) {
        const ideaLower = idea.toLowerCase();
        const tema = this.detectTopic(ideaLower);
        
        return {
            titulo: this.generateProfessionalTitle(idea, tone, tema, index),
            contenido: this.generateProfessionalBody(idea, tone, tema, index),
            hashtags: this.generateStrategicHashtags(tema, index),
            tone: tone,
            format: format,
            created_at: new Date().toISOString()
        };
    }

    detectTopic(idea) {
        const topics = {
            // TOP NICHOS 2026
            salud_mental: ['salud mental', 'bienestar', 'ansiedad', 'estres', 'mindfulness', 'autocuidado', 'terapia', 'emociones'],
            fitness: ['fitness', 'gym', 'ejercicio', 'musculo', 'peso', 'entrenamiento', 'workout', 'transformacion'],
            ia_tecnologia: ['ia', 'inteligencia artificial', 'tecnologia', 'app', 'software', 'gadget', 'innovacion', 'chatgpt'],
            comida: ['comida', 'receta', 'cocina', 'chef', 'gastronomia', 'food', 'plato', 'ingrediente'],
            finanzas: ['finanzas', 'dinero', 'ahorro', 'inversion', 'crypto', 'trading', 'presupuesto', 'economia'],
            viajes: ['viaje', 'turismo', 'destino', 'aventura', 'viajar', 'mochilero', 'travel', 'pais'],
            moda: ['moda', 'outfit', 'estilo', 'ropa', 'fashion', 'tendencia', 'look', 'vestir'],
            diy: ['diy', 'manualidad', 'craft', 'proyecto', 'hacer', 'tutorial', 'paso a paso'],
            mascotas: ['mascota', 'perro', 'gato', 'animal', 'pet', 'cachorro', 'veterinaria'],
            gaming: ['gaming', 'videojuego', 'gamer', 'juego', 'esport', 'stream', 'twitch'],
            sustentabilidad: ['sustentabilidad', 'ecologico', 'verde', 'reciclaje', 'planeta', 'ambiente', 'eco'],
            educacion: ['educacion', 'aprender', 'tutorial', 'curso', 'enseñar', 'estudio', 'clase'],
            entretenimiento: ['meme', 'humor', 'comedia', 'divertido', 'risa', 'viral', 'trend'],
            emprendimiento: ['emprendimiento', 'negocio', 'startup', 'freelance', 'side hustle', 'monetizar'],
            hogar: ['hogar', 'decoracion', 'casa', 'deco', 'interior', 'diseño', 'mueble'],
            
            // CLÁSICOS
            productividad: ['productividad', 'tiempo', 'organizacion', 'eficiencia', 'habitos', 'metas'],
            motivacion: ['motivacion', 'inspiracion', 'exito', 'superacion', 'logros', 'mentalidad']
        };

        for (const [topic, keywords] of Object.entries(topics)) {
            if (keywords.some(kw => idea.includes(kw))) return topic;
        }
        return 'general';
    }

    generateProfessionalTitle(idea, tone, tema, index) {
        const titles = {
            salud_mental: [
                `🧠 Por qué cuidar tu salud mental ya no es opcional`,
                `✨ 3 técnicas de mindfulness que cambiarán tu día`,
                `💭 Lo que nadie te dice sobre la ansiedad`,
                `🌱 Autocuidado: No es egoísmo, es supervivencia`,
                `🧘 Cómo resetear tu mente en 5 minutos`
            ],
            fitness: [
                `💪 Mi transformación fitness en 90 días`,
                `🔥 5 ejercicios que queman más calorías que correr`,
                `🏋️ Por qué no ves resultados en el gym`,
                `⚡ El secreto de las personas que SÍ logran su cuerpo ideal`,
                `🎯 Fitness sin excusas: La guía definitiva`
            ],
            ia_tecnologia: [
                `🤖 Cómo la IA está cambiando TODO en 2026`,
                `📱 Gadgets que necesitas este año`,
                `💻 ChatGPT vs otras IAs: ¿Cuál elegir?`,
                `⚡ Tecnología que parece del futuro pero ya existe`,
                `🔮 5 apps de IA que debes probar HOY`
            ],
            comida: [
                `🍜 Receta viral que TIENES que probar`,
                `👨‍🍳 Cómo cocinar como un chef en 15 minutos`,
                `🥗 Meal prep saludable para toda la semana`,
                `🔥 El secreto de los restaurantes revelado`,
                `🍕 Trucos de cocina que cambiarán tu vida`
            ],
            finanzas: [
                `💰 Cómo ahorré $10,000 en 6 meses`,
                `📈 Invertir para principiantes: Guía 2026`,
                `💳 Los errores financieros que te mantienen pobre`,
                `🤑 Side hustles que SÍ funcionan`,
                `📊 Finanzas personales: Lo que NO te enseñaron`
            ],
            viajes: [
                `✈️ Viajé a 10 países con $2000`,
                `🌍 Destinos baratos que parecen caros`,
                `🎒 Guía completa para mochileros principiantes`,
                `🏝️ Paraísos escondidos que nadie conoce`,
                `📸 Tips para viajar y crear contenido épico`
            ],
            moda: [
                `👗 Outfits trendy sin gastar de más`,
                `✨ Cómo encontrar tu estilo personal`,
                `🔥 Tendencias 2026 que SÍ vale la pena seguir`,
                `👟 Combos de ropa que siempre funcionan`,
                `💎 Moda sostenible: Se ve bien, hace bien`
            ],
            diy: [
                `🎨 DIY que parece profesional pero es fácil`,
                `✂️ Transforma tu cuarto con $50`,
                `🔨 Proyectos DIY para el fin de semana`,
                `💡 Ideas creativas para decorar gastando poco`,
                `🎁 Regalos hechos a mano que impresionan`
            ],
            mascotas: [
                `🐶 Lo que tu perro intenta decirte`,
                `🐱 Mitos sobre gatos que debes dejar de creer`,
                `🐾 Cuidados esenciales que todo dueño debe saber`,
                `❤️ La ciencia detrás del amor de tu mascota`,
                `😂 Fails de mascotas que te harán el día`
            ],
            gaming: [
                `🎮 Los mejores juegos de 2026 hasta ahora`,
                `🏆 Cómo mejorar tu aim en FPS`,
                `💰 Cómo vivir del gaming (guía real)`,
                `🕹️ Setup gamer con presupuesto`,
                `🔥 Estrategias pro que cambian el juego`
            ],
            sustentabilidad: [
                `🌱 Pequeños cambios, gran impacto ambiental`,
                `♻️ Cómo reducir tu huella de carbono HOY`,
                `🌍 Vida eco-friendly sin morir en el intento`,
                `💚 Productos sustentables que realmente funcionan`,
                `🌿 Ser verde está de moda (y es necesario)`
            ],
            educacion: [
                `📚 Aprende esto en 2026 y agrádeceme después`,
                `🎓 Cursos gratis que valen más que una carrera`,
                `💡 Cómo aprender cualquier cosa 10x más rápido`,
                `🧠 Técnicas de estudio respaldadas por ciencia`,
                `📖 Skills del futuro que debes dominar`
            ],
            entretenimiento: [
                `😂 El meme que resume febrero 2026`,
                `🔥 Trends de TikTok que tienes que conocer`,
                `💀 Plot twist que nadie vio venir`,
                `🎬 Series y películas que están rompiendo`,
                `🤣 Humor del internet que solo los de 2026 entenderán`
            ],
            emprendimiento: [
                `💼 Cómo empecé mi negocio con $100`,
                `📱 Monetiza tu contenido en 2026`,
                `🚀 De 0 a 10k seguidores: Mi estrategia`,
                `💰 Side hustles que generan ingresos pasivos`,
                `🎯 Emprender sin renunciar a tu trabajo`
            ],
            hogar: [
                `🏡 Transforma tu espacio con poco presupuesto`,
                `🛋️ Tendencias de decoración 2026`,
                `✨ Trucos de diseñadores de interiores`,
                `🎨 DIY home decor que parece caro`,
                `💡 Ideas para espacios pequeños`
            ],
            productividad: [
                `⚡ Cómo hago en 4 horas lo que otros en 8`,
                `🎯 El método que multiplicó mi productividad`,
                `📊 Apps de productividad que SÍ funcionan`,
                `🔥 Elimina distracciones de una vez por todas`,
                `💪 Productividad sin burnout`
            ],
            motivacion: [
                `💪 Deja de postergar tu vida`,
                `🔥 La motivación que necesitas HOY`,
                `✨ Tu única limitación eres tú mismo`,
                `🎯 El fracaso es parte del éxito`,
                `⚡ Actúa ahora, agradécete después`
            ],
            general: [
                `💡 Lo que necesitas escuchar hoy`,
                `✨ Esto cambiará tu perspectiva`,
                `🎯 Una verdad incómoda pero necesaria`,
                `🔥 El secreto está en tu mentalidad`,
                `🚀 Deja de buscar excusas`
            ]
        };

        const temaList = titles[tema] || titles.general;
        return temaList[index % temaList.length];
    }

    generateProfessionalBody(idea, tone, tema, index) {
        const contents = {
            salud_mental: [
                `Tu salud mental es tan importante como la física.\n\nDatos 2026:\n→ 1 de cada 3 personas sufre ansiedad\n→ El burnout es oficial enfermedad\n→ Mindfulness reduce estrés en 40%\n\n💡 Cuida tu mente = Cuida tu vida\n\n🧠 ¿Cómo está tu salud mental hoy?`,
                
                `La ansiedad no es debilidad.\nEs tu cuerpo pidiendo atención.\n\nSeñales:\n✓ Pensamientos acelerados\n✓ Tensión muscular\n✓ Problemas para dormir\n\n🌱 Pedir ayuda es fortaleza.\n\n💭 No estás solo en esto.`,
                
                `Mindfulness de 5 minutos:\n\n1. Cierra los ojos\n2. Respira profundo (4-7-8)\n3. Observa sin juzgar\n4. Vuelve al presente\n\n🧘 Practica diario.\n\n✨ Tu mente te lo agradecerá.`
            ],
            
            fitness: [
                `No necesitas un gym caro.\nNecesitas constancia.\n\nMi rutina:\n→ 30 min diarios\n→ 0 equipo\n→ 100% resultados\n\n💪 En 90 días cambié mi vida.\n\n🔥 ¿Empezamos hoy?`,
                
                `Los 5 ejercicios definitivos:\n\n1. Burpees (cuerpo completo)\n2. Planchas (core)\n3. Sentadillas (piernas)\n4. Flexiones (pecho)\n5. Mountain climbers (cardio)\n\n⚡ 15 min = Todo lo que necesitas\n\n💪 Sin excusas.`,
                
                `Por qué no ves resultados:\n\n❌ Entrenar random\n❌ No descansar\n❌ Mala nutrición\n\n✅ Plan estructurado\n✅ Dormir 7-8h\n✅ Déficit calórico\n\n🎯 La constancia vence talento.`
            ],
            
            ia_tecnologia: [
                `La IA en 2026 es OTRA COSA.\n\nLo que puedes hacer:\n→ Generar videos con texto\n→ Clonar tu voz\n→ Automatizar tareas\n→ Crear arte en segundos\n\n🤖 El futuro es HOY.\n\n💻 ¿Ya usas IA?`,
                
                `Gadgets 2026 que necesitas:\n\n1. Auriculares con IA traductor\n2. Reloj con monitoreo avanzado\n3. Gafas AR para trabajo\n4. Cargador inalámbrico universal\n\n📱 Tecnología que mejora tu vida.\n\n⚡ Invierte en ti.`,
                
                `ChatGPT vs Claude vs Gemini:\n\nChatGPT: Creativo, conversacional\nClaude: Análisis profundo\nGemini: Multimodal\n\n🔥 Usa los 3 según necesidad.\n\n🤖 La IA es tu asistente personal.`
            ],
            
            comida: [
                `Receta viral: Pasta Feta TikTok\n\nIngredientes:\n• Tomates cherry\n• Queso feta\n• Pasta\n• Ajo + aceite oliva\n\n👨‍🍳 Horno 30 min, mezcla y ¡listo!\n\n🔥 Sabor increíble.\n\n🍝 ¿Ya la probaste?`,
                
                `Meal prep domingo:\n\nPreparas:\n→ Pollo al horno x4\n→ Arroz x4\n→ Verduras x4\n\n📦 Separas en tuppers\n💰 Ahorras tiempo y dinero\n\n🥗 Come sano toda la semana.`,
                
                `Trucos de chef profesional:\n\n1. Sal al final (resalta sabor)\n2. Ajo picado vs prensado (diferente intensidad)\n3. Descansar la carne (jugosa)\n4. Mise en place (todo listo antes)\n\n👨‍🍳 Cocina como pro.`
            ],
            
            finanzas: [
                `Cómo ahorré $10,000 en 6 meses:\n\n1. Presupuesto estricto 50/30/20\n2. Eliminar suscripciones\n3. Comida casera\n4. Ingresos extra (freelance)\n\n💰 Disciplina > Motivación\n\n📈 Tu yo futuro te agradecerá.`,
                
                `Invertir 101 (2026):\n\n→ Fondos indexados (bajo riesgo)\n→ Crypto (alto riesgo)\n→ Bienes raíces (largo plazo)\n\n📊 Diversifica siempre.\n💡 Invierte lo que puedas perder.\n\n🚀 Empieza HOY.`,
                
                `Errores que te mantienen pobre:\n\n❌ Gastar antes de ahorrar\n❌ Deudas de tarjetas\n❌ No tener fondo de emergencia\n\n✅ Ahorra primero\n✅ Paga deudas\n✅ 6 meses de gastos guardados\n\n💰 Educación financiera es poder.`
            ],
            
            viajes: [
                `Viajé a 10 países con $2000:\n\nTrucos:\n→ Vuelos low-cost\n→ Hostales\n→ Comida local\n→ Caminar (no taxis)\n\n✈️ Viajar barato SÍ es posible.\n\n🌍 La experiencia no tiene precio.`,
                
                `Destinos baratos 2026:\n\n1. 🇻🇳 Vietnam ($30/día)\n2. 🇵🇹 Portugal ($50/día)\n3. 🇲🇽 México ($40/día)\n4. 🇹🇭 Tailandia ($35/día)\n\n🏝️ Paraísos accesibles.\n\n✈️ ¿Cuál visitarás?`,
                
                `Mochilero principiante:\n\n✓ Mochila 40L (no maleta)\n✓ Seguro de viaje\n✓ Tarjeta sin comisiones\n✓ Apps: Maps.me, Hostelworld\n\n🎒 Menos es más.\n\n🌏 La aventura te espera.`
            ],
            
            // Continúa para todos los demás temas...
            
            general: [
                `Lo que haces hoy define tu mañana.\n\nCada decisión cuenta.\nCada acción importa.\n\nNo postergues tu vida.\n\n✨ El momento es AHORA.`,
                
                `La diferencia entre soñar y lograr:\n\n→ Acción\n→ Constancia\n→ Disciplina\n\n💪 Deja de planear.\nEmpieza a ejecutar.\n\n🔥 Tu futuro te espera.`
            ]
        };

        const temaContents = contents[tema] || contents.general;
        return temaContents[index % temaContents.length];
    }

    generateStrategicHashtags(tema, index) {
        const hashtags = {
            salud_mental: [
                ['#SaludMental', '#Bienestar', '#Mindfulness', '#Autocuidado', '#MenteSana']
            ],
            fitness: [
                ['#Fitness', '#Gym', '#Workout', '#Transformación', '#FitnessMotivation']
            ],
            ia_tecnologia: [
                ['#IA', '#Tecnología', '#ChatGPT', '#Innovación', '#TechTok']
            ],
            comida: [
                ['#Comida', '#Recetas', '#Cocina', '#FoodTok', '#Gastronomía']
            ],
            finanzas: [
                ['#Finanzas', '#Ahorro', '#Inversión', '#DineroInteligente', '#FinanzasPersonales']
            ],
            viajes: [
                ['#Viajes', '#Travel', '#Aventura', '#Mochilero', '#ViajarBarato']
            ],
            moda: [
                ['#Moda', '#Fashion', '#Outfit', '#Estilo', '#Tendencias2026']
            ],
            diy: [
                ['#DIY', '#Manualidades', '#HazloTuMismo', '#Craft', '#ProyectosDIY']
            ],
            mascotas: [
                ['#Mascotas', '#Perros', '#Gatos', '#PetLovers', '#Animales']
            ],
            gaming: [
                ['#Gaming', '#Gamer', '#Videojuegos', '#Esports', '#GamingCommunity']
            ],
            sustentabilidad: [
                ['#Sustentabilidad', '#Ecológico', '#VidaVerde', '#CuidaElPlaneta', '#EcoFriendly']
            ],
            educacion: [
                ['#Educación', '#Aprender', '#Tutorial', '#Conocimiento', '#Skills2026']
            ],
            entretenimiento: [
                ['#Memes', '#Humor', '#Viral', '#TikTok', '#Entretenimiento']
            ],
            emprendimiento: [
                ['#Emprendimiento', '#Negocios', '#Startup', '#SideHustle', '#Monetizar']
            ],
            hogar: [
                ['#HomeDecor', '#Decoración', '#Hogar', '#InteriorDesign', '#Casa']
            ],
            productividad: [
                ['#Productividad', '#Eficiencia', '#Organización', '#TimeManagement', '#Hábitos']
            ],
            motivacion: [
                ['#Motivación', '#Inspiración', '#Éxito', '#Mentalidad', '#CrecimientoPersonal']
            ],
            general: [
                ['#Viral', '#Trending', '#Contenido', '#RedesSociales', '#2026']
            ]
        };

        const temaHashtags = hashtags[tema] || hashtags.general;
        return temaHashtags[index % temaHashtags.length];
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Instancia global
const aiService = new AIService();
