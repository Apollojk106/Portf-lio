// Botão Voltar ao Topo
const topButton = document.getElementById('topButton');

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topButton.classList.remove('hidden');
    } else {
        topButton.classList.add('hidden');
    }
};

topButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Suavizar rolagem para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Botão de cola
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Copiado: " + text);
    }).catch(err => {
        console.error("Erro ao copiar:", err);
    });
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;

    document.body.appendChild(toast);

    // Mostra a notificação
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Remove após 2 segundos
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 2000);
}

// Função principal
document.addEventListener('DOMContentLoaded', function() {
    const mainHeader = document.getElementById('main-header');
    const heroSection = document.querySelector('.hero-section');
    const headerSpacer = document.getElementById('header-spacer');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Configurações de sensibilidade
    const SCROLL_TRIGGER = 50; // Header encolhe após 50px
    const HIDE_TRIGGER = 100; // Header some após 100px quando rola para baixo
    let lastScrollTop = 0;
    let headerVisible = true;
    
    // Observer para animações ao entrar na viewport
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                if (entry.target.classList.contains('skill-card') || 
                    entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('certificate-card')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, observerOptions);
    
    // Observar todos os elementos que devem ser animados
    document.querySelectorAll('.skill-card, .project-card, .certificate-card, .reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Controle do header - CORRIGIDO
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // HEADER ENCOLHIDO (sempre que passar do trigger)
        if (scrollTop > SCROLL_TRIGGER) {
            mainHeader.classList.add('scrolled');
            
            // Esconde o menu mobile se estiver aberto
            if (mobileMenu.classList.contains('block')) {
                mobileMenu.classList.remove('block');
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
            }
        } else {
            mainHeader.classList.remove('scrolled');
        }
        
        // HEADER MOSTRAR/ESCONDER (só quando rolar para cima/baixo)
        // Verifica se está rolando para baixo e passou do trigger para esconder
        if (scrollTop > lastScrollTop && scrollTop > HIDE_TRIGGER) {
            // Rola para baixo - esconde o header
            if (headerVisible) {
                mainHeader.style.transform = 'translateY(-100%)';
                headerVisible = false;
            }
        } 
        // Verifica se está rolando para cima
        else if (scrollTop < lastScrollTop) {
            // Rola para cima - mostra o header
            if (!headerVisible) {
                mainHeader.style.transform = 'translateY(0)';
                headerVisible = true;
            }
        }
        
        // Se estiver no topo da página, garante que o header está visível
        if (scrollTop <= HIDE_TRIGGER) {
            mainHeader.style.transform = 'translateY(0)';
            headerVisible = true;
        }
        
        lastScrollTop = scrollTop;
        
        // Atualiza link ativo no menu
        updateActiveMenuLink();
    });
    
    // Menu mobile
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('block');
        mobileMenuButton.classList.toggle('active');
    });
    
    // Fecha menu mobile ao clicar em um link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('block');
            mobileMenuButton.classList.remove('active');
        });
    });
    
    // Atualiza o link ativo no menu
    function updateActiveMenuLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollTop + 70;
        
        // Remove classe ativa de todos os links
        document.querySelectorAll('.header-link, .mobile-link').forEach(link => {
            link.classList.remove('active', 'text-yellow-300', 'font-bold');
        });
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Adiciona classe ativa ao link correspondente
                const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
                activeLinks.forEach(link => {
                    link.classList.add('active', 'text-yellow-300', 'font-bold');
                });
            }
        });
    }
    
    // Copiar para área de transferência (mantido para compatibilidade)
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copiado para a área de transferência: ' + text);
        });
    };
    
    // Botão para voltar ao topo
    const topBtn = document.getElementById('topButton');
    if (topBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                topBtn.classList.remove('hidden');
            } else {
                topBtn.classList.add('hidden');
            }
        });
        
        topBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Ajusta o espaçamento do header
    function adjustHeaderSpacer() {
        const heroHeight = heroSection.offsetHeight;
        if (window.innerWidth >= 768) {
            headerSpacer.style.paddingTop = (heroHeight + 60) + 'px';
        } else {
            headerSpacer.style.paddingTop = (heroHeight * 0.8) + 'px';
        }
    }
    
    // Inicialização
    window.addEventListener('load', function() {
        adjustHeaderSpacer();
        updateActiveMenuLink();
        
        // Adiciona classe inicial para elementos já visíveis
        document.querySelectorAll('.skill-card, .project-card, .certificate-card').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                el.classList.add('active');
            }
        });
    });
    
    window.addEventListener('resize', adjustHeaderSpacer);
    
    // Inicializa o link ativo
    updateActiveMenuLink();
    
    // Garante que o header está visível no carregamento
    mainHeader.style.transform = 'translateY(0)';
    headerVisible = true;
});