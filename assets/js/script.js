console.log(
    "David's Computing Portfolio Loaded"
);
"use strict";

/*
=========================================================
DAVID'S BSC COMPUTING PORTFOLIO
Shared JavaScript
=========================================================
*/


document.addEventListener("DOMContentLoaded", () => {
    setCurrentYear();
    highlightActiveNavigation();
    createBackToTopButton();
    wrapTablesForMobile();
});


/**
 * Adds the current year to any element using:
 * data-current-year
 */
function setCurrentYear() {
    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    const currentYear = new Date().getFullYear();

    yearElements.forEach((element) => {
        element.textContent = currentYear;
    });
}


/**
 * Adds the active class to the navigation link
 * matching the current page.
 */
function highlightActiveNavigation() {
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navigationLinks = document.querySelectorAll(
        ".navigation a"
    );

    navigationLinks.forEach((link) => {
        const linkPage = link
            .getAttribute("href")
            ?.split("/")
            .pop()
            .toLowerCase();

        if (!linkPage) {
            return;
        }

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}


/**
 * Creates a back-to-top button.
 */
function createBackToTopButton() {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Back to top");
    button.textContent = "↑";

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            button.classList.add("visible");
        } else {
            button.classList.remove("visible");
        }
    });

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/**
 * Wraps tables in a scrollable container.
 * Existing wrapped tables are ignored.
 */
function wrapTablesForMobile() {
    const tables = document.querySelectorAll("table");

    tables.forEach((table) => {
        const parent = table.parentElement;

        if (
            parent &&
            parent.classList.contains("table-wrapper")
        ) {
            return;
        }

        const wrapper = document.createElement("div");

        wrapper.className = "table-wrapper";
        wrapper.setAttribute(
            "role",
            "region"
        );
        wrapper.setAttribute(
            "aria-label",
            "Scrollable table"
        );
        wrapper.setAttribute(
            "tabindex",
            "0"
        );

        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
}