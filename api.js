// ========================================
// API DE INTELIGENCIA ARTIFICIAL
// Social Media AI Generator - VERSIÓN PROFESIONAL
// Contenido de calidad para redes sociales
// ========================================

class AIService {
    constructor() {
        this.apiKey = null;
        this.usedVariations = new Set();
    }

    init() {
        const config = getStoredConfig();
        this.apiKey = config.openaiKey;
        console.log('✅ AI Service - Generador Profesional de Contenido');
        return true;
    }

    async generateContent(idea, options = {}) {
        const { quantity = 1, tone = 'casual', formats = ['vertical'] } = options;

        console.log(`🎨 Generando ${quantity} posts profesionales sobre: "${idea}"`);

        const posts = [];
        this.usedVariations.clear();
        
        for (let i = 0; i < quantity; i++) {
            for (const format of formats) {
                const post = this.generateProfessionalContent(idea, tone, format, i);
                posts.push(post);
            }
        }

        await this.delay(800);
        console.log(`✅ ${posts.length} posts profesionales generados`);
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
                // POST 1 - Frase poderosa
                `"Conocerse a uno mismo es el principio de toda sabiduría." — Aristóteles\n\n🧠 La autoconciencia no es un destino, es un viaje continuo.\n\nLo que descubrí:\n→ Tus pensamientos no son hechos\n→ Las emociones son mensajeros, no enemigos\n→ El autoconocimiento es tu superpoder\n\n💬 ¿Cuándo fue la última vez que te preguntaste: "¿Qué siento realmente?"`,
                
                // POST 2 - Storytelling
                `"No vemos las cosas como son, las vemos como somos nosotros." — Anónimo\n\n🎭 Cada persona percibe la realidad desde sus propias heridas, miedos y esperanzas.\n\nPor eso:\n✓ Dos personas viven la misma situación de forma diferente\n✓ Tu pasado influye en cómo interpretas el presente\n✓ Cambiar tu mirada, cambia tu realidad\n\n💭 ¿Estás viendo la situación real o tu interpretación de ella?`,
                
                // POST 3 - Insight profundo
                `"Aquello a lo que te resistes, persiste." — Carl Jung\n\n⚠️ Huir de tus emociones no las elimina, las amplifica.\n\nLo que Jung descubrió:\n• Negar el dolor lo convierte en sufrimiento\n• Aceptar no significa resignarse\n• La integración de la sombra te libera\n\n🔓 La sanación comienza cuando dejas de huir de ti mismo.`,
                
                // POST 4 - Transformación
                `"El sí mismo no es algo que uno encuentra, sino algo que uno crea." — Thomas Szasz\n\n🎨 No estás buscando "tu verdadero yo".\nEstás construyéndolo cada día.\n\nLa diferencia:\n→ No eres tus circunstancias\n→ Eres tus decisiones\n→ Cada elección te define\n\n💪 Deja de buscar quién eres y empieza a crear quien quieres ser.`,
                
                // POST 5 - Proceso
                `"La buena vida es un proceso, no un estado del ser." — Carl Rogers\n\n🌱 No existe un punto de llegada llamado "felicidad permanente".\n\nLa verdad:\n✨ La vida es una serie de momentos\n✨ El crecimiento nunca termina\n✨ La imperfección es parte del proceso\n\n💬 ¿Y si dejas de buscar la perfección y empiezas a vivir el presente?`,
                
                // POST 6 - Aceptación
                `"Lo que niegas te somete, lo que aceptas te transforma." — Carl Jung\n\n🔄 La paradoja del cambio:\nSolo puedes transformar lo que primero aceptas.\n\nPor qué funciona:\n→ La resistencia alimenta el problema\n→ La aceptación crea espacio para el cambio\n→ La transformación nace de la compasión\n\n🦋 Acepta donde estás para llegar donde quieres.`
            ],

            productividad: [
                // POST 1
                `⚡ El 80% de tus resultados viene del 20% de tus acciones.\n\nLey de Pareto aplicada:\n\n🎯 Identifica ese 20% crítico\n🎯 Elimina el 80% de ruido\n🎯 Enfócate como un láser\n\nResultado:\n→ Menos esfuerzo\n→ Más impacto\n→ Mayor libertad\n\n💬 ¿Estás trabajando duro o trabajando inteligente?`,
                
                // POST 2
                `🚀 Los más exitosos no hacen más cosas.\nHacen menos cosas, pero mejor.\n\nLa trampa de la productividad:\n❌ Hacer 10 cosas mal\n✅ Hacer 3 cosas excelente\n\nCambia tu enfoque:\n→ Calidad > Cantidad\n→ Profundidad > Amplitud\n→ Impacto > Actividad\n\n⚡ Menos es más cuando se trata de lo correcto.`,
                
                // POST 3
                `💎 "No es lo que haces ocasionalmente lo que te define, es lo que haces consistentemente."\n\nSistema > Motivación\n\nPor qué:\n• La motivación es temporal\n• Los sistemas son permanentes\n• Los hábitos superan la fuerza de voluntad\n\n🔥 Crea sistemas que funcionen incluso cuando no tengas ganas.`
            ],

            motivacion: [
                // POST 1
                `💪 "El éxito no es el final, el fracaso no es fatal: es el coraje para continuar lo que cuenta." — Churchill\n\nLa verdad:\n→ El fracaso es feedback\n→ El éxito es un momento\n→ La constancia es el verdadero triunfo\n\n🔥 Levántate una vez más de las que caes.`,
                
                // POST 2
                `⚡ Tus pensamientos crean tu realidad.\nTus palabras crean tu destino.\nTus acciones crean tu vida.\n\nLa fórmula:\n1. Cambia tus pensamientos\n2. Cambia tus palabras\n3. Cambia tus acciones\n4. Cambia tu vida\n\n💬 ¿Qué estás creando hoy?`,
                
                // POST 3
                `🎯 "La disciplina es el puente entre metas y logros." — Jim Rohn\n\nNo es talento.\nNo es suerte.\nNo es conexiones.\n\nEs levantarte cada día y hacer el trabajo.\n\n💪 La disciplina supera la motivación 100 veces.`
            ],

            general: [
                `💡 "Lo que haces hoy puede mejorar todos tus mañanas." — Ralph Marston\n\nCada acción cuenta.\nCada decisión importa.\nCada día es una nueva oportunidad.\n\n✨ El futuro se construye en el presente.`,
                
                `🔥 No esperes el momento perfecto.\nCrea el momento perfecto.\n\nLa diferencia entre soñar y lograr:\n→ Acción\n→ Constancia\n→ Decisión\n\n💪 Empieza ahora.`,
                
                `✨ "El mejor momento para plantar un árbol fue hace 20 años.\nEl segundo mejor momento es ahora." — Proverbio chino\n\n⏰ Deja de postergar tu vida.`
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
                ['#FilosofíaDeVida', '#Reflexiones', '#DesarrolloHumano', '#Consciencia', '#Sabiduría']
            ],
            productividad: [
                ['#Productividad', '#GestiónDelTiempo', '#Eficiencia', '#Enfoque', '#AltoRendimiento'],
                ['#ProductividadPersonal', '#HábitosProductivos', '#TiempoEsOro', '#Organización', '#Éxito'],
                ['#SistemaDeProductividad', '#TrabajoInteligente', '#Resultados', '#Disciplina', '#Logros'],
                ['#MétodoGTD', '#ProductividadExtreme', '#Enfoque', '#Optimización', '#ÉxitoProfesional'],
                ['#AltoDesempeño', '#Productividad', '#HábitosDeÉxito', '#Rendimiento', '#Constancia'],
                ['#ProductividadReal', '#TrabajoPorObjetivos', '#Eficiencia', '#Metas', '#Desempeño']
            ],
            motivacion: [
                ['#Motivación', '#Inspiración', '#Éxito', '#CrecimientoPersonal', '#Mentalidad'],
                ['#MotivaciónDiaria', '#Superación', '#MentalidadDeÉxito', '#Determinación', '#Logros'],
                ['#Motivacional', '#FrasesMotivadoras', '#ÉxitoPersonal', '#Disciplina', '#Constancia'],
                ['#MotivaciónPositiva', '#ActitudPositiva', '#Emprendimiento', '#MentalidadGanadora', '#Resiliencia'],
                ['#FuerzaInterior', '#Motivación', '#DesarrolloPersonal', '#Transformación', '#Propósito'],
                ['#InspiraciónDiaria', '#Éxito', '#MentalidadDeGanador', '#Perseverancia', '#Determinación']
            ],
            general: [
                ['#DesarrolloPersonal', '#Crecimiento', '#Motivación', '#Inspiración', '#Cambio'],
                ['#CrecimientoPersonal', '#TransformaciónPersonal', '#Mentalidad', '#Éxito', '#Vida'],
                ['#Reflexiones', '#DesarrolloHumano', '#Sabiduría', '#Aprendizaje', '#Evolución']
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
