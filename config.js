// ========================================
// CONFIGURACIÓN GLOBAL
// Social Media AI Generator
// ========================================

const CONFIG = {
    // Mensajes del sistema
    MESSAGES: {
        SUCCESS_GENERATE: '✅ Contenido generado exitosamente',
        ERROR_GENERATE: '❌ Error al generar contenido',
        SUCCESS_SAVE: '✅ Guardado correctamente',
        ERROR_SAVE: '❌ Error al guardar',
        EMPTY_IDEA: '⚠️ Por favor ingresa una idea',
        API_KEY_MISSING: '⚠️ Configura tus API Keys en Configuración'
    },

    // Prompts para la IA
    PROMPTS: {
        SYSTEM: `Eres un experto en marketing de redes sociales y creación de contenido viral. 
        Tu tarea es generar posts atractivos, auténticos y optimizados para engagement.`,
        
        GENERATE_POST: (idea, tone, format) => `
            Genera un post para redes sociales basado en esta idea: "${idea}"
            
            Características:
            - Tono: ${tone}
            - Formato: ${format}
            - Debe ser VIRAL y generar engagement
            - Incluye emojis relevantes
            - Máximo 3-5 oraciones para vertical, más para cuadrado
            - Debe captar atención en los primeros 3 segundos
            
            Responde SOLO en formato JSON así:
            {
                "titulo": "Título llamativo del post",
                "contenido": "Contenido completo del post con emojis",
                "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"]
            }
        `
    },

    // Horarios recomendados por red social
    BEST_TIMES: {
        instagram: ['09:00', '14:00', '19:00'],
        facebook: ['13:00', '15:00', '20:00'],
        tiktok: ['10:00', '13:00', '18:00'],
        twitter: ['12:00', '17:00', '21:00']
    },

    // Límites de caracteres por plataforma
    CHAR_LIMITS: {
        twitter: 280,
        instagram: 2200,
        facebook: 63206,
        tiktok: 2200
    },

    // Tonos disponibles y sus características
    TONES: {
        casual: {
            keywords: ['che', 'amigo', 'mira', 'tío'],
            style: 'amigable y cercano'
        },
        profesional: {
            keywords: ['estrategia', 'optimización', 'resultados', 'análisis'],
            style: 'formal y técnico'
        },
        humoristico: {
            keywords: ['jaja', '😂', 'literal', 'no puede ser'],
            style: 'divertido y ligero'
        },
        motivacional: {
            keywords: ['logra', 'alcanza', 'éxito', 'supera'],
            style: 'inspirador y energético'
        },
        educativo: {
            keywords: ['aprende', 'descubre', 'paso a paso', 'tutorial'],
            style: 'instructivo y claro'
        }
    }
};

// ========== FUNCIONES DE CONFIGURACIÓN ==========

/**
 * Obtener configuración guardada en localStorage
 */
function getStoredConfig() {
    return {
        openaiKey: localStorage.getItem('openai_key') || '',
        googleAppsURL: localStorage.getItem('google_apps_url') || 'https://script.google.com/macros/s/AKfycbyAItizx3kq967VkRURfKbCUTIOaDWZ6mNKDr8mhJWwVN8Yg8IinGqYbvbMPfZTqwNG/exec',
        niche: localStorage.getItem('user_niche') || '',
        timezone: localStorage.getItem('user_timezone') || 'America/Lima',
        language: localStorage.getItem('user_language') || 'es'
    };
}

/**
 * Guardar configuración en localStorage
 */
function saveConfig(config) {
    if (config.openai_key) {
        localStorage.setItem('openai_key', config.openai_key);
    }
    if (config.google_apps_url) {
        localStorage.setItem('google_apps_url', config.google_apps_url);
    }
    if (config.user_niche) {
        localStorage.setItem('user_niche', config.user_niche);
    }
    if (config.user_timezone) {
        localStorage.setItem('user_timezone', config.user_timezone);
    }
    if (config.user_language) {
        localStorage.setItem('user_language', config.user_language);
    }
}

/**
 * Guardar URL de Google Apps Script
 */
function saveGoogleAppsURL(url) {
    localStorage.setItem('google_apps_url', url);
    if (window.googleBackend) {
        googleBackend.init();
    }
}

/**
 * Obtener URL de Google Apps Script guardada
 */
function getGoogleAppsURL() {
    return localStorage.getItem('google_apps_url') || 'https://script.google.com/macros/s/AKfycbyAItizx3kq967VkRURfKbCUTIOaDWZ6mNKDr8mhJWwVN8Yg8IinGqYbvbMPfZTqwNG/exec';
}

/**
 * Verificar si las APIs están configuradas
 */
function isConfigured() {
    const config = getStoredConfig();
    return config.openaiKey && config.googleAppsURL;
}

/**
 * Validar configuración completa
 */
function validateConfig() {
    const config = getStoredConfig();
    const errors = [];
    
    if (!config.openaiKey) {
        errors.push('⚠️ Falta configurar OpenAI API Key');
    }
    
    if (!config.googleAppsURL) {
        errors.push('⚠️ Falta configurar Google Apps Script URL');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors,
        config: config
    };
}

// ========== EXPORTAR PARA USO GLOBAL ==========
window.CONFIG = CONFIG;
window.getStoredConfig = getStoredConfig;
window.saveConfig = saveConfig;
window.saveGoogleAppsURL = saveGoogleAppsURL;
window.getGoogleAppsURL = getGoogleAppsURL;
window.isConfigured = isConfigured;
window.validateConfig = validateConfig;
