class AIAgentsPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 14;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.progressFill = document.querySelector('.progress-fill');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
    }
    
    init() {
        this.updateSlide(1);
        this.bindEvents();
        this.updateProgressBar();
        this.updateNavButtons();
        console.log('ИИ-агенты презентация загружена - 7 слайдов');
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
            }
        });
        
        // Slide indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index + 1);
            });
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        }, { passive: true });
        
        // Mouse wheel navigation (throttled)
        let wheelTimeout = null;
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            if (wheelTimeout) return;
            
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    this.nextSlide();
                } else if (e.deltaY < 0) {
                    this.previousSlide();
                }
                wheelTimeout = null;
            }, 300);
        }, { passive: false });
        
        // Prevent context menu on long press
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
    
    handleSwipe(startX, startY, endX, endY) {
        const threshold = 50;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.previousSlide();
            }
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides && slideNumber !== this.currentSlide) {
            const direction = slideNumber > this.currentSlide ? 'forward' : 'backward';
            this.currentSlide = slideNumber;
            this.updateSlide(slideNumber, direction);
            this.updateProgressBar();
            this.updateNavButtons();
            this.updateIndicators();
        }
    }
    
    updateSlide(slideNumber, direction = 'forward') {
        // Remove active class from all slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            
            // Set initial transform based on direction
            if (direction === 'forward') {
                slide.style.transform = index + 1 === slideNumber ? 'translateX(100px)' : 'translateX(-100px)';
            } else {
                slide.style.transform = index + 1 === slideNumber ? 'translateX(-100px)' : 'translateX(100px)';
            }
        });
        
        // Activate target slide with delay for smooth transition
        setTimeout(() => {
            const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
            if (targetSlide) {
                targetSlide.classList.add('active');
                targetSlide.style.transform = 'translateX(0)';
            }
            
            // Start element animations
            setTimeout(() => {
                this.animateSlideElements(slideNumber);
            }, 200);
        }, 50);
    }
    
    animateSlideElements(slideNumber) {
        const currentSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (!currentSlideElement) return;
        
        switch(slideNumber) {
            case 1:
                this.animateDefinitionsAndTable(currentSlideElement);
                break;
            case 2:
                this.animateSigns(currentSlideElement);
                break;
            case 3:
                this.animateProsAndCons(currentSlideElement);
                break;
            case 4:
                this.animateTimeline(currentSlideElement);
                break;
            case 5:
                this.animateMaturityLevels(currentSlideElement);
                break;
            case 6:
                this.animateArchitecture(currentSlideElement);
                break;
            case 7:
                this.animateProblems(currentSlideElement);
                break;
        }
    }
    
    animateDefinitionsAndTable(slideElement) {
        const definitionCards = slideElement.querySelectorAll('.definition-card');
        const table = slideElement.querySelector('.comparison-table');
        
        definitionCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
        
        if (table) {
            table.style.opacity = '0';
            table.style.transform = 'translateY(40px)';
            
            setTimeout(() => {
                table.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                table.style.opacity = '1';
                table.style.transform = 'translateY(0)';
            }, 600);
        }
    }
    
    animateSigns(slideElement) {
        const signItems = slideElement.querySelectorAll('.sign-item');
        
        signItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.95)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    }
    
    animateProsAndCons(slideElement) {
        const prosSection = slideElement.querySelector('.pros-section');
        const consSection = slideElement.querySelector('.cons-section');
        
        [prosSection, consSection].forEach((section, index) => {
            if (section) {
                section.style.opacity = '0';
                section.style.transform = `translateX(${index === 0 ? '-50px' : '50px'})`;
                
                setTimeout(() => {
                    section.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                    section.style.opacity = '1';
                    section.style.transform = 'translateX(0)';
                    
                    // Animate list items
                    const listItems = section.querySelectorAll('li');
                    listItems.forEach((li, liIndex) => {
                        li.style.opacity = '0';
                        li.style.transform = 'translateX(20px)';
                        
                        setTimeout(() => {
                            li.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                            li.style.opacity = '1';
                            li.style.transform = 'translateX(0)';
                        }, liIndex * 100);
                    });
                }, index * 200);
            }
        });
    }
    
    animateTimeline(slideElement) {
        const timelineItems = slideElement.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const isOdd = index % 2 === 0;
            item.style.opacity = '0';
            item.style.transform = `translateX(${isOdd ? '-50px' : '50px'}) translateY(20px)`;
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0) translateY(0)';
            }, index * 120);
        });
    }
    
    animateMaturityLevels(slideElement) {
        const levelCards = slideElement.querySelectorAll('.level-card');
        const criteriaItems = slideElement.querySelectorAll('.criteria-item');
        
        levelCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
        
        setTimeout(() => {
            criteriaItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 80);
            });
        }, 600);
    }
    
    animateArchitecture(slideElement) {
        const archComponents = slideElement.querySelectorAll('.arch-component');
        
        archComponents.forEach((component, index) => {
            component.style.opacity = '0';
            component.style.transform = 'translateY(30px) scale(0.8)';
            
            setTimeout(() => {
                component.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                component.style.opacity = '1';
                component.style.transform = 'translateY(0) scale(1)';
            }, index * 80);
        });
    }
    
    animateProblems(slideElement) {
        const problemItems = slideElement.querySelectorAll('.problem-item');
        
        problemItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-60px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 150);
        });
    }
    
    updateProgressBar() {
        const progressPercent = (this.currentSlide / this.totalSlides) * 100;
        this.progressFill.style.width = `${progressPercent}%`;
    }
    
    updateNavButtons() {
        // Update button states
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        
        // Update button text
        if (this.currentSlide === this.totalSlides) {
            this.nextBtn.innerHTML = 'Завершить <span>✓</span>';
        } else {
            this.nextBtn.innerHTML = 'Вперед <span>›</span>';
        }
        
        if (this.currentSlide === 1) {
            this.prevBtn.innerHTML = '<span>‹</span> Начало';
        } else {
            this.prevBtn.innerHTML = '<span>‹</span> Назад';
        }
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index + 1 === this.currentSlide) {
                indicator.classList.add('active');
            }
        });
    }
    
    // Utility methods
    getCurrentSlideTitle() {
        const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"] h1`);
        return currentSlideElement ? currentSlideElement.textContent : `Слайд ${this.currentSlide}`;
    }
    
    getSlideProgress() {
        return {
            current: this.currentSlide,
            total: this.totalSlides,
            percentage: Math.round((this.currentSlide / this.totalSlides) * 100)
        };
    }
}

// Auto-presentation class (extended functionality)
class AutoAIAgentsPresentation extends AIAgentsPresentation {
    constructor(autoPlayInterval = 10000) {
        super();
        this.autoPlayInterval = autoPlayInterval;
        this.autoPlayTimer = null;
        this.isAutoPlaying = false;
        this.isPaused = false;
    }
    
    startAutoPlay() {
        this.isAutoPlaying = true;
        this.isPaused = false;
        this.scheduleNextSlide();
        console.log('Автопроигрывание запущено');
    }
    
    stopAutoPlay() {
        this.isAutoPlaying = false;
        this.isPaused = false;
        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        console.log('Автопроигрывание остановлено');
    }
    
    pauseAutoPlay() {
        this.isPaused = true;
        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        console.log('Автопроигрывание приостановлено');
    }
    
    resumeAutoPlay() {
        if (this.isAutoPlaying && this.isPaused) {
            this.isPaused = false;
            this.scheduleNextSlide();
            console.log('Автопроигрывание возобновлено');
        }
    }
    
    scheduleNextSlide() {
        if (this.isAutoPlaying && !this.isPaused) {
            this.autoPlayTimer = setTimeout(() => {
                if (this.currentSlide < this.totalSlides) {
                    this.nextSlide();
                    this.scheduleNextSlide();
                } else {
                    this.stopAutoPlay();
                    console.log('Презентация завершена');
                }
            }, this.autoPlayInterval);
        }
    }
    
    goToSlide(slideNumber) {
        super.goToSlide(slideNumber);
        
        // Restart autoplay if it was active
        if (this.isAutoPlaying) {
            this.pauseAutoPlay();
            setTimeout(() => this.resumeAutoPlay(), 1000);
        }
    }
}

// Utility functions
function showNavigationHelp() {
    const helpMessage = `
Управление презентацией:

Клавиатура:
• ← → ↑ ↓ - переключение слайдов
• Пробел - следующий слайд
• Home - первый слайд
• End - последний слайд

Мышь:
• Кнопки "Назад"/"Вперед"
• Клик по индикаторам слайдов
• Колесо мыши

Сенсорные устройства:
• Свайп влево/вправо

Текущий слайд: ${window.presentation.getCurrentSlideTitle()}
Прогресс: ${window.presentation.getSlideProgress().percentage}%
`;
    
    alert(helpMessage);
}

function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create standard presentation
    window.presentation = new AIAgentsPresentation();
    
    // Optional: Create auto-presentation (uncomment to enable)
    // window.presentation = new AutoAIAgentsPresentation(8000); // 8 seconds per slide
    // window.presentation.startAutoPlay();
    
    // Global helper functions
    window.nextSlide = () => window.presentation.nextSlide();
    window.prevSlide = () => window.presentation.previousSlide();
    window.goToSlide = (n) => window.presentation.goToSlide(n);
    window.showHelp = showNavigationHelp;
    window.toggleFullscreen = toggleFullscreen;
    
    // Additional keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F1') {
            e.preventDefault();
            showNavigationHelp();
        } else if (e.key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
        } else if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            // Toggle autoplay
            if (window.presentation instanceof AutoAIAgentsPresentation) {
                if (window.presentation.isAutoPlaying) {
                    window.presentation.stopAutoPlay();
                } else {
                    window.presentation.startAutoPlay();
                }
            }
        }
    });
    
    // Log initialization
    console.log('='.repeat(50));
    console.log('ИИ-агенты: Презентация загружена');
    console.log('Слайдов:', window.presentation.totalSlides);
    console.log('Управление: F1 - справка, F11 - полный экран');
    console.log('='.repeat(50));
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (window.presentation instanceof AutoAIAgentsPresentation) {
        if (document.hidden) {
            window.presentation.pauseAutoPlay();
        } else {
            window.presentation.resumeAutoPlay();
        }
    }
});

// Prevent accidental page reload
window.addEventListener('beforeunload', (e) => {
    const progress = window.presentation?.getSlideProgress();
    if (progress && progress.current > 1 && progress.current < progress.total) {
        e.preventDefault();
        e.returnValue = 'Вы уверены, что хотите покинуть презентацию?';
        return e.returnValue;
    }
});