const intialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profilePostBtn = document.querySelector("#profile-post-btn");

const editModal = document.querySelector("#edit-profile-modal");
const modalEditNameInput = editModal.querySelector("#name-edit");
const modalEditDescriptionInput = editModal.querySelector("#description-edit");
const editModalSubmitButton = editModal.querySelector(".modal__submit-btn");
const editFormEl = document.forms["edit-profile-form"];
const closeBtn = document.querySelectorAll(".modal__close-btn");

const cardModal = document.querySelector("#card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalBtn = document.querySelector(".profile__post-btn");
const cardSubmitBtn = document.querySelector("#card-submit-btn");
const cardNameInput = cardModal.querySelector("#add-card-name");
const cardLinkInput = cardModal.querySelector("#add-card-link");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");
const previewModalImg = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

function getcardEL(data) {
  const cardEL = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardNameEl = cardEL.querySelector(".card__title");
  const cardImg = cardEL.querySelector(".card__image");
  const cardLikeBtn = cardEL.querySelector(".card__like-button");
  const cardDeleteBtn = cardEL.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });
  cardDeleteBtn.addEventListener("click", () => {
    cardEL.remove();
  });
  cardImg.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImg.src = data.link;
    previewModalImg.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  return cardEL;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

closeBtn.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = modalEditNameInput.value;
  profileDescription.textContent = modalEditDescriptionInput.value;
  disableButton(profilePostBtn, settings);
  closeModal(editModal);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardEL = getcardEL(inputValues);
  cardsList.prepend(cardEL);
  evt.target.reset();
  disableButton(cardSubmitBtn, settings);
  closeModal(cardModal);
}

profileEditButton.addEventListener("click", () => {
  modalEditNameInput.value = profileName.textContent;
  modalEditDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editFormEl,
    [modalEditNameInput, modalEditDescriptionInput],
    settings
  );
  openModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  modalEditNameInput.value = profileName.textContent;
  modalEditDescriptionInput.value = profileDescription.textContent;
  openModal(cardModal);
});

editFormEl.addEventListener("submit", submitProfileForm);
cardForm.addEventListener("submit", submitCardForm);

intialCards.forEach((card) => {
  const cardEL = getcardEL(card);
  cardsList.append(cardEL);
});
