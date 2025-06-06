
const hamburgerMenu = document.getElementById('hamburger-menu')
const menuItens = document.querySelectorAll('.menuItem')
const faleConoscoButton = document.querySelector('.faleconosco-button')
const themePreferenceMessage = document.querySelector('.theme-preference-message')

setTimeout(() => {
    themePreferenceMessage.classList.add('hidden')
}, 5000)

const changeThemeButton = document.querySelector(".change-theme");
const darkThemeLink = document.getElementById("dark-theme");

changeThemeButton.addEventListener("click", () => {
    if (darkThemeLink.disabled) {
        darkThemeLink.removeAttribute("disabled");
        localStorage.setItem("theme", "dark");
    } else {
        darkThemeLink.setAttribute("disabled", "true");
        localStorage.setItem("theme", "light");
    }
});

const menuElement = document.getElementById('menu')
for (const menu of menuItens) {
    menu.addEventListener('click', () => {
        if (menuElement.style.width === '100%') {
            menuElement.style.width = '0'
            menuElement.style.padding = '0'
        }
    })
}

faleConoscoButton.addEventListener('click', () => {
    if (menuElement.style.width === '100%') {
        menuElement.style.width = '0'
        menuElement.style.padding = '0'
    }
})

hamburgerMenu.addEventListener('click', () => {
    const menu = document.getElementById('menu')

    if (menu.style.width != '100%') {
        menu.style.width = '100%'
        menu.style.padding = '25px 10dvw'
    } else {
        menu.style.padding = '0'
        menu.style.width = '0'
    }
})


// Variáveis de controle
let activeIndex = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const testimonialContainer = document.querySelector('.testimonials-container');
const dots = document.querySelectorAll('.testimonial-dot');
const prevButton = document.querySelector('.testimonial-control.prev');
const nextButton = document.querySelector('.testimonial-control.next');

// Função para atualizar a navegação e o estado dos botões
function updateNavigation() {
    // Atualiza a posição do slider
    const offset = -activeIndex * 100;
    testimonialContainer.style.transform = `translateX(${offset}%)`;

    // Ativa/desativa os botões de navegação
    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;

    // Atualiza os pontos de navegação
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Função para ir ao slide anterior
function prevSlide() {
    if (activeIndex > 0) {
        activeIndex--;
        updateNavigation();
    }
}

// Função para ir ao próximo slide
function nextSlide() {
    if (activeIndex < slides.length - 1) {
        activeIndex++;
        updateNavigation();
    }
}

// Função para ir a um slide específico
function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        activeIndex = index;
        updateNavigation();
    }
}

// Inicializa a navegação no primeiro slide
updateNavigation();

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos campos
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();
    let infoMessage = document.getElementById("infoMessage");
    let submitButton = document.getElementById("submit-button");

    submitButton.toggleAttribute('disabled')

    // Validação básica
    if (!name || !email || !message) {
        infoMessage.style.display = "block";
        infoMessage.style.color = "red";
        infoMessage.textContent = "Por favor, preencha todos os campos obrigatórios!";
        return;
    }

    // Monta a mensagem para a API
    let messageApi = `
    Mensagem recebida através do formulário do Dev Soluciona
    
    Nome: ${name}
    E-mail: ${email}
    Telefone: ${phone}
    Mensagem: ${message}`;

    // Enviar requisição POST usando fetch
    fetch("https://soluciona.inf.br/api/sendEvol.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageApi })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao enviar a mensagem!");
            }
            return response.json();
        })
        .then(() => {
            infoMessage.style.display = "block";
            infoMessage.style.backgroundColor = "rgb(0 222 23)";
            infoMessage.style.color = "black";
            infoMessage.textContent = "Mensagem enviada com sucesso, logo entraremos em contato!";

            // Limpa os campos do formulário
            document.getElementById("contactForm").reset();
            submitButton.removeAttribute('disabled')

            // Esconde a mensagem depois de alguns segundos
            setTimeout(() => { infoMessage.style.display = "none"; }, 5000);
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
            infoMessage.style.display = "block";
            infoMessage.style.color = "white";
            infoMessage.style.fontWeight = "bold";
            infoMessage.style.backgroundColor = "rgb(253 51 36)";
            infoMessage.textContent = "Erro ao enviar a mensagem. Tente novamente mais tarde!";
            submitButton.removeAttribute('disabled')
        });
});

document.getElementById('footer-copyright').innerHTML = `&copy; ${new Date().getFullYear()} Soluciona Assessoria. Todos os direitos reservados.`