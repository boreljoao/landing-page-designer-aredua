// --- Lógica da Tela de Carregamento ---
(function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    // Adiciona classe loading ao body
    body.classList.add('loading');
    
    // Tempo mínimo de exibição da tela de carregamento (2 segundos)
    const minLoadingTime = 2000;
    const startTime = Date.now();
    
    // Função para verificar se as imagens principais foram carregadas
    function checkMainImagesLoaded() {
        const heroImage = document.querySelector('.hero-image-container img');
        const logoImage = document.querySelector('.nav-logo img');
        
        return new Promise((resolve) => {
            let loadedCount = 0;
            const totalImages = 2;
            
            function imageLoaded() {
                loadedCount++;
                if (loadedCount >= totalImages) {
                    resolve();
                }
            }
            
            // Verifica se a imagem do hero já foi carregada
            if (heroImage && heroImage.complete) {
                imageLoaded();
            } else if (heroImage) {
                heroImage.addEventListener('load', imageLoaded);
                heroImage.addEventListener('error', imageLoaded); // Continua mesmo se der erro
            } else {
                imageLoaded();
            }
            
            // Verifica se a logo já foi carregada
            if (logoImage && logoImage.complete) {
                imageLoaded();
            } else if (logoImage) {
                logoImage.addEventListener('load', imageLoaded);
                logoImage.addEventListener('error', imageLoaded); // Continua mesmo se der erro
            } else {
                imageLoaded();
            }
        });
    }
    
    // Função para esconder a tela de carregamento
    function hideLoadingScreen() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            body.classList.remove('loading');
            
            // Remove a tela de carregamento do DOM após a transição
            setTimeout(() => {
                if (loadingScreen && loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }, remainingTime);
    }
    
    // Aguarda o carregamento das imagens principais e então esconde a tela
    checkMainImagesLoaded().then(hideLoadingScreen);
    
    // Fallback: esconde a tela após 5 segundos mesmo se as imagens não carregarem
    setTimeout(hideLoadingScreen, 5000);
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