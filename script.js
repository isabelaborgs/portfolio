/*Ativa tooltips do Bootstrap*/
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

/*Observa seções em interseção e as classifica*/
const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            let visivel = entry.isIntersecting;
            if (visivel) {
                entry.target.classList.remove("slide-out");
                entry.target.classList.add("slide-in");
            } else {
                entry.target.classList.remove("slide-in");
                entry.target.classList.add("slide-out");
            }
        });
    },
    {threshold: 0.4}
);

const secoes = document.querySelectorAll(".secao");

secoes.forEach(secao => {
    sectionObserver.observe(secao);
})

/*Altera tema da página para escuro ou claro e salva no armazenamento local*/
function salvarTema(tema) {
    localStorage.setItem("tema", JSON.stringify(tema));
}

function recuperarTema() {
    return JSON.parse(localStorage.getItem("tema")) || "";
}

function definirTemaClaro() {
    const listaModal = document.querySelectorAll(".modal-header");
    temaCSS.setAttribute("href", "tema-claro.css");
    imgLogotipo.setAttribute("src", "img/logo-clara1.png");
    btAlterarTema.classList.add("modo-claro");
    btAlterarTema.classList.remove("modo-escuro");
    listaModal.forEach(modal => modal.removeAttribute("data-bs-theme"));
    barraNavegacao.removeAttribute("data-bs-theme");
}

function definirTemaEscuro() {
    const listaModal = document.querySelectorAll(".modal-header");
    temaCSS.setAttribute("href", "tema-escuro.css");
    imgLogotipo.setAttribute("src", "img/logo-escura1.png");
    btAlterarTema.classList.add("modo-escuro");
    btAlterarTema.classList.remove("modo-claro");
    listaModal.forEach(modal => modal.setAttribute("data-bs-theme", "dark"));
    barraNavegacao.setAttribute("data-bs-theme", "dark");
}

function alterarTema() {
    btAlterarTema.addEventListener("click", () => {
        if (btAlterarTema.classList.contains("modo-escuro")) {
            definirTemaClaro();
            salvarTema("claro");
        } else if (btAlterarTema.classList.contains("modo-claro")) {
            definirTemaEscuro();
            salvarTema("escuro");
        }
    })
}

function aplicarTemaSalvo() {
    let tema = recuperarTema();
    if (tema === "escuro") {
        definirTemaEscuro();
    } else if (tema === "claro") {
        definirTemaClaro();
    }
}

/*Filtra projetos por categoria e destaca filtro atual */
function exibirProjetos(filtro) {
    const listaProjetos = document.querySelectorAll(".projeto");
    listaProjetos.forEach(projeto => {
        if (projeto.classList.contains(filtro)) {
            projeto.style.display = "block";
        } else {
            projeto.style.display = "none";
        }
    })
}

function filtrarProjetos() {
    filtroTodos.addEventListener("click", () => {
        exibirProjetos("projeto");
    });

    filtroDevWeb.addEventListener("click", () => {
        exibirProjetos("dev-web");
    });

    filtroFrontEnd.addEventListener("click", () => {
        exibirProjetos("front-end");
    })
}

function ativarLinksFiltros() {
    const filtros = navFiltrosProjetos.querySelectorAll(".filtro");
    for (let i = 0; i < filtros.length; i++) {
        filtros[i].addEventListener("click", () => {
            let clicado = filtros[i];
            for (let j = 0; j < filtros.length; j++) {
                if (filtros[j] === clicado) {
                    filtros[j].classList.add("ativo")
                } else  {
                    filtros[j].classList.remove('ativo')
                }
            }
        })
    }
}

alterarTema();
aplicarTemaSalvo();
filtrarProjetos();
ativarLinksFiltros();