import { maskName, applyColorClasses } from "./helpers.js";

export let globalMapping = new Map();

export function initMasking() {
  document.getElementById("maskButton").addEventListener("click", function () {
    const clientName = document.getElementById("clientName").value.trim();
    const contactPersons = Array.from(document.querySelectorAll(".contactPerson"))
      .map(el => el.value.trim())
      .filter(el => el);
    const externalServices = Array.from(document.querySelectorAll(".externalService"))
      .map(el => el.value.trim())
      .filter(el => el);
    const auditComment = document.getElementById("auditComment").value.trim();

    if (!clientName || !auditComment) {
      alert("Bitte geben Sie mindestens den Klientennamen und einen Kommentar ein.");
      return;
    }

    let maskedComment = auditComment;
    let mappingTable = new Map();

    maskedComment = maskName(clientName, "Klient", maskedComment, mappingTable);
    contactPersons.forEach((person, index) => {
      maskedComment = maskName(person, `Ansprechperson${index + 1}`, maskedComment, mappingTable);
    });
    externalServices.forEach((service, index) => {
      maskedComment = maskName(service, `Dienstleister${index + 1}`, maskedComment, mappingTable);
    });
    globalMapping = mappingTable;

    maskedComment = applyColorClasses(maskedComment);

    const maskedOutputDiv = document.getElementById("maskedOutput");
    maskedOutputDiv.innerHTML = maskedComment;
    // Nach der Maskierung wird der Bereich editierbar gemacht
    maskedOutputDiv.contentEditable = "true";

    document.getElementById("optimizeButton").style.display = "block";
  });
}