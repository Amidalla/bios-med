export function header(context = document) {
    const root = context.querySelector("header.header");
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    const toggleSticky = () => {
        root.classList.toggle("is-fixed", window.scrollY > 0);
    };

    window.addEventListener("scroll", toggleSticky, { passive: true });
    toggleSticky();



    const syncHeaderWithBody = () => {

        const bodyWidth = getComputedStyle(document.body).width;
        const bodyMarginRight = getComputedStyle(document.body).marginRight;


        root.style.width = bodyWidth;
        root.style.marginRight = bodyMarginRight;


        root.style.left = 'auto';
        root.style.right = 'auto';
    };


    const observer = new MutationObserver(syncHeaderWithBody);
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });


    const domObserver = new MutationObserver(syncHeaderWithBody);
    domObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    window.addEventListener('resize', syncHeaderWithBody);


    syncHeaderWithBody();

    root.addEventListener(
        "destroy",
        () => {
            window.removeEventListener("scroll", toggleSticky);
            window.removeEventListener("resize", syncHeaderWithBody);
            observer.disconnect();
            domObserver.disconnect();

            // Сбрасываем стили
            root.style.width = '';
            root.style.marginRight = '';
            root.style.left = '';
            root.style.right = '';
        },
        { once: true }
    );
}