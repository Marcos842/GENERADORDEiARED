// ========================================
// API DE INTELIGENCIA ARTIFICIAL
// Social Media AI Generator - VERSIÓN CORREGIDA
// ========================================

class AIService {
    constructor() {
        this.apiKey = null;
        this.usedVariations = new Set();
    }

    init() {
        const config = getStoredConfig();
        this.apiKey = config.openaiKey;
        console.log('✅ AI Service - Generador Profesional (FIXED)');
        return true;
    }

    async generateContent(idea, options = {}) {
        const { quantity = 1, tone = 'casual', formats = ['vertical'] } = options;

        console.log(`🎨 Generando EXACTAMENTE ${quantity} posts sobre: "${idea}"`);

        const posts = [];
        this.usedVariations.clear();
        
        // CORREGIDO: Generar la cantidad EXACTA que el usuario pidió
        for (let i = 0; i < quantity; i++) {
            // Usar un formato aleatorio de los seleccionados
            const format = formats[i % formats.length];
            const post = this.generateProfessionalContent(idea, tone, format, i);
            posts.push(post);
        }

        await this.delay(800);
        console.log(`✅ ${posts.length} posts generados (exactamente lo que pediste)`);
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
            psicologia: ['psicolog', 'mental', 'emoci', 'ansiedad', 'estres', 'terapia', 'cerebro', 'mente'],
            productividad: ['productiv', 'tiempo', 'organizacion', 'eficien', 'habitos', 'metas'],
            tecnologia: ['tecnolog', 'app', 'software', 'digital', 'programacion', 'ia', 'codigo'],
            negocios: ['negocio', 'emprendimiento', 'startup', 'ventas', 'marketing', 'empresa'],
            salud: ['salud', 'ejercicio', 'fitness', 'nutricion', 'dieta', 'bienestar'],
            educacion: ['educacion', 'aprender', 'estudio', 'enseñar', 'curso', 'tutorial'],
            motivacion: ['motivacion', 'inspiracion', 'exito', 'superacion', 'logros'],
            redes_sociales: ['redes sociales', 'instagram', 'tiktok', 'facebook', 'contenido', 'social media'],
            finanzas: ['dinero', 'ahorro', 'inversion', 'finanzas', 'presupuesto'],
            futbol: ['futbol', 'soccer', 'deporte', 'entrenamiento', 'jugador', 'tecnica']
        };

        for (const [topic, keywords] of Object.entries(topics)) {
            if (keywords.some(kw => idea.includes(kw))) return topic;
        }
        return 'general';
    }

    generateProfessionalTitle(idea, tone, tema, index) {
        const titles = {
            psicologia: [
                `💭 "Conocerse a uno mismo es el principio de toda sabiduría"`,
                `🧠 La verdad que nadie te dice sobre la mente humana`,
                `✨ El secreto de las personas emocionalmente inteligentes`,
                `🎯 Por qué tu cerebro te sabotea (y cómo evitarlo)`,
                `💡 La ciencia oculta detrás de tus pensamientos`,
                `🔮 Lo que los psicólogos no quieren que sepas`
            ],
            productividad: [
                `⚡ El método que cambió mi vida en 30 días`,
                `🚀 Por qué trabajas tanto y logras tan poco`,
                `💎 El secreto de las personas más productivas del mundo`,
                `🎯 Deja de perder tiempo: La fórmula definitiva`,
                `🔥 Multiplica tu productividad sin trabajar más horas`,
                `⏰ El sistema que usan los CEO para ser imparables`
            ],
            motivacion: [
                `💪 "El éxito no es el final, el fracaso no es fatal"`,
                `🔥 La diferencia entre soñar y lograr`,
                `⚡ Por qué las personas exitosas piensan diferente`,
                `✨ El secreto que cambió mi mentalidad para siempre`,
                `🎯 No es talento, es disciplina`,
                `🌟 Tu mente es tu única limitación`
            ],
            general: [
                `💡 La verdad que necesitas escuchar hoy`,
                `✨ Esto cambiará tu perspectiva para siempre`,
                `🎯 Lo que nadie te dice sobre el éxito`,
                `🔥 El secreto está en tu mentalidad`,
                `💭 Una verdad incómoda pero necesaria`,
                `🚀 Deja de buscar excusas y empieza a actuar`
            ]
        };

        const temaList = titles[tema] || titles.general;
        return temaList[index % temaList.length];
    }

    generateProfessionalBody(idea, tone, tema, index) {
        const contents = {
            psicologia: [
                // POST 1
                `"Conocerse a uno mismo es el principio de toda sabiduría." — Aristóteles\n\n🧠 La autoconciencia no es un destino, es un viaje continuo.\n\nLo que descubrí:\n→ Tus pensamientos no son hechos\n→ Las emociones son mensajeros, no enemigos\n→ El autoconocimiento es tu superpoder\n\n💬 ¿Cuándo fue la última vez que te preguntaste: "¿Qué siento realmente?"`,
                
                // POST 2
                `"No vemos las cosas como son, las vemos como somos nosotros." — Anónimo\n\n🎭 Cada persona percibe la realidad desde sus propias heridas, miedos y esperanzas.\n\nPor eso:\n✓ Dos personas viven la misma situación de forma diferente\n✓ Tu pasado influye en cómo interpretas el presente\n✓ Cambiar tu mirada, cambia tu realidad\n\n💭 ¿Estás viendo la situación real o tu interpretación de ella?`,
                
                // POST 3
                `"Aquello a lo que te resistes, persiste." — Carl Jung\n\n⚠️ Huir de tus emociones no las elimina, las amplifica.\n\nLo que Jung descubrió:\n• Negar el dolor lo convierte en sufrimiento\n• Aceptar no significa resignarse\n• La integración de la sombra te libera\n\n🔓 La sanación comienza cuando dejas de huir de ti mismo.`,
                
                // POST 4
                `"El sí mismo no es algo que uno encuentra, sino algo que uno crea." — Thomas Szasz\n\n🎨 No estás buscando "tu verdadero yo".\nEstás construyéndolo cada día.\n\nLa diferencia:\n→ No eres tus circunstancias\n→ Eres tus decisiones\n→ Cada elección te define\n\n💪 Deja de buscar quién eres y empieza a crear quien quieres ser.`,
                
                // POST 5
                `"La buena vida es un proceso, no un estado del ser." — Carl Rogers\n\n🌱 No existe un punto de llegada llamado "felicidad permanente".\n\nLa verdad:\n✨ La vida es una serie de momentos\n✨ El crecimiento nunca termina\n✨ La imperfección es parte del proceso\n\n💬 ¿Y si dejas de buscar la perfección y empiezas a vivir el presente?`,
                
                // POST 6
                `"Lo que niegas te somete, lo que aceptas te transforma." — Carl Jung\n\n🔄 La paradoja del cambio:\nSolo puedes transformar lo que primero aceptas.\n\nPor qué funciona:\n→ La resistencia alimenta el problema\n→ La aceptación crea espacio para el cambio\n→ La transformación nace de la compasión\n\n🦋 Acepta donde estás para llegar donde quieres.`,
                
                // POST 7
                `"Mis errores no me definen, mi capacidad de levantarme sí." — Anónimo\n\n💪 El fracaso no es el final, es información.\n\nCambia tu perspectiva:\n• Error = Aprendizaje\n• Caída = Oportunidad de levantarte más fuerte\n• Fracaso = Paso hacia el éxito\n\n🔥 No es cuántas veces caes, es cuántas te levantas.`,
                
                // POST 8
                `"La mente es como un paracaídas: solo funciona si se abre." — Albert Einstein\n\n🧠 Una mente cerrada es una prisión autoimpuesta.\n\nCómo abrirla:\n→ Cuestiona tus creencias\n→ Escucha perspectivas diferentes\n→ Acepta que puedes estar equivocado\n\n✨ La flexibilidad mental es inteligencia.`,
                
                // POST 9
                `"La confianza más valiosa es la que debemos tener en nosotros mismos." — Anónimo\n\n🎯 Nadie vendrá a salvarte.\nTú eres tu propio héroe.\n\nDesarrolla autoconfianza:\n✓ Cumple las promesas que te haces\n✓ Celebra tus pequeñas victorias\n✓ Aprende de tus errores sin juzgarte\n\n💎 La confianza se construye, no se encuentra.`,
                
                // POST 10
                `"La aceptación no es resignación, sino el primer paso hacia el aprendizaje." — Anónimo\n\n🌊 Acepta la realidad actual sin juzgarla.\n\nNo es rendirse, es:\n• Reconocer lo que ES\n• Dejar de luchar contra lo inevitable\n• Crear espacio para el cambio real\n\n🦋 La transformación comienza con la aceptación.`
            ],

            productividad: [
                `⚡ El 80% de tus resultados viene del 20% de tus acciones.\n\nLey de Pareto aplicada:\n\n🎯 Identifica ese 20% crítico\n🎯 Elimina el 80% de ruido\n🎯 Enfócate como un láser\n\nResultado:\n→ Menos esfuerzo\n→ Más impacto\n→ Mayor libertad\n\n💬 ¿Estás trabajando duro o trabajando inteligente?`,
                
                `🚀 Los más exitosos no hacen más cosas.\nHacen menos cosas, pero mejor.\n\nLa trampa de la productividad:\n❌ Hacer 10 cosas mal\n✅ Hacer 3 cosas excelente\n\nCambia tu enfoque:\n→ Calidad > Cantidad\n→ Profundidad > Amplitud\n→ Impacto > Actividad\n\n⚡ Menos es más cuando se trata de lo correcto.`,
                
                `💎 "No es lo que haces ocasionalmente lo que te define, es lo que haces consistentemente."\n\nSistema > Motivación\n\nPor qué:\n• La motivación es temporal\n• Los sistemas son permanentes\n• Los hábitos superan la fuerza de voluntad\n\n🔥 Crea sistemas que funcionen incluso cuando no tengas ganas.`,
                
                `⏰ "El tiempo es lo más valioso que tienes. Gástalo sabiamente."\n\nTécnica de bloqueo de tiempo:\n\n📍 Divide tu día en bloques\n📍 Asigna tareas específicas\n📍 Elimina interrupciones\n\n💡 Tu calendario = Tu vida. Protégelo.`,
                
                `🔥 La regla de los 2 minutos:\n\nSi toma menos de 2 minutos, hazlo ahora.\n\nBeneficios:\n→ Evita acumulación de tareas pequeñas\n→ Genera momentum\n→ Libera tu mente\n\n⚡ Las pequeñas acciones inmediatas crean grandes resultados.`
            ],

            motivacion: [
                `💪 "El éxito no es el final, el fracaso no es fatal: es el coraje para continuar lo que cuenta." — Churchill\n\nLa verdad:\n→ El fracaso es feedback\n→ El éxito es un momento\n→ La constancia es el verdadero triunfo\n\n🔥 Levántate una vez más de las que caes.`,
                
                `⚡ Tus pensamientos crean tu realidad.\nTus palabras crean tu destino.\nTus acciones crean tu vida.\n\nLa fórmula:\n1. Cambia tus pensamientos\n2. Cambia tus palabras\n3. Cambia tus acciones\n4. Cambia tu vida\n\n💬 ¿Qué estás creando hoy?`,
                
                `🎯 "La disciplina es el puente entre metas y logros." — Jim Rohn\n\nNo es talento.\nNo es suerte.\nNo es conexiones.\n\nEs levantarte cada día y hacer el trabajo.\n\n💪 La disciplina supera la motivación 100 veces.`,
                
                `🔥 "No esperes el momento perfecto. Crea el momento perfecto."\n\nLa diferencia entre soñar y lograr:\n→ Acción\n→ Constancia\n→ Decisión\n\n💪 Empieza ahora, perfecciona en el camino.`,
                
                `✨ "Tu única limitación es la que tú mismo te impones."\n\nRompe tus límites:\n• Cuestiona tus creencias limitantes\n• Sal de tu zona de confort\n• Actúa a pesar del miedo\n\n🚀 El potencial está dentro de ti.`
            ],

            general: [
                `💡 "Lo que haces hoy puede mejorar todos tus mañanas." — Ralph Marston\n\nCada acción cuenta.\nCada decisión importa.\nCada día es una nueva oportunidad.\n\n✨ El futuro se construye en el presente.`,
                
                `🔥 No esperes el momento perfecto.\nCrea el momento perfecto.\n\nLa diferencia entre soñar y lograr:\n→ Acción\n→ Constancia\n→ Decisión\n\n💪 Empieza ahora.`,
                
                `✨ "El mejor momento para plantar un árbol fue hace 20 años.\nEl segundo mejor momento es ahora." — Proverbio chino\n\n⏰ Deja de postergar tu vida.`,
                
                `🎯 "El cambio es difícil al principio, caótico en el medio y hermoso al final."\n\nNo te rindas en medio del caos.\n\n💪 La transformación toma tiempo.`,
                
                `💭 "La vida no se trata de encontrarte a ti mismo, se trata de crearte a ti mismo."\n\nEres el artista de tu propia vida.\n\n🎨 ¿Qué vas a crear hoy?`
            ]
        };

        const temaContents = contents[tema] || contents.general;
        return temaContents[index % temaContents.length];
    }

    generateStrategicHashtags(tema, index) {
        const hashtags = {
            psicologia: [
                ['#Psicología', '#SaludMental', '#Autoconocimiento', '#CrecimientoPersonal', '#InteligenciaEmocional'],
                ['#Mindfulness', '#Terapia', '#BienestarEmocional', '#DesarrolloPersonal', '#MenteSana'],
                ['#PsicologíaPositiva', '#Conciencia', '#Emociones', '#Autoestima', '#SaludEmocional'],
                ['#Neurociencia', '#ComportamientoHumano', '#Psique', '#Autoayuda', '#Bienestar'],
                ['#CarlJung', '#Psicoanálisis', '#TransformaciónPersonal', '#SaludMental', '#Crecimiento'],
                ['#FilosofíaDeVida', '#Reflexiones', '#DesarrolloHumano', '#Consciencia', '#Sabiduría'],
                ['#Autoconfianza', '#Empoderamiento', '#SaludMental', '#Resiliencia', '#Fortaleza'],
                ['#MenteAbierta', '#Flexibilidad', '#Aprendizaje', '#Crecimiento', '#Evolución'],
                ['#Confianza', '#Autoaceptación', '#Amor Propio', '#SaludMental', '#Bienestar'],
                ['#Aceptación', '#Transformación', '#SanaciónEmocional', '#Paz', '#Equilibrio']
            ],
            productividad: [
                ['#Productividad', '#GestiónDelTiempo', '#Eficiencia', '#Enfoque', '#AltoRendimiento'],
                ['#ProductividadPersonal', '#HábitosProductivos', '#TiempoEsOro', '#Organización', '#Éxito'],
                ['#SistemaDeProductividad', '#TrabajoInteligente', '#Resultados', '#Disciplina', '#Logros'],
                ['#BloqueoDeTiempo', '#GestiónEficaz', '#Prioridades', '#Enfoque', '#Productividad'],
                ['#ReglaDe2Minutos', '#AcciónInmediata', '#Productividad', '#Eficiencia', '#Momentum']
            ],
            motivacion: [
                ['#Motivación', '#Inspiración', '#Éxito', '#CrecimientoPersonal', '#Mentalidad'],
                ['#MotivaciónDiaria', '#Superación', '#MentalidadDeÉxito', '#Determinación', '#Logros'],
                ['#Disciplina', '#Constancia', '#Perseverancia', '#Éxito', '#Mentalidad'],
                ['#AcciónAhora', '#NoExcusas', '#Motivación', '#Determinación', '#Éxito'],
                ['#SinLímites', '#Potencial', '#Empoderamiento', '#Motivación', '#Transformación']
            ],
            general: [
                ['#DesarrolloPersonal', '#Crecimiento', '#Motivación', '#Inspiración', '#Cambio'],
                ['#CrecimientoPersonal', '#TransformaciónPersonal', '#Mentalidad', '#Éxito', '#Vida'],
                ['#Reflexiones', '#DesarrolloHumano', '#Sabiduría', '#Aprendizaje', '#Evolución'],
                ['#Transformación', '#Cambio', '#CrecimientoPersonal', '#Evolución', '#Progreso'],
                ['#CreaciónPersonal', '#Propósito', '#Vida', '#Decisiones', '#Futuro']
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
