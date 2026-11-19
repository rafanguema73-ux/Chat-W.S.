
document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll(".page");

    // Navegación entre las secciones
    function showPage(pageId) {
        const target = document.getElementById(pageId);

        if (!target || !target.classList.contains("page")) {
            return;
        }

        pages.forEach(page => {
            page.style.display = "none";
            page.classList.remove("active");
        });

        target.style.display = "block";
        target.classList.add("active");

        history.replaceState(null, "", "#" + pageId);
    }

    // Activar enlaces del menú
    document.querySelectorAll(
        'a[href^="#"], [data-page], [data-target]'
    ).forEach(element => {

        element.addEventListener("click", event => {

            const pageId =
                element.dataset.page ||
                element.dataset.target ||
                element.getAttribute("href")?.substring(1);

            if (
                pageId &&
                document.getElementById(pageId)?.classList.contains("page")
            ) {
                event.preventDefault();
                showPage(pageId);
            }

        });

    });

    // Abrir la sección inicial
    const requestedPage = location.hash.substring(1);

    if (
        requestedPage &&
        document.getElementById(requestedPage)?.classList.contains("page")
    ) {
        showPage(requestedPage);
    } else if (pages.length > 0) {
        showPage(pages[0].id);
    }

    // Navegación del historial
    window.addEventListener("popstate", () => {
        const pageId = location.hash.substring(1);

        if (pageId) {
            showPage(pageId);
        }
    });

    console.log("CHAT W.S. iniciado correctamente.");

});
