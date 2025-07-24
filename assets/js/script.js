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
    // Cria o modal/lightbox se não existir
    let modal = document.getElementById('portfolio-image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'portfolio-image-modal';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.85)';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '9999';
        modal.style.flexDirection = 'column';
        modal.style.cursor = 'zoom-out';
        modal.innerHTML = `
            <span id="close-portfolio-modal" style="position:absolute;top:30px;right:40px;font-size:2.5em;color:#fff;cursor:pointer;z-index:10001">&times;</span>
            <img id="portfolio-modal-img" src="" alt="Imagem do portfólio" style="max-width:90vw;max-height:80vh;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.4);background:#fff;" />
        `;
        modal.style.display = 'none';
        modal.style.display = 'flex';
        modal.style.display = 'none';
        document.body.appendChild(modal);
    }
    const imgEl = modal.querySelector('#portfolio-modal-img');
    const closeBtn = modal.querySelector('#close-portfolio-modal');

    // Abrir modal ao clicar no botão
    document.querySelectorAll('.view-full-image').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const imgUrl = btn.getAttribute('data-img');
            imgEl.src = imgUrl;
            modal.style.display = 'flex';
        });
    });

    // Fechar modal ao clicar no botão de fechar
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        modal.style.display = 'none';
        imgEl.src = '';
    });

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            imgEl.src = '';
        }
    });
});