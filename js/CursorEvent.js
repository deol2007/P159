AFRAME.registerComponent("cursor-listener", {
    schema: {
        selectedItemId: { default: "", type: "string" },
    },

    init: function () {
        this.handleMouseEnterEvents();
        this.handleMouseLeaveEvents();
        this.handleMouseClickEvents();
        this.update();
    },

    handleMouseClickEvents: function () {
        this.el.addEventListener("click", evt => {
            const placesContainer = document.querySelector("#places-container");
            const { state } = placesContainer.getAttribute("tour");

            if (state === "places-list") {
                const id = this.el.getAttribute("id");
                const selectedItemId = [
                    "batman",
                    "thor",
                    "mandalorian",
                    "spiderman"
                ];
                if (selectedItemId) {
                    fadeBackgroundEl.setAttribute("visible", true);
                    fadeBackgroundEl.setAttribute("info-banner", {
                        itenId: selectedItemId,
                    });
                    titleEl.setAttribute("visible", false);
                    cursorEl.setAttribute("position", { x: 0, y: 0, z: -1 });
                    cursorEl.setAttribute("geometry", {
                        radiusInner: 0.08,
                        radiusOuter: 0.12,
                    });
                }
            }
        })
    },
    handleMouseEnterEvents: function () {
        this.el.addEventListener("mouseenter", () => {
            const id = this.el.getAttribute("id");
            const comicsId = ["batman", "thor", "mandalorian", "spiderman"];

            if (comicsId.includes(id)) {
                const comicContainerEL = document.querySelector("#comics-container");
                comicContainerEL.setAttribute("cursor-listener", {
                    selectedItemId: id,
                });
                this.el.setAttribute("material", {
                    color: "#D76B30",
                    opacity: 1,
                });
            }
        });
    },

    handleMouseLeaveEvents: function () {
        this.el.addEventListener("mouseleave", () => {
            const { selectedItemId } = this.data;
            if (selectedItemId) {
                const el = document.querySelector(`#${selectedItemId}`);
                const id = el.getAttribute("id");
                if (id == selectedItemId) {
                    el.setAttribute("material", {
                        color: "#0077CC",
                        opacity: 1,
                    });
                }
            }
        });
    },
    update: function () {
        const fadeBackgroundEl = document.querySelector("#fadeBackground");
        c = fadeBackgroundEl.children;
        if (c.length > 0) {
            var i;
            for (i = 0; i <= c.length; i++) {
                fadeBackgroundEl.removeChild(c[i]);
            }
        } else {
            this.handleMouseClickEvents();
        }
    }
});