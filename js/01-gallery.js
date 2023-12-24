import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector(".gallery");

let lightBoxInstance;

function renderGallery(galleryItems) {
  galleryList.innerHTML = galleryItems.map(getImageHtml).join("");
}

function getImageHtml({ preview, original, description }) {
  return `<li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-original="${original}"
                    alt="${description}"
                    />
                </a>
            </li>`;
}

function closeLightBoxHandler(event) {
  if (event.code === "Escape" && lightBoxInstance) {
    lightBoxInstance.close();
  }
}

renderGallery(galleryItems);

galleryList.addEventListener("click", handleImageClick);

function handleImageClick(e) {
  e.preventDefault();

  const image = e.target;

  if (!image.classList.contains("gallery__image")) {
    return;
  }

  lightBoxInstance = basicLightbox.create(
    `
        <img src="${image.dataset.original}">
    `,
    {
      onShow: () => {
        window.addEventListener("keydown", closeLightBoxHandler);
      },
      onClose: () => {
        window.removeEventListener("keydown", closeLightBoxHandler);
      },
    }
  );

  lightBoxInstance.show();
}
