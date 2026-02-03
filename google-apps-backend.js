// ========================================
// GOOGLE APPS SCRIPT BACKEND
// Social Media AI Generator
// ========================================

class GoogleAppsBackend {
    constructor() {
        this.apiURL = 'https://script.google.com/macros/s/AKfycbyAItizx3kq967VkRURfKbCUTIOaDWZ6mNKDr8mhJWwVN8Yg8IinGqYbvbMPfZTqwNG/exec';
        this.offlineMode = false;
        this.initialized = false;
    }

    // Inicializar con la URL de tu Web App de Google Apps Script
    init() {
        const config = getStoredConfig();
        
        if (!config.googleAppsURL) {
            console.warn('Google Apps Script no configurado - Usando localStorage');
            this.initialized = false;
            return false;
        }

        this.webAppURL = config.googleAppsURL;
        this.initialized = true;
        console.log('✅ Google Apps Backend inicializado');
        return true;
    }

    // Guardar post generado
    async savePost(postData) {
        if (!this.initialized) {
            console.warn('Guardando en localStorage (Google Apps Script no configurado)');
            return this.saveToLocalStorage(postData);
        }

        try {
            const response = await fetch(this.webAppURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'guardarPost',
                    data: postData
                })
            });

            // Como usamos no-cors, guardamos también en local como backup
            return this.saveToLocalStorage({
                id: Date.now(),
                ...postData,
                created_at: new Date().toISOString(),
                synced: true
            });

        } catch (error) {
            console.error('Error al conectar con Google Apps Script:', error);
            // Fallback a localStorage
            return this.saveToLocalStorage({
                id: Date.now(),
                ...postData,
                created_at: new Date().toISOString(),
                synced: false
            });
        }
    }

    // Obtener todos los posts
    async getPosts() {
        if (!this.initialized) {
            return this.getFromLocalStorage();
        }

        try {
            const response = await fetch(`${this.webAppURL}?action=obtenerPosts`, {
                method: 'GET'
            });

            if (response.ok) {
                const data = await response.json();
                
                // Asegurar que data sea un array
                const posts = Array.isArray(data) ? data : (data.posts || []);
                
                // Sincronizar con localStorage
                localStorage.setItem('generated_posts', JSON.stringify(posts));
                return posts;
            }
        } catch (error) {
            console.error('Error al obtener posts:', error);
        }

        // Fallback a localStorage
        return this.getFromLocalStorage();
    }

    // Obtener todos los posts (alias para compatibilidad)
    async getAllPosts() {
        return await this.getPosts();
    }

    // Actualizar rating de un post
    async updatePostRating(postId, rating) {
        const posts = await this.getPosts();
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return { ...post, rating, updated_at: new Date().toISOString() };
            }
            return post;
        });

        localStorage.setItem('generated_posts', JSON.stringify(updatedPosts));

        // Sincronizar con Google Sheets
        if (this.initialized) {
            try {
                await fetch(this.webAppURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({
                        action: 'actualizarRating',
                        postId: postId,
                        rating: rating
                    })
                });
            } catch (error) {
                console.error('Error al actualizar rating en Google Sheets:', error);
            }
        }

        return true;
    }

    // Eliminar post
    async deletePost(postId) {
        const posts = await this.getPosts();
        const filteredPosts = posts.filter(post => post.id !== postId);
        localStorage.setItem('generated_posts', JSON.stringify(filteredPosts));

        // Sincronizar con Google Sheets
        if (this.initialized) {
            try {
                await fetch(this.webAppURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({
                        action: 'eliminarPost',
                        postId: postId
                    })
                });
            } catch (error) {
                console.error('Error al eliminar en Google Sheets:', error);
            }
        }

        return true;
    }

    // Guardar post programado
    async schedulePost(scheduleData) {
        const scheduledPosts = this.getScheduledPosts();
        const newScheduled = {
            id: Date.now(),
            ...scheduleData,
            status: 'scheduled',
            created_at: new Date().toISOString()
        };

        scheduledPosts.push(newScheduled);
        localStorage.setItem('scheduled_posts', JSON.stringify(scheduledPosts));

        // Sincronizar con Google Sheets
        if (this.initialized) {
            try {
                await fetch(this.webAppURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({
                        action: 'programarPost',
                        data: newScheduled
                    })
                });
            } catch (error) {
                console.error('Error al programar en Google Sheets:', error);
            }
        }

        return true;
    }

    // Obtener posts programados
    getScheduledPosts() {
        const data = localStorage.getItem('scheduled_posts');
        return data ? JSON.parse(data) : [];
    }

    // Eliminar post programado
    async deleteScheduledPost(postId) {
        const scheduled = this.getScheduledPosts();
        const filtered = scheduled.filter(p => p.id != postId);
        localStorage.setItem('scheduled_posts', JSON.stringify(filtered));

        // Sincronizar con Google Sheets
        if (this.initialized) {
            try {
                await fetch(this.webAppURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({
                        action: 'eliminarProgramado',
                        postId: postId
                    })
                });
            } catch (error) {
                console.error('Error al eliminar programado en Google Sheets:', error);
            }
        }

        return true;
    }

    // Sincronizar pendientes con Google Sheets
    async syncPendingPosts() {
        if (!this.initialized) return;

        const posts = this.getFromLocalStorage();
        const pendingSync = posts.filter(post => !post.synced);

        if (pendingSync.length === 0) return;

        try {
            await fetch(this.webAppURL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    action: 'sincronizarPosts',
                    posts: pendingSync
                })
            });

            // Marcar como sincronizados
            const updatedPosts = posts.map(post => ({
                ...post,
                synced: true
            }));
            localStorage.setItem('generated_posts', JSON.stringify(updatedPosts));

            console.log(`✅ ${pendingSync.length} posts sincronizados con Google Sheets`);
        } catch (error) {
            console.error('Error en sincronización:', error);
        }
    }

    // Funciones auxiliares para localStorage
    saveToLocalStorage(postData) {
        const existingPosts = this.getFromLocalStorage();
        existingPosts.unshift(postData);
        localStorage.setItem('generated_posts', JSON.stringify(existingPosts));
        return postData;
    }

    getFromLocalStorage() {
        const data = localStorage.getItem('generated_posts');
        try {
            const parsed = data ? JSON.parse(data) : [];
            // Asegurar que siempre retorne un array
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error('Error al parsear localStorage:', error);
            return [];
        }
    }

    // Obtener analytics
    async getAnalytics() {
        try {
            const posts = await this.getPosts();
            
            // Validar que posts sea un array
            if (!Array.isArray(posts)) {
                console.error('Posts no es un array:', posts);
                return this.getEmptyAnalytics();
            }
            
            const totalPosts = posts.length;
            const ratedPosts = posts.filter(p => p && p.rating > 0);
            const avgRating = ratedPosts.length > 0 
                ? (ratedPosts.reduce((sum, p) => sum + (p.rating || 0), 0) / ratedPosts.length).toFixed(1)
                : 0;

            const avgEngagement = posts.length > 0 ? '3.2%' : '0%';
            const bestTime = CONFIG.BEST_TIMES.instagram[0];

            const topPosts = posts
                .filter(p => p && p.rating >= 4)
                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, 5);

            const patterns = this.detectPatterns(posts);

            return {
                totalPosts,
                avgRating,
                avgEngagement,
                bestTime,
                topPosts,
                patterns
            };
        } catch (error) {
            console.error('Error en getAnalytics:', error);
            return this.getEmptyAnalytics();
        }
    }

    // Analytics vacío (fallback)
    getEmptyAnalytics() {
        return {
            totalPosts: 0,
            avgRating: 0,
            avgEngagement: '0%',
            bestTime: '09:00',
            topPosts: [],
            patterns: []
        };
    }

    // Detectar patrones de posts exitosos
    detectPatterns(posts) {
        try {
            // Validar que posts sea un array
            if (!Array.isArray(posts)) {
                return [];
            }

            const successfulPosts = posts.filter(p => p && p.rating >= 4);
            
            if (successfulPosts.length < 3) {
                return ['📊 Crea más posts para ver patrones de éxito'];
            }

            const patterns = [];

            // Analizar tonos exitosos
            const tones = {};
            successfulPosts.forEach(post => {
                if (post.tone) {
                    tones[post.tone] = (tones[post.tone] || 0) + 1;
                }
            });
            const bestTone = Object.keys(tones).sort((a, b) => tones[b] - tones[a])[0];
            if (bestTone) {
                patterns.push(`📊 Tus posts con tono "${bestTone}" obtienen mejor rating`);
            }

            // Analizar formatos exitosos
            const formats = {};
            successfulPosts.forEach(post => {
                if (post.format) {
                    formats[post.format] = (formats[post.format] || 0) + 1;
                }
            });
            const bestFormat = Object.keys(formats).sort((a, b) => formats[b] - formats[a])[0];
            if (bestFormat) {
                patterns.push(`📱 El formato "${bestFormat}" genera más engagement`);
            }

            // Analizar longitud de contenido
            const validPosts = successfulPosts.filter(p => p.contenido);
            if (validPosts.length > 0) {
                const avgLength = validPosts.reduce((sum, p) => sum + p.contenido.length, 0) / validPosts.length;
                patterns.push(`📝 Tus posts exitosos tienen en promedio ${Math.round(avgLength)} caracteres`);
            }

            // Analizar hashtags
            const hashtagCount = {};
            successfulPosts.forEach(post => {
                if (post.hashtags && Array.isArray(post.hashtags)) {
                    post.hashtags.forEach(tag => {
                        hashtagCount[tag] = (hashtagCount[tag] || 0) + 1;
                    });
                }
            });
            const topHashtags = Object.keys(hashtagCount)
                .sort((a, b) => hashtagCount[b] - hashtagCount[a])
                .slice(0, 3);
            if (topHashtags.length > 0) {
                patterns.push(`#️⃣ Hashtags más efectivos: ${topHashtags.join(', ')}`);
            }

            return patterns.length > 0 ? patterns : ['📊 Continúa creando posts para ver más insights'];
        } catch (error) {
            console.error('Error en detectPatterns:', error);
            return [];
        }
    }

    // Exportar datos a CSV (útil para análisis)
    exportToCSV() {
        const posts = this.getFromLocalStorage();
        
        if (posts.length === 0) {
            alert('No hay posts para exportar');
            return;
        }
        
        let csv = 'ID,Fecha,Titulo,Contenido,Hashtags,Tono,Formato,Rating\n';
        
        posts.forEach(post => {
            const row = [
                post.id || '',
                post.created_at || '',
                `"${(post.titulo || '').replace(/"/g, '""')}"`,
                `"${(post.contenido || '').replace(/"/g, '""')}"`,
                `"${(post.hashtags || []).join(', ')}"`,
                post.tone || '',
                post.format || '',
                post.rating || 0
            ].join(',');
            
            csv += row + '\n';
        });

        // Descargar archivo
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `posts-redes-sociales-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        console.log('✅ Datos exportados a CSV');
    }
}

// Instancia global
const googleBackend = new GoogleAppsBackend();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        googleBackend.init();
    });
} else {
    googleBackend.init();
}
