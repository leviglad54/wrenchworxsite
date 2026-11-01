const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-header nav");

function closeMenu() {
  navigation?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuToggle) {
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open menu");
  }
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .getElementById(button.dataset.scrollTo)
      ?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  });
});

const requestForm = document.querySelector(".contact form");
const submitUrl = requestForm?.dataset.submitUrl;
const requestFields = requestForm?.querySelector(".request-fields");
const successMessage = requestForm?.querySelector(".success");
const errorMessage = requestForm?.querySelector(".form-error");
const submitButton = requestForm?.querySelector('[type="submit"]');

requestForm?.querySelector(".send-another")?.addEventListener("click", () => {
  successMessage.hidden = true;
  requestFields.hidden = false;
  requestForm.reset();
});

requestForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!submitUrl || !requestForm.reportValidity()) return;
  errorMessage.hidden = true;
  submitButton.disabled = true;
  submitButton.firstChild.textContent = "SENDING… ";
  try {
    const response = await fetch(submitUrl, {
      method: "POST",
      body: new FormData(requestForm),
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    if (!response.ok) throw new Error("Request failed");
    requestFields.hidden = true;
    successMessage.hidden = false;
  } catch {
    errorMessage.textContent =
      "We couldn’t send your request. Please check the details and try again.";
    errorMessage.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.firstChild.textContent = "REQUEST A CALLBACK ";
  }
});
