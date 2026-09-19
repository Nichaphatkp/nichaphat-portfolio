console.log("JS LOADED");
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeBtn.textContent = "🌙";
        } else {
            themeBtn.textContent = "☀️";
        }
    });
}


// ===== MOUSE ORANGE GLOW =====

document.addEventListener("DOMContentLoaded", () => {

    const glow = document.querySelector(".mouse-glow");

    if (!glow) return;

    document.addEventListener("mousemove", (event) => {

        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;

    });

});


// ==========================================
// NAVBAR ACTIVE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");


    function setActive(id) {

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + id) {
                link.classList.add("active");
            }

        });

    }


    function updateActiveNav() {

        const navbarHeight =
            document.querySelector(".navbar")?.offsetHeight || 80;

        const scrollPosition =
            window.scrollY + navbarHeight + 120;


        // ==========================================
        // ถ้าเลื่อนถึงล่างสุด
        // ให้ Languages Active ทันที
        // ==========================================

        const isBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 10;


        if (isBottom) {

            const lastSection =
                sections[sections.length - 1];

            if (lastSection) {
                setActive(lastSection.id);
            }

            return;
        }


        // ==========================================
        // Active ตาม Section ปกติ
        // ==========================================

        let currentSection = "";


        sections.forEach(section => {

            if (scrollPosition >= section.offsetTop) {

                currentSection = section.id;

            }

        });


        if (currentSection) {

            setActive(currentSection);

        }

    }


    // ==========================================
    // เมื่อกด Navbar
    // ==========================================

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            const targetID =
                this.getAttribute("href").replace("#", "");

            setActive(targetID);

        });

    });


    // Scroll
    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    // โหลดครั้งแรก
    updateActiveNav();

});
// ==========================================
// LANGUAGE TOGGLE EN <-> TH
// ==========================================

const languageBtn = document.getElementById("languageBtn");

let currentLanguage =
    localStorage.getItem("language") || "en";


function applyLanguage(lang) {

    document
        .querySelectorAll("[data-en][data-th]")
        .forEach(element => {

            element.textContent =
                lang === "en"
                ? element.dataset.en
                : element.dataset.th;

        });


    languageBtn.textContent =
        lang === "en" ? "EN" : "TH";


    document.documentElement.lang =
        lang === "en" ? "en" : "th";


    localStorage.setItem("language", lang);

    currentLanguage = lang;
}


// กดปุ่มเพื่อสลับภาษา
languageBtn.addEventListener("click", function () {

    const nextLanguage =
        currentLanguage === "en" ? "th" : "en";

    applyLanguage(nextLanguage);

});


// โหลดภาษาครั้งแรก
applyLanguage(currentLanguage);
// =========================================================
// SAFE PROJECT SCROLL REVEAL
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const page = document.querySelector(".project-page");

    const sections =
        document.querySelectorAll(
            ".project-page .project-detail-section"
        );


    if (!page || !sections.length) {
        return;
    }


    /* เปิด reveal mode เฉพาะเมื่อ JS ทำงานจริง */
    page.classList.add("reveal-ready");
    if (sections[0]) {
    sections[0].classList.add("show-section");
}


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show-section"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.08,
                rootMargin:
                    "0px 0px -30px 0px"
            }

        );


    sections.forEach((section) => {

        observer.observe(section);

    });

});
