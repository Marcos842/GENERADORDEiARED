// ========== APLICACIÓN PRINCIPAL - VERSION VIRAL PRO ==========

class SocialMediaAutomation {
    constructor() {
        this.currentPosts = [];
        this.selectedPosts = new Set();
        this.currentSection = 'generator';
    }

    // Inicializar aplicación
    init() {
        console.log('🚀 Iniciando Social Media Automation PRO...');
        
        // Inicializar servicios
        googleBackend.init();
        aiService.init();

        // Cargar configuración guardada
        this.loadSavedConfig();

        // Event Listeners
        this.setupEventListeners();

        // Renderizar interfaz inicial
        this.renderInitialState();

        // Actualizar estadísticas de uso
        this.updateUsageStats();

        console.log('✅ Aplicación lista - Modo VIRAL activado');
    }

    // Configurar event listeners
    setupEventListeners() {
        // Navegación entre secciones
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        // Botón generar contenido
        const generateBtn = document.getElementById('generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateContent());
        }

        // Seleccionar todos los posts
        const selectAllBtn = document.getElementById('select-all-btn');
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', () => this.selectAllPosts());
        }

        // Programar posts seleccionados
        const scheduleSelectedBtn = document.getElementById('schedule-selected-btn');
        if (scheduleSelectedBtn) {
            scheduleSelectedBtn.addEventListener('click', () => this.scheduleSelectedPosts());
        }

        // Calendario - navegación
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => calendar.previousMonth());
        if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => calendar.nextMonth());

        // Configuración - guardar claves
        const saveKeysBtn = document.getElementById('save-keys-btn');
        if (saveKeysBtn) {
            saveKeysBtn.addEventListener('click', () => this.saveAPIKeys());
        }

        // Exportar a CSV
        const exportCSVBtn = document.getElementById('export-csv-btn');
        if (exportCSVBtn) {
            exportCSVBtn.addEventListener('click', () => {
                googleBackend.exportToCSV();
                this.showNotification('📥 Datos exportados a CSV', 'success');
            });
        }

        // Sincronizar con Google Sheets
        const syncBtn = document.getElementById('sync-btn');
        if (syncBtn) {
            syncBtn.addEventListener('click', async () => {
                this.showNotification('🔄 Sincronizando...', 'info');
                await googleBackend.syncPendingPosts();
                this.showNotification('✅ Sincronización completa', 'success');
            });
        }

        // Borrar todos los datos
        const clearDataBtn = document.getElementById('clear-data-btn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => this.clearAllData());
        }

        // Modal - cerrar
        const closeModalBtn = document.querySelector('.close-modal');
        const cancelScheduleBtn = document.querySelector('.cancel-schedule');
        if (closeModalBtn) closeModalBtn.addEventListener('click', () => this.closeModal());
        if (cancelScheduleBtn) cancelScheduleBtn.addEventListener('click', () => this.closeModal());

        // Modal - confirmar programación
        const confirmScheduleBtn = document.querySelector('.confirm-schedule');
        if (confirmScheduleBtn) {
            confirmScheduleBtn.addEventListener('click', () => this.confirmSchedule());
        }

        // ==========================================
        // SELECTOR DE NICHOS POPULARES
        // ==========================================
        const self = this;
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('niche-btn') || e.target.closest('.niche-btn')) {
                const button = e.target.classList.contains('niche-btn') ? e.target : e.target.closest('.niche-btn');
                const nicheText = button.dataset.niche;
                
                console.log(`✅ Click en nicho: ${nicheText}`);
                
                document.querySelectorAll('.niche-btn').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                
                const ideaInput = document.getElementById('idea-input');
                if (ideaInput) {
                    ideaInput.value = nicheText;
                    ideaInput.focus();
                    self.showNotification(`✅ Nicho seleccionado: ${button.textContent.trim()}`, 'success');
                }
            }
        });

        // Conectar redes sociales
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const platform = e.currentTarget.classList[1];
                this.connectSocialMedia(platform);
            });
        });
    }

    // Cambiar de sección
    switchSection(sectionName) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        if (sectionName === 'calendar') {
            calendar.renderCalendar();
        } else if (sectionName === 'analytics') {
            this.renderAnalytics();
        } else if (sectionName === 'settings') {
            this.updateUsageStats();
        }
    }

    // Generar contenido con IA
    async generateContent() {
        const ideaInput = document.getElementById('idea-input');
        const idea = ideaInput.value.trim();

        if (!idea) {
            this.showNotification(CONFIG.MESSAGES.EMPTY_IDEA, 'warning');
            return;
        }

        const quantity = parseInt(document.getElementById('post-quantity').value);
        const tone = document.getElementById('tone-select').value;
        
        const formats = [];
        if (document.getElementById('format-vertical').checked) formats.push('vertical');
        if (document.getElementById('format-square').checked) formats.push('square');
        if (document.getElementById('format-horizontal').checked) formats.push('horizontal');

        if (formats.length === 0) {
            this.showNotification('⚠️ Selecciona al menos un formato', 'warning');
            return;
        }

        this.showLoading(true);

        try {
            const posts = await aiService.generateContent(idea, {
                quantity,
                tone,
                formats
            });

            for (const post of posts) {
                await googleBackend.savePost({
                    ...post,
                    rating: 0,
                    engagement: 0,
                    idea: idea
                });
            }

            this.currentPosts = posts;
            this.renderPosts(posts);
            this.updateGenerationStats();
            
            this.showNotification(CONFIG.MESSAGES.SUCCESS_GENERATE, 'success');
            
            document.getElementById('results-container').scrollIntoView({ 
                behavior: 'smooth' 
            });

        } catch (error) {
            console.error('Error:', error);
            this.showNotification(CONFIG.MESSAGES.ERROR_GENERATE, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // ==========================================
    // RENDERIZAR POSTS - VERSION VIRAL PRO
    // ==========================================
    renderPosts(posts) {
        const postsGrid = document.getElementById('posts-grid');
        const resultsContainer = document.getElementById('results-container');

        if (!postsGrid || !resultsContainer) return;

        resultsContainer.classList.remove('hidden');

        postsGrid.innerHTML = posts.map((post, index) => `
            <div class="post-card viral-card" data-index="${index}">
                <!-- HEADER CON CHECKBOX -->
                <div class="post-header">
                    <h3 class="post-title">${post.titulo}</h3>
                    <input type="checkbox" class="select-checkbox" data-index="${index}">
                </div>

                <!-- ========================================
                     NUEVO: INDICADORES VIRALES
                     ======================================== -->
                <div class="viral-indicators">
                    <div class="viral-score-badge ${this.getViralScoreClass(post.viralScore || 0)}">
                        <i class="fas fa-bolt"></i>
                        <span>VIRAL ${post.viralScore || 0}%</span>
                    </div>
                    
                    <div class="controversy-badge ${this.getControversyClass(post.controversyLevel || 'bajo')}">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>${(post.controversyLevel || 'bajo').toUpperCase()}</span>
                    </div>
                    
                    ${post.bestTimeToPost ? `
                        <div class="time-badge">
                            <i class="fas fa-clock"></i>
                            <span>${post.bestTimeToPost}</span>
                        </div>
                    ` : ''}
                </div>

                <!-- CONTENIDO -->
                <div class="post-content">
                    ${post.contenido.replace(/\n/g, '<br>')}
                </div>

                <!-- HASHTAGS -->
                <div class="post-hashtags">
                    ${post.hashtags.map(tag => `<span class="hashtag">${tag}</span>`).join('')}
                </div>

                <!-- ========================================
                     NUEVO: TRIGGER WORDS
                     ======================================== -->
                ${post.triggerWords && post.triggerWords.length > 0 ? `
                    <div class="trigger-words">
                        <i class="fas fa-fire"></i>
                        <span class="trigger-label">Trigger Words:</span>
                        ${post.triggerWords.map(word => `<span class="trigger-word">${word}</span>`).join('')}
                    </div>
                ` : ''}

                <!-- META INFO -->
                <div class="post-meta">
                    <span class="meta-badge">
                        <i class="fas fa-smile"></i> ${post.tone}
                    </span>
                    <span class="meta-badge">
                        <i class="fas fa-mobile-alt"></i> ${post.format}
                    </span>
                    <span class="meta-badge">
                        <i class="fas fa-font"></i> ${this.countCharacters(post)} caracteres
                    </span>
                </div>

                <!-- ========================================
                     NUEVO: COMENTARIOS PREDICHOS
                     ======================================== -->
                ${post.predictedComments ? `
                    <div class="predicted-comments">
                        <button class="toggle-comments-btn" data-index="${index}">
                            <i class="fas fa-comment-dots"></i>
                            Ver Comentarios Predichos
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="comments-panel hidden" id="comments-${index}">
                            <div class="comments-section">
                                <h4 class="comments-title positive">
                                    <i class="fas fa-thumbs-up"></i> Positivos
                                </h4>
                                ${post.predictedComments.positive.map(comment => `
                                    <div class="comment-item positive">
                                        <i class="fas fa-user-circle"></i>
                                        <span>${comment}</span>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="comments-section">
                                <h4 class="comments-title negative">
                                    <i class="fas fa-thumbs-down"></i> Negativos
                                </h4>
                                ${post.predictedComments.negative.map(comment => `
                                    <div class="comment-item negative">
                                        <i class="fas fa-user-circle"></i>
                                        <span>${comment}</span>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="comments-section">
                                <h4 class="comments-title constructive">
                                    <i class="fas fa-lightbulb"></i> Constructivos
                                </h4>
                                ${post.predictedComments.constructive.map(comment => `
                                    <div class="comment-item constructive">
                                        <i class="fas fa-user-circle"></i>
                                        <span>${comment}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- ========================================
                     NUEVO: VARIACIONES A/B
                     ======================================== -->
                ${post.variations && post.variations.length > 1 ? `
                    <div class="variations-section">
                        <button class="toggle-variations-btn" data-index="${index}">
                            <i class="fas fa-layer-group"></i>
                            Ver ${post.variations.length} Variaciones A/B
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="variations-panel hidden" id="variations-${index}">
                            ${post.variations.map((variation, vIndex) => `
                                <div class="variation-item">
                                    <span class="variation-label">Variación ${vIndex + 1}</span>
                                    <p class="variation-hook">${variation.hook}</p>
                                    <button class="use-variation-btn" data-post-index="${index}" data-var-index="${vIndex}">
                                        <i class="fas fa-check"></i> Usar esta
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- RATING -->
                <div class="post-rating" data-index="${index}">
                    ${[1, 2, 3, 4, 5].map(rating => `
                        <i class="fas fa-star star" data-rating="${rating}"></i>
                    `).join('')}
                </div>

                <!-- ACCIONES -->
                <div class="post-actions">
                    <button class="btn-copy" data-copy-index="${index}">
                        <i class="fas fa-copy"></i> Copiar
                    </button>
                    <button class="btn-edit-post" data-edit-index="${index}">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-image" data-image-index="${index}">
                        <i class="fas fa-image"></i> Imagen
                    </button>
                    <button class="btn-schedule" data-index="${index}">
                        <i class="fas fa-calendar-plus"></i> Programar
                    </button>
                    <button class="btn-delete" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        this.setupPostEventListeners();
        this.addViralStyles();
    }

    // ==========================================
    // FUNCIONES AUXILIARES PARA BADGES
    // ==========================================
    getViralScoreClass(score) {
        if (score >= 80) return 'viral-high';
        if (score >= 60) return 'viral-medium';
        return 'viral-low';
    }

    getControversyClass(level) {
        if (level === 'alto') return 'controversy-high';
        if (level === 'medio') return 'controversy-medium';
        return 'controversy-low';
    }

    // ==========================================
    // EVENT LISTENERS PARA POSTS
    // ==========================================
    setupPostEventListeners() {
        // Checkboxes
        document.querySelectorAll('.select-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const card = e.target.closest('.post-card');
                
                if (e.target.checked) {
                    this.selectedPosts.add(index);
                    card.classList.add('selected');
                } else {
                    this.selectedPosts.delete(index);
                    card.classList.remove('selected');
                }
            });
        });

        // Rating con estrellas
        document.querySelectorAll('.post-rating').forEach(ratingDiv => {
            const stars = ratingDiv.querySelectorAll('.star');
            
            stars.forEach(star => {
                star.addEventListener('click', async (e) => {
                    const rating = parseInt(e.target.dataset.rating);
                    const index = parseInt(ratingDiv.dataset.index);
                    
                    stars.forEach((s, i) => {
                        if (i < rating) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });

                    const post = this.currentPosts[index];
                    if (post && post.id) {
                        await googleBackend.updatePostRating(post.id, rating);
                        this.showNotification(`⭐ Rating: ${rating} estrellas`, 'success');
                    }
                });

                star.addEventListener('mouseenter', (e) => {
                    const rating = parseInt(e.target.dataset.rating);
                    stars.forEach((s, i) => {
                        if (i < rating) {
                            s.style.color = '#fbbf24';
                        }
                    });
                });

                ratingDiv.addEventListener('mouseleave', () => {
                    stars.forEach(s => {
                        if (!s.classList.contains('active')) {
                            s.style.color = '';
                        }
                    });
                });
            });
        });

        // ==========================================
        // NUEVOS EVENT LISTENERS
        // ==========================================

        // Toggle comentarios predichos
        document.querySelectorAll('.toggle-comments-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                const panel = document.getElementById(`comments-${index}`);
                const icon = btn.querySelector('.fa-chevron-down');
                
                panel.classList.toggle('hidden');
                icon.style.transform = panel.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            });
        });

        // Toggle variaciones
        document.querySelectorAll('.toggle-variations-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                const panel = document.getElementById(`variations-${index}`);
                const icon = btn.querySelector('.fa-chevron-down');
                
                panel.classList.toggle('hidden');
                icon.style.transform = panel.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            });
        });

        // Usar variación
        document.querySelectorAll('.use-variation-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postIndex = parseInt(e.target.closest('button').dataset.postIndex);
                const varIndex = parseInt(e.target.closest('button').dataset.varIndex);
                
                const post = this.currentPosts[postIndex];
                const variation = post.variations[varIndex];
                
                post.titulo = variation.hook;
                this.renderPosts(this.currentPosts);
                this.showNotification(`✅ Variación ${varIndex + 1} aplicada`, 'success');
            });
        });

        // Botones de programar
        document.querySelectorAll('.btn-schedule').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('button').dataset.index);
                this.schedulePost(index);
            });
        });

        // Botones de eliminar
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const index = parseInt(e.target.closest('button').dataset.index);
                if (confirm('¿Eliminar este post?')) {
                    const post = this.currentPosts[index];
                    if (post && post.id) {
                        await googleBackend.deletePost(post.id);
                    }
                    this.currentPosts.splice(index, 1);
                    this.renderPosts(this.currentPosts);
                    this.showNotification('🗑️ Post eliminado', 'success');
                }
            });
        });

        // Botones de copiar
        document.querySelectorAll('.btn-copy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('button').dataset.copyIndex);
                this.copyPostContent(index);
            });
        });

        // Botones de editar
        document.querySelectorAll('.btn-edit-post').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('button').dataset.editIndex);
                this.editPost(index);
            });
        });

        // Botones de generar imagen
        document.querySelectorAll('.btn-image').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('button').dataset.imageIndex);
                this.generateImage(index);
            });
        });
    }

    // ==========================================
    // ESTILOS VIRALES
    // ==========================================
    addViralStyles() {
        if (document.getElementById('viral-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'viral-styles';
        style.textContent = `
            /* INDICADORES VIRALES */
            .viral-indicators {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                margin-bottom: 1rem;
            }

            .viral-score-badge, .controversy-badge, .time-badge {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
            }

            .viral-high {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
            }

            .viral-medium {
                background: linear-gradient(135deg, #f59e0b, #d97706);
                color: white;
            }

            .viral-low {
                background: linear-gradient(135deg, #6b7280, #4b5563);
                color: white;
            }

            .controversy-high {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
            }

            .controversy-medium {
                background: linear-gradient(135deg, #f59e0b, #d97706);
                color: white;
            }

            .controversy-low {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
            }

            .time-badge {
                background: rgba(99, 102, 241, 0.2);
                color: #818cf8;
                border: 1px solid rgba(99, 102, 241, 0.3);
            }

            /* TRIGGER WORDS */
            .trigger-words {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
                margin: 1rem 0;
                padding: 12px;
                background: rgba(239, 68, 68, 0.1);
                border-left: 4px solid #ef4444;
                border-radius: 6px;
            }

            .trigger-label {
                font-weight: 600;
                color: #ef4444;
            }

            .trigger-word {
                background: rgba(239, 68, 68, 0.2);
                color: #ef4444;
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 0.85rem;
                font-weight: 500;
            }

            /* COMENTARIOS PREDICHOS */
            .predicted-comments {
                margin-top: 1rem;
            }

            .toggle-comments-btn, .toggle-variations-btn {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px;
                background: rgba(99, 102, 241, 0.1);
                border: 1px solid rgba(99, 102, 241, 0.3);
                border-radius: 8px;
                color: #818cf8;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .toggle-comments-btn:hover, .toggle-variations-btn:hover {
                background: rgba(99, 102, 241, 0.2);
            }

            .comments-panel, .variations-panel {
                margin-top: 1rem;
                padding: 1rem;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 8px;
                animation: slideDown 0.3s ease;
            }

            .comments-section {
                margin-bottom: 1rem;
            }

            .comments-title {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                font-weight: 600;
            }

            .comments-title.positive { color: #10b981; }
            .comments-title.negative { color: #ef4444; }
            .comments-title.constructive { color: #f59e0b; }

            .comment-item {
                display: flex;
                align-items: start;
                gap: 8px;
                padding: 8px;
                margin-bottom: 6px;
                border-radius: 6px;
                font-size: 0.85rem;
            }

            .comment-item.positive {
                background: rgba(16, 185, 129, 0.1);
                border-left: 3px solid #10b981;
            }

            .comment-item.negative {
                background: rgba(239, 68, 68, 0.1);
                border-left: 3px solid #ef4444;
            }

            .comment-item.constructive {
                background: rgba(245, 158, 11, 0.1);
                border-left: 3px solid #f59e0b;
            }

            /* VARIACIONES */
            .variation-item {
                background: rgba(99, 102, 241, 0.1);
                border: 1px solid rgba(99, 102, 241, 0.3);
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 0.8rem;
            }

            .variation-label {
                display: inline-block;
                background: rgba(99, 102, 241, 0.3);
                color: #818cf8;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 600;
                margin-bottom: 8px;
            }

            .variation-hook {
                margin: 8px 0;
                color: var(--text-primary);
                font-weight: 500;
            }

            .use-variation-btn {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .use-variation-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // FUNCIONES EXISTENTES (SIN CAMBIOS)
    // ==========================================

    async copyPostContent(index) {
        const post = this.currentPosts[index];
        if (!post) return;

        const fullContent = `${post.titulo}\n\n${post.contenido}\n\n${post.hashtags.join(' ')}`;

        try {
            await navigator.clipboard.writeText(fullContent);
            this.showNotification('✅ Contenido copiado al portapapeles', 'success');
            
            const btn = document.querySelector(`[data-copy-index="${index}"]`);
            if (btn) {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Copiado';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                }, 2000);
            }
        } catch (error) {
            this.showNotification('❌ Error al copiar', 'error');
        }
    }

    editPost(index) {
        const post = this.currentPosts[index];
        if (!post) return;

        const card = document.querySelector(`.post-card[data-index="${index}"]`);
        if (!card) return;

        const contentDiv = card.querySelector('.post-content');
        const hashtagsDiv = card.querySelector('.post-hashtags');
        const titleEl = card.querySelector('.post-title');

        card.dataset.originalTitle = post.titulo;
        card.dataset.originalContent = post.contenido;
        card.dataset.originalHashtags = JSON.stringify(post.hashtags);

        titleEl.innerHTML = `
            <input type="text" class="edit-title" value="${post.titulo}" 
                   style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); 
                          padding: 8px; border-radius: 6px; color: var(--text-primary); font-size: 1rem;">
        `;

        contentDiv.innerHTML = `
            <textarea class="edit-content" rows="6" 
                      style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); 
                             padding: 12px; border-radius: 6px; color: var(--text-primary); 
                             font-family: inherit; resize: vertical;">${post.contenido}</textarea>
        `;

        hashtagsDiv.innerHTML = `
            <input type="text" class="edit-hashtags" value="${post.hashtags.join(', ')}" 
                   style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); 
                          padding: 8px; border-radius: 6px; color: var(--text-primary);">
        `;

        const actionsDiv = card.querySelector('.post-actions');
        actionsDiv.innerHTML = `
            <button class="btn-save-edit" data-index="${index}" 
                    style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; 
                           padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; 
                           font-weight: 600; flex: 1;">
                <i class="fas fa-save"></i> Guardar
            </button>
            <button class="btn-cancel-edit" data-index="${index}" 
                    style="background: rgba(239, 68, 68, 0.2); color: #ef4444; 
                           padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                <i class="fas fa-times"></i> Cancelar
            </button>
        `;

        card.querySelector('.btn-save-edit').addEventListener('click', () => this.saveEdit(index));
        card.querySelector('.btn-cancel-edit').addEventListener('click', () => this.cancelEdit(index));
    }

    async saveEdit(index) {
        const card = document.querySelector(`.post-card[data-index="${index}"]`);
        if (!card) return;

        const newTitle = card.querySelector('.edit-title').value;
        const newContent = card.querySelector('.edit-content').value;
        const newHashtags = card.querySelector('.edit-hashtags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);

        this.currentPosts[index].titulo = newTitle;
        this.currentPosts[index].contenido = newContent;
        this.currentPosts[index].hashtags = newHashtags;

        const post = this.currentPosts[index];
        if (post.id) {
            await googleBackend.updatePost(post);
        }

        this.renderPosts(this.currentPosts);
        this.showNotification('✅ Post actualizado', 'success');
    }

    cancelEdit(index) {
        this.renderPosts(this.currentPosts);
    }

    countCharacters(post) {
        return post.titulo.length + post.contenido.length + post.hashtags.join(' ').length;
    }

    async generateImage(index) {
        const post = this.currentPosts[index];
        if (!post) return;

        this.showNotification('🎨 Generando imagen...', 'info');

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const dimensions = {
                vertical: { width: 1080, height: 1920 },
                square: { width: 1080, height: 1080 },
                horizontal: { width: 1920, height: 1080 }
            };

            const dim = dimensions[post.format] || dimensions.square;
            canvas.width = dim.width;
            canvas.height = dim.height;

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'white';
            ctx.font = 'bold 80px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const maxWidth = canvas.width - 200;
            const lines = this.wrapText(ctx, post.titulo, maxWidth);
            const lineHeight = 100;
            const startY = (canvas.height / 2) - ((lines.length - 1) * lineHeight / 2);

            lines.forEach((line, i) => {
                ctx.fillText(line, canvas.width / 2, startY + (i * lineHeight));
            });

            ctx.font = '30px Arial';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.textAlign = 'center';
            ctx.fillText('@M20TZ', canvas.width / 2, canvas.height - 50);

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `post-${Date.now()}.png`;
                a.click();
                URL.revokeObjectURL(url);
                this.showNotification('✅ Imagen generada y descargada', 'success');
            });

        } catch (error) {
            console.error('Error generando imagen:', error);
            this.showNotification('❌ Error al generar imagen', 'error');
        }
    }

    wrapText(ctx, text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    selectAllPosts() {
        const checkboxes = document.querySelectorAll('.select-checkbox');
        const allSelected = this.selectedPosts.size === checkboxes.length;

        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = !allSelected;
            const card = checkbox.closest('.post-card');
            
            if (!allSelected) {
                this.selectedPosts.add(index);
                card.classList.add('selected');
            } else {
                this.selectedPosts.delete(index);
                card.classList.remove('selected');
            }
        });

        const selectAllBtn = document.getElementById('select-all-btn');
        selectAllBtn.innerHTML = allSelected 
            ? '<i class="fas fa-check-double"></i> Seleccionar Todo'
            : '<i class="fas fa-times"></i> Deseleccionar Todo';
    }

    scheduleSelectedPosts() {
        if (this.selectedPosts.size === 0) {
            this.showNotification('⚠️ Selecciona al menos un post', 'warning');
            return;
        }

        this.openModal();
    }

    schedulePost(index) {
        this.selectedPosts.clear();
        this.selectedPosts.add(index);
        this.openModal();
    }

    openModal() {
        const modal = document.getElementById('schedule-modal');
        modal.classList.remove('hidden');

        const datetimeInput = document.getElementById('schedule-datetime');
        const now = new Date();
        const minDate = now.toISOString().slice(0, 16);
        datetimeInput.min = minDate;
        datetimeInput.value = minDate;
    }

    closeModal() {
        const modal = document.getElementById('schedule-modal');
        modal.classList.add('hidden');
    }

    async confirmSchedule() {
        const datetime = document.getElementById('schedule-datetime').value;
        const platforms = Array.from(document.querySelectorAll('.platform-check:checked'))
            .map(cb => cb.value);

        if (!datetime) {
            this.showNotification('⚠️ Selecciona fecha y hora', 'warning');
            return;
        }

        if (platforms.length === 0) {
            this.showNotification('⚠️ Selecciona al menos una plataforma', 'warning');
            return;
        }

        for (const index of this.selectedPosts) {
            const post = this.currentPosts[index];
            
            await googleBackend.schedulePost({
                ...post,
                scheduledDate: datetime,
                platforms: platforms
            });
        }

        this.showNotification(
            `✅ ${this.selectedPosts.size} post(s) programado(s)`, 
            'success'
        );

        this.closeModal();
        this.selectedPosts.clear();
        
        document.querySelectorAll('.select-checkbox').forEach(cb => {
            cb.checked = false;
        });
        document.querySelectorAll('.post-card').forEach(card => {
            card.classList.remove('selected');
        });
    }

    async renderAnalytics() {
        const analytics = await googleBackend.getAnalytics();

        document.getElementById('total-posts').textContent = analytics.totalPosts;
        document.getElementById('avg-rating').textContent = analytics.avgRating;
        document.getElementById('avg-engagement').textContent = analytics.avgEngagement;
        document.getElementById('best-time').textContent = analytics.bestTime;

        const topPostsList = document.getElementById('top-posts-list');
        if (analytics.topPosts.length === 0) {
            topPostsList.innerHTML = '<p class="empty-state">No hay posts calificados aún</p>';
        } else {
            topPostsList.innerHTML = analytics.topPosts.map(post => `
                <div class="top-post-item">
                    <div class="top-post-header">
                        <h4>${post.titulo}</h4>
                        <div class="top-post-rating">
                            ${Array(post.rating).fill('⭐').join('')}
                        </div>
                    </div>
                    <p class="top-post-content">${post.contenido.substring(0, 100)}...</p>
                    <div class="top-post-meta">
                        <span class="meta-badge">${post.tone}</span>
                        <span class="meta-badge">${post.format}</span>
                    </div>
                </div>
            `).join('');
        }

        const patternsList = document.getElementById('patterns-list');
        if (analytics.patterns.length === 0) {
            patternsList.innerHTML = '<p class="empty-state">Genera más posts para que la IA aprenda tus preferencias</p>';
        } else {
            patternsList.innerHTML = analytics.patterns.map(pattern => `
                <div class="pattern-item">
                    <i class="fas fa-lightbulb"></i>
                    <p>${pattern}</p>
                </div>
            `).join('');
        }
    }

    saveAPIKeys() {
        const config = {
            openai_key: document.getElementById('openai-key').value,
            google_apps_url: document.getElementById('google-apps-url').value,
            user_niche: document.getElementById('niche-input').value,
            user_timezone: document.getElementById('timezone-select').value,
            user_language: document.getElementById('language-select').value
        };

        saveConfig(config);
        
        googleBackend.init();
        aiService.init();

        this.showNotification('✅ Configuración guardada', 'success');
        this.updateUsageStats();
    }

    loadSavedConfig() {
        const config = getStoredConfig();
        
        if (document.getElementById('openai-key')) {
            document.getElementById('openai-key').value = config.openaiKey;
        }
        if (document.getElementById('google-apps-url')) {
            document.getElementById('google-apps-url').value = config.googleAppsURL;
        }
        if (document.getElementById('niche-input')) {
            document.getElementById('niche-input').value = config.niche;
        }
        if (document.getElementById('timezone-select')) {
            document.getElementById('timezone-select').value = config.timezone;
        }
        if (document.getElementById('language-select')) {
            document.getElementById('language-select').value = config.language || 'es';
        }
    }

    updateUsageStats() {
        const posts = googleBackend.getFromLocalStorage();
        const today = new Date().toDateString();
        const postsToday = posts.filter(p => {
            const postDate = new Date(p.created_at).toDateString();
            return postDate === today;
        }).length;

        const postsTodayEl = document.getElementById('posts-today');
        if (postsTodayEl) {
            postsTodayEl.textContent = postsToday;
        }

        const lastGenEl = document.getElementById('last-generation');
        if (lastGenEl && posts.length > 0) {
            const lastPost = posts[0];
            const lastDate = new Date(lastPost.created_at);
            const timeAgo = this.getTimeAgo(lastDate);
            lastGenEl.textContent = timeAgo;
        }

        const storageTypeEl = document.getElementById('storage-type');
        if (storageTypeEl) {
            const config = getStoredConfig();
            storageTypeEl.textContent = config.googleAppsURL ? 'Google Sheets' : 'Navegador';
        }
    }

    updateGenerationStats() {
        const lastGen = localStorage.getItem('last_generation_date');
        const newDate = new Date().toISOString();
        localStorage.setItem('last_generation_date', newDate);

        const postsCountToday = localStorage.getItem('posts_count_today');
        const today = new Date().toDateString();
        const lastCountDate = localStorage.getItem('last_count_date');

        if (lastCountDate !== today) {
            localStorage.setItem('posts_count_today', '1');
            localStorage.setItem('last_count_date', today);
        } else {
            const newCount = parseInt(postsCountToday || 0) + 1;
            localStorage.setItem('posts_count_today', newCount.toString());
        }
    }

    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Hace un momento';
        if (minutes < 60) return `Hace ${minutes}m`;
        if (hours < 24) return `Hace ${hours}h`;
        return `Hace ${days}d`;
    }

    clearAllData() {
        const confirmed = confirm(
            '⚠️ ADVERTENCIA\n\n' +
            'Esto eliminará:\n' +
            '• Todos los posts generados\n' +
            '• Todas las programaciones\n' +
            '• Todas las configuraciones\n' +
            '• Todas las analíticas\n\n' +
            '¿Estás seguro?'
        );

        if (confirmed) {
            const doubleConfirm = confirm('¿Realmente seguro? Esta acción no se puede deshacer.');
            
            if (doubleConfirm) {
                localStorage.clear();
                this.showNotification('🗑️ Todos los datos han sido eliminados', 'success');
                
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }
    }

    connectSocialMedia(platform) {
        const platformNames = {
            instagram: 'Instagram',
            facebook: 'Facebook',
            tiktok: 'TikTok',
            twitter: 'X (Twitter)'
        };

        this.showNotification(
            `🔗 Conexión con ${platformNames[platform]} próximamente disponible`, 
            'info'
        );

        console.log(`Conectando con ${platform}...`);
    }

    showLoading(show) {
        const loadingState = document.getElementById('loading-state');
        const generateBtn = document.getElementById('generate-btn');

        if (show) {
            loadingState.classList.remove('hidden');
            generateBtn.disabled = true;
            generateBtn.style.opacity = '0.5';
        } else {
            loadingState.classList.add('hidden');
            generateBtn.disabled = false;
            generateBtn.style.opacity = '1';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 25px;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                }
                .notification-success {
                    background: var(--success-color);
                    color: white;
                }
                .notification-error {
                    background: var(--danger-color);
                    color: white;
                }
                .notification-warning {
                    background: var(--warning-color);
                    color: white;
                }
                .notification-info {
                    background: var(--primary-color);
                    color: white;
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    renderInitialState() {
        const isFirstTime = !localStorage.getItem('has_visited');
        
        if (isFirstTime) {
            localStorage.setItem('has_visited', 'true');
            setTimeout(() => {
                this.showNotification('👋 ¡Bienvenido a Social Media AI Generator PRO!', 'info');
                setTimeout(() => {
                    this.showNotification('💡 Configura tus APIs en Configuración para empezar', 'info');
                }, 3500);
            }, 1000);
        }
    }
}

// ========== INICIALIZAR APLICACIÓN ==========
const app = new SocialMediaAutomation();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

window.app = app;
