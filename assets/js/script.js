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
        `;
        document.body.appendChild(modal);
    }
    
    const imgEl = modal.querySelector('#modal-img');
    const closeBtn = modal.querySelector('#close-modal');

    // Abrir modal ao clicar no botão
    document.querySelectorAll('.view-full-image').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const imgUrl = this.href; // Usa o href em vez de data-img
            imgEl.src = imgUrl;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Previne scroll da página
        });
    });

    // Fechar modal ao clicar no botão de fechar
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        imgEl.src = '';
        document.body.style.overflow = 'auto'; // Restaura scroll da página
    });

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            imgEl.src = '';
            document.body.style.overflow = 'auto'; // Restaura scroll da página
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            imgEl.src = '';
            document.body.style.overflow = 'auto'; // Restaura scroll da página
        }
    });
});