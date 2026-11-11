document.querySelector("#year").textContent = new Date().getFullYear();
const contactDialog = document.querySelector("#contact-dialog");
const contactTrigger = document.querySelector(".contact-trigger");
const contactCloseButton = contactDialog.querySelector(".dialog-close");
contactTrigger.addEventListener("click", () => contactDialog.showModal());
contactCloseButton.addEventListener("click", () => contactDialog.close());
contactDialog.addEventListener("click", event => { if (event.target === contactDialog) contactDialog.close(); });
