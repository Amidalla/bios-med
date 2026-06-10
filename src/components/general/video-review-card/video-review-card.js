// components/general/video-review-card/video-review-card.js

export function initReadMoreButtons() {
    // Только для экранов ≤ 759px
    if (window.innerWidth > 759) return;

    const readMoreButtons = document.querySelectorAll(".video-review-card__read-more");

    readMoreButtons.forEach((button) => {
        if (button.dataset.readMoreInitialized === "true") return;
        button.dataset.readMoreInitialized = "true";

        const wrapper = button.closest(".video-review-card__review-wrapper");
        const reviewElement = wrapper.querySelector(".video-review-card__review");
        if (!reviewElement) return;

        const checkIfNeeded = () => {
            const originalClamp = reviewElement.style.webkitLineClamp;
            reviewElement.style.webkitLineClamp = "unset";
            const fullHeight = reviewElement.scrollHeight;
            reviewElement.style.webkitLineClamp = originalClamp;

            const lineHeight = parseInt(getComputedStyle(reviewElement).lineHeight);
            const maxHeight = lineHeight * 2;

            if (fullHeight <= maxHeight + 2) {
                button.style.display = "none";
            } else {
                button.style.display = "inline-block";
            }

            reviewElement.style.webkitLineClamp = "";
        };

        setTimeout(checkIfNeeded, 100);

        button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isExpanded = button.dataset.expanded === "true";

            if (isExpanded) {
                reviewElement.classList.remove("expanded");
                button.textContent = "Читать больше";
                button.dataset.expanded = "false";
            } else {
                reviewElement.classList.add("expanded");
                button.textContent = "Свернуть";
                button.dataset.expanded = "true";
            }
        });

        const handleResize = () => {
            if (window.innerWidth > 759) {
                button.style.display = "none";
                reviewElement.classList.remove("expanded");
            } else {
                checkIfNeeded();
            }
        };

        window.addEventListener("resize", handleResize);
    });
}
