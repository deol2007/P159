AFRAME.registerComponent("tour", {
  schema: {
    state: { type: "string", default: "places-list" },
    },

  init: function () {
    this.comicsContainer = this.el;
    this.createCards();
  },
  tick: function () {
    const { state } = this.el.getAttribute("tour");
    if (state === "view") {
      fadeBackgroundEl.setAttribute("visible", true);
      fadeBackgroundEl.setAttribute("info-banner",{
        itemId: selectedItemId,
      });
      titleEl.setAttribute("visible", false);
      cursorEl.setAttribute("position", { x: 0, y: 0, z: -1});
      cursorEl.setAttribute("geometry", {
        radiusInner: 0.08,
        radiusOuter: 0.12,
      });
    }

  },
  showView: function () {
    const { selectedComic } = this.data;
    const skyEl = document.querySelector("#main-container");
    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedComic}/place-0.jpg`,
      color: "white"
    });
  },
  createCards: function () {
    const thumbNailsRef = [
      {
        id: "batman",
        title: "Batman & Robin!",
        url: "./assets/thumbnails/batman.png",
      },
      {
        id: "thor",
        title: "Mighty Thor!",
        url: "./assets/thumbnails/thor.png",
      },

      {
        id: "mandalorian",
        title: "The Mandalorian!",
        url: "./assets/thumbnails/mandalorian.jpg",
      },
      {
        id: "spiderman",
        title: "The Amazing Spiderman!",
        url: "./assets/thumbnails/spiderman.jpg",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;


      const borderEl = this.createBorder(position, item.id);

      const thumbNail = this.createThumbNail(item);
      borderEl.appendChild(thumbNail);

      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.comicsContainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1,
    });

    entityEl.setAttribute("cursor-listener", {});

    return entityEl;
  },
  createThumbNail: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 9,
    });
    entityEl.setAttribute("material", { src: item.url });

    return entityEl;
  },
  createTitleEl: function (position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 70,
      color: "#e65100",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    
    return entityEl;
  },
});
