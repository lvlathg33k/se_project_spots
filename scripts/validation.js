const showInputError = (formEl, inputEl, errorMsg) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add("modal__input_type_error");
  errorEl.textContent = errorMsg;
  errorEl.classList.add("modal__input-error_active");
};

const hideInputError = (formEl, inputEl) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove("modal__input_type_error");
  errorEl.classList.remove("modal__input-error_active");
  errorEl.textContent = "";
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const disableButton = (buttonEl) => {
  buttonEl.disabled = true;
  buttonEl.classList.add("modal__submit-btn_inactive");
};

const resetValidation = (formEl, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input);
  });
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl);
  } else {
    buttonEl.classList.remove("modal__submit-btn_inactive");
    buttonEl.disabled = false;
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonEl = formEl.querySelector(".modal__submit-btn");
  toggleButtonState(inputList, buttonEl);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonEl);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
