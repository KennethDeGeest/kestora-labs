document.querySelector("#year").textContent = new Date().getFullYear();
const contactDialog = document.querySelector("#contact-dialog");
const contactTrigger = document.querySelector(".contact-trigger");
const contactCloseButton = contactDialog.querySelector(".dialog-close");
const contactStart = document.querySelector("#contact-start");
const supportStep = document.querySelector("#support-step");
const supportChoice = document.querySelector("#support-choice");
const supportBack = document.querySelector("#support-back");
const supportApp = document.querySelector("#support-app");
const supportSubmit = document.querySelector("#support-submit");

function showContactStart() {
  contactStart.hidden = false;
  supportStep.hidden = true;
  supportApp.value = "";
  supportSubmit.disabled = true;
}

contactTrigger.addEventListener("click", () => {
  showContactStart();
  contactDialog.showModal();
});
contactCloseButton.addEventListener("click", () => contactDialog.close());
contactDialog.addEventListener("click", event => { if (event.target === contactDialog) contactDialog.close(); });
supportChoice.addEventListener("click", () => {
  contactStart.hidden = true;
  supportStep.hidden = false;
  supportApp.focus();
});
supportBack.addEventListener("click", () => {
  showContactStart();
  supportChoice.focus();
});
supportApp.addEventListener("change", () => { supportSubmit.disabled = !supportApp.value; });
supportSubmit.addEventListener("click", () => {
  if (!supportApp.value) return;
  const subject = encodeURIComponent(`${supportApp.value} Support`);
  const body = encodeURIComponent(`Hi Kenneth,\n\nI’m contacting you about ${supportApp.value}.\n\n`);
  window.location.href = `mailto:degeestkenneth@gmail.com?subject=${subject}&body=${body}`;
});
