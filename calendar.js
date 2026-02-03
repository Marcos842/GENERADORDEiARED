// ========================================
// CALENDARIO Y PROGRAMACIÓN
// Social Media AI Generator
// ========================================

class CalendarManager {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.scheduledPosts = [];
    }

    // Inicializar calendario
    async init() {
        await this.loadScheduledPosts();
        this.renderCalendar();
    }

    // Cargar posts programados desde el backend
    async loadScheduledPosts() {
        try {
            const posts = await googleBackend.getScheduledPosts();
            this.scheduledPosts = posts || [];
        } catch (error) {
            console.error('Error cargando posts programados:', error);
            this.scheduledPosts = [];
        }
    }

    // Renderizar calendario
    renderCalendar() {
        const calendarView = document.getElementById('calendar-view');
        if (!calendarView) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Actualizar título
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;

        // Generar días del calendario
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let calendarHTML = '<div class="calendar-days">';
        
        // Días de la semana
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        dayNames.forEach(day => {
            calendarHTML += `<div class="calendar-day-name">${day}</div>`;
        });

        // Días vacíos al inicio
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }

        // Días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = this.isToday(date);
            const hasPost = this.hasScheduledPost(date);
            
            calendarHTML += `
                <div class="calendar-day ${isToday ? 'today' : ''} ${hasPost ? 'has-post' : ''}"
                     data-date="${date.toISOString()}">
                    <span class="day-number">${day}</span>
                    ${hasPost ? '<span class="post-indicator">📌</span>' : ''}
                </div>
            `;
        }

        calendarHTML += '</div>';
        
        // Agregar estilos CSS para el calendario
        calendarHTML += `
            <style>
                .calendar-days {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 10px;
                    margin-top: 20px;
                }
                .calendar-day-name {
                    text-align: center;
                    font-weight: 600;
                    color: var(--primary-color);
                    padding: 10px;
                }
                .calendar-day {
                    aspect-ratio: 1;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                }
                .calendar-day:hover:not(.empty) {
                    border-color: var(--primary-color);
                    background: rgba(99, 102, 241, 0.1);
                }
                .calendar-day.today {
                    background: var(--primary-color);
                    color: white;
                    font-weight: bold;
                }
                .calendar-day.empty {
                    border: none;
                    cursor: default;
                }
                .calendar-day.has-post {
                    background: rgba(16, 185, 129, 0.1);
                    border-color: var(--success-color);
                }
                .day-number {
                    font-size: 1.2rem;
                }
                .post-indicator {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    font-size: 0.8rem;
                }
            </style>
        `;

        calendarView.innerHTML = calendarHTML;

        // Event listeners para días
        document.querySelectorAll('.calendar-day:not(.empty)').forEach(day => {
            day.addEventListener('click', (e) => {
                const date = new Date(e.currentTarget.dataset.date);
                this.showDayPosts(date);
            });
        });

        // Renderizar posts programados
        this.renderScheduledPosts();
    }

    // Verificar si es hoy
    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    // Verificar si hay posts programados
    hasScheduledPost(date) {
        return this.scheduledPosts.some(post => {
            const postDate = new Date(post.scheduledDate || post.fechaProgramada);
            return postDate.toDateString() === date.toDateString();
        });
    }

    // Mostrar posts de un día específico
    showDayPosts(date) {
        const dayPosts = this.scheduledPosts.filter(post => {
            const postDate = new Date(post.scheduledDate || post.fechaProgramada);
            return postDate.toDateString() === date.toDateString();
        });

        if (dayPosts.length === 0) {
            alert(`No hay posts programados para ${date.toLocaleDateString('es-PE')}`);
            return;
        }

        alert(`Posts programados para ${date.toLocaleDateString('es-PE')}:\n\n${dayPosts.map(p => `- ${p.titulo}`).join('\n')}`);
    }

    // Renderizar lista de posts programados
    renderScheduledPosts() {
        const scheduledList = document.getElementById('scheduled-list');
        if (!scheduledList) return;

        if (this.scheduledPosts.length === 0) {
            scheduledList.innerHTML = '<p class="empty-state">No hay posts programados aún</p>';
            return;
        }

        scheduledList.innerHTML = this.scheduledPosts.map(post => {
            const platforms = post.platforms || post.plataformas || ['instagram'];
            const postId = post.id || post.timestamp;
            const scheduledDate = post.scheduledDate || post.fechaProgramada;
            
            return `
                <div class="scheduled-item">
                    <div class="scheduled-header">
                        <h4>${post.titulo}</h4>
                        <span class="scheduled-date">
                            <i class="fas fa-calendar"></i>
                            ${new Date(scheduledDate).toLocaleString('es-PE')}
                        </span>
                    </div>
                    <div class="scheduled-platforms">
                        ${platforms.map(p => `<span class="platform-badge">${p}</span>`).join('')}
                    </div>
                    <div class="scheduled-actions">
                        <button class="btn-icon" onclick="calendar.editSchedule('${postId}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="calendar.deleteSchedule('${postId}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Agregar estilos para scheduled items
        if (!document.getElementById('scheduled-styles')) {
            const style = document.createElement('style');
            style.id = 'scheduled-styles';
            style.textContent = `
                .scheduled-item {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                }
                .scheduled-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: start;
                    margin-bottom: 0.5rem;
                }
                .scheduled-header h4 {
                    color: var(--primary-color);
                    font-size: 1.1rem;
                    margin: 0;
                }
                .scheduled-date {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .scheduled-platforms {
                    display: flex;
                    gap: 5px;
                    margin-bottom: 0.5rem;
                    flex-wrap: wrap;
                }
                .platform-badge {
                    background: rgba(99, 102, 241, 0.2);
                    color: var(--primary-color);
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-size: 0.85rem;
                }
                .scheduled-actions {
                    display: flex;
                    gap: 5px;
                    justify-content: flex-end;
                }
                .btn-icon {
                    background: transparent;
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    padding: 8px 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-icon:hover {
                    background: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }
                .empty-state {
                    text-align: center;
                    padding: 2rem;
                    color: var(--text-secondary);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Navegar mes anterior
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    // Navegar mes siguiente
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }

    // Editar programación
    editSchedule(postId) {
        alert('Función de edición en desarrollo');
        // TODO: Implementar edición de programación
    }

    // Eliminar programación
    async deleteSchedule(postId) {
        if (!confirm('¿Eliminar este post programado?')) {
            return;
        }

        try {
            // Eliminar del backend
            await googleBackend.deleteScheduledPost(postId);
            
            // Recargar posts programados
            await this.loadScheduledPosts();
            
            // Re-renderizar
            this.renderCalendar();
            this.renderScheduledPosts();
            
            alert('✅ Post eliminado correctamente');
        } catch (error) {
            console.error('Error eliminando post:', error);
            alert('❌ Error al eliminar el post');
        }
    }

    // Recargar todo el calendario
    async refresh() {
        await this.loadScheduledPosts();
        this.renderCalendar();
    }
}

// Instancia global
const calendar = new CalendarManager();

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => calendar.init());
} else {
    calendar.init();
}
