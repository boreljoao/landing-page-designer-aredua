// --- Lógica da Tela de Carregamento ---
(function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    // Adiciona classe loading ao body
    body.classList.add('loading');
    
    // Função para verificar se todas as imagens da página foram carregadas
    function checkAllImagesLoaded() {
        const images = document.querySelectorAll('img');
        
        return new Promise((resolve) => {
            if (images.length === 0) {
                resolve();
                return;
            }
            
            let loadedCount = 0;
            const totalImages = images.length;
            
            function imageLoaded() {
                loadedCount++;
                if (loadedCount >= totalImages) {
                    resolve();
                }
            }
            
            // Verifica cada imagem
            images.forEach(img => {
                if (img.complete) {
                    imageLoaded();
                } else {
                    img.addEventListener('load', imageLoaded);
                    img.addEventListener('error', imageLoaded); // Continua mesmo se der erro
                }
            });
        });
    }
    
    // Função para esconder a tela de carregamento
    function hideLoadingScreen() {
        loadingScreen.classList.add('hidden');
        body.classList.remove('loading');
        
        // Remove a tela de carregamento do DOM após a transição
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }
    
    // Aguarda o carregamento completo da página
    window.addEventListener('load', function() {
        // Aguarda um pouco mais para garantir que tudo foi processado
        setTimeout(() => {
            hideLoadingScreen();
        }, 100);
    });
    
    // Fallback: esconde a tela após 8 segundos mesmo se algo der errado
    setTimeout(hideLoadingScreen, 8000);
})();

document.addEventListener("DOMContentLoaded", function() {
    // --- Início da Lógica do Banner de Rolagem ---
    const scrollingText = document.querySelector(".scrolling-text");
    if (scrollingText) {
        // Duplica o conteúdo para criar um efeito de rolagem infinito e contínuo
        scrollingText.innerHTML += scrollingText.innerHTML;
    }
    // --- Fim da Lógica do Banner de Rolagem ---


    // --- Início da Lógica do Menu Mobile ---
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".close-btn");
    
    if (mobileMenuBtn && mobileMenu && closeBtn) {
        mobileMenuBtn.addEventListener("click", function() {
            mobileMenu.classList.add("active");
        });
    
        closeBtn.addEventListener("click", function() {
            mobileMenu.classList.remove("active");
        });
    
        // Fecha o menu ao clicar em um link
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", function() {
                mobileMenu.classList.remove("active");
            });
        });
    }
    // --- Fim da Lógica do Menu Mobile ---

    // --- Início da Lógica de Detecção de Cor e Alteração da Logo ---
    function detectBodyColorAndChangeLogo() {
        const body = document.body;
        const navLogo = document.querySelector('nav .nav-logo img');
        const loadingLogo = document.querySelector('.loading-logo');
        
        console.log('Nav logo encontrada:', navLogo); // Debug
        console.log('Loading logo encontrada:', loadingLogo); // Debug
        
        if (!navLogo && !loadingLogo) {
            console.log('Nenhuma logo encontrada'); // Debug
            return;
        }
        
        // Obtém a cor de fundo computada do body
        const bodyBackgroundColor = window.getComputedStyle(body).backgroundColor;
        console.log('Cor de fundo do body:', bodyBackgroundColor); // Debug
        
        // Converte a cor RGB para valores numéricos
        const rgbMatch = bodyBackgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            
            // Calcula o brilho da cor (fórmula padrão)
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            console.log('Brilho calculado:', brightness); // Debug
            
            // Define os caminhos das logos
            const logoMarrom = '/assets/media/images/logo.png';
            const logoBranca = '/assets/media/images/logo_white.png';
            
            // Se o fundo for escuro (brilho < 128), usa logo branca
            // Se o fundo for claro (brilho >= 128), usa logo marrom
            const logoPath = brightness < 128 ? logoBranca : logoMarrom;
            console.log('Logo escolhida:', logoPath); // Debug
            
            // Altera a logo na navegação
            if (navLogo) {
                navLogo.src = logoPath;
                console.log('Logo da navegação alterada para:', logoPath); // Debug
            }
            
            // Altera a logo na tela de carregamento
            if (loadingLogo) {
                loadingLogo.src = logoPath;
                console.log('Logo do loader alterada para:', logoPath); // Debug
            }
        } else {
            console.log('Não foi possível extrair valores RGB da cor:', bodyBackgroundColor); // Debug
        }
    }
    
    // Função para tornar a logo clicável
    function makeLogoClickable() {
        const navLogoContainer = document.querySelector('nav .nav-logo');
        const loadingLogoContainer = document.querySelector('.loading-content');
        
        if (navLogoContainer) {
            // Remove a imagem da div e adiciona como link
            const img = navLogoContainer.querySelector('img');
            if (img) {
                const link = document.createElement('a');
                link.href = '/index.html';
                link.style.textDecoration = 'none';
                link.style.display = 'block';
                
                // Move a imagem para dentro do link
                navLogoContainer.appendChild(link);
                link.appendChild(img);
            }
        }
        
        if (loadingLogoContainer) {
            const loadingImg = loadingLogoContainer.querySelector('.loading-logo');
            if (loadingImg) {
                const link = document.createElement('a');
                link.href = '/index.html';
                link.style.textDecoration = 'none';
                link.style.display = 'block';
                
                // Move a imagem para dentro do link
                loadingLogoContainer.appendChild(link);
                link.appendChild(loadingImg);
            }
        }
    }
    
    // Executa a detecção quando a página carrega
    detectBodyColorAndChangeLogo();
    makeLogoClickable();
    
    // Executa a detecção quando a janela é redimensionada (caso haja mudanças de layout)
    window.addEventListener('resize', detectBodyColorAndChangeLogo);
    
    // Executa a detecção quando há mudanças no CSS (caso haja mudanças dinâmicas de cor)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                detectBodyColorAndChangeLogo();
            }
        });
    });
    
    // Observa mudanças no body
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    // --- Fim da Lógica de Detecção de Cor e Alteração da Logo ---


    // --- Início da Lógica do Link de E-mail ---
    const email = "borelduda@gmail.com";
    const emailLink = document.getElementById("emailLink");

    if (emailLink) {
        function isMobile() {
          // Testa o userAgent para verificar se é um dispositivo móvel comum
          return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
        }

        if (isMobile()) {
          // Em dispositivos móveis, usa o protocolo mailto: para abrir o app de e-mail padrão
          emailLink.href = `mailto:${email}`;
        } else {
          // Em desktops, abre o Gmail em uma nova aba com o e-mail do destinatário pré-preenchido
          emailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
          emailLink.target = "_blank";
          emailLink.rel = "noopener noreferrer";
        }
    }
    // --- Fim da Lógica do Link de E-mail ---


    // --- Início da Lógica das Abas de Serviços ---
    const categoryBtns = document.querySelectorAll(".service-category-btn");
    const serviceDescriptions = document.querySelectorAll(".service-description");
    const socialMediaPlans = document.querySelector(".pricing-plans.social-media-plans");

    // Define o estado inicial na carga da página: Social Media fica ativo.
    document.getElementById("social-media").style.display = "block";
    if (socialMediaPlans) {
        socialMediaPlans.style.display = 'grid'; // Garante que os planos de social media estão visíveis
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            // Remove a classe 'active' de todos os botões e a adiciona ao clicado
            categoryBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");

            // Esconde todas as seções de descrição de serviço
            serviceDescriptions.forEach(desc => {
                desc.style.display = "none";
            });

            // Mostra apenas a seção de descrição de serviço correspondente ao botão clicado
            const activeDescription = document.getElementById(category);
            if (activeDescription) {
                activeDescription.style.display = "block";
            }

            // Lógica para exibir os planos de preços:
            // Mostra os planos principais de Social Media SOMENTE se a aba "Social Media" estiver ativa.
            // Para todas as outras abas (Design, Papelaria Criativa, Consultoria), os planos principais são escondidos.
            if (category === 'social-media') {
                if (socialMediaPlans) {
                    socialMediaPlans.style.display = 'grid';
                }
            } else {
                if (socialMediaPlans) {
                    socialMediaPlans.style.display = 'none';
                }
            }
        });
    });
    // --- Fim da Lógica das Abas de Serviços ---
});

// --- Lightbox para ver imagem completa do portfólio ---
document.addEventListener('DOMContentLoaded', function() {
    // Cria o modal/lightbox único se não existir
    let modal = document.getElementById('image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.innerHTML = `
            <span id="close-modal">&times;</span>
            <img id="modal-img" src="" alt="Imagem completa" />
            <div id="modal-info">
                <h3 id="modal-title"></h3>
                <p id="modal-description"></p>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const imgEl = modal.querySelector('#modal-img');
    const closeBtn = modal.querySelector('#close-modal');
    const modalTitle = modal.querySelector('#modal-title');
    const modalDescription = modal.querySelector('#modal-description');

    // Função para detectar se é dispositivo móvel/tablet
    function isMobileOrTablet() {
        return window.innerWidth <= 1024 || /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }

    // Abrir modal ao clicar no botão (desktop)
    document.querySelectorAll('.view-full-image').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const imgUrl = this.href;
            imgEl.src = imgUrl;
            
            // Buscar título e descrição do item do portfólio
            const portfolioItem = this.closest('.portfolio-item');
            const title = portfolioItem.querySelector('h3').textContent;
            const description = portfolioItem.querySelector('p').textContent;
            
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Funcionalidade para mobile/tablet - clicar no item inteiro
    if (isMobileOrTablet()) {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', function(e) {
                // Não abrir se clicar no botão "Ver imagem completa"
                if (e.target.classList.contains('view-full-image')) {
                    return;
                }
                
                const imgUrl = this.querySelector('img').src;
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                
                imgEl.src = imgUrl;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // Fechar modal ao clicar no botão de fechar
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        imgEl.src = '';
        modalTitle.textContent = '';
        modalDescription.textContent = '';
        document.body.style.overflow = 'auto';
    });

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            imgEl.src = '';
            modalTitle.textContent = '';
            modalDescription.textContent = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            imgEl.src = '';
            modalTitle.textContent = '';
            modalDescription.textContent = '';
            document.body.style.overflow = 'auto';
        }
    });
});