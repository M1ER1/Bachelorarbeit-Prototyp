export function initDynamicFields() {
  document.getElementById("addContact").addEventListener("click", function () {
    addInputField("contactPersonsContainer", "contactPerson", "Hauptansprechpartner*in");
  });
  document.getElementById("addExternalService").addEventListener("click", function () {
    addInputField("externalServicesContainer", "externalService", "Externer Dienstleister");
  });

  document.getElementById("copyButton").addEventListener("click", function () {
    const text = document.getElementById("optimizedOutput").innerText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.textContent = "Text kopiert!";
        setTimeout(() => this.textContent = "Text Kopieren", 2000);
      });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      this.textContent = "Text kopiert!";
      setTimeout(() => this.textContent = "Text Kopieren", 2000);
    }
  });

  document.getElementById("resetButton").addEventListener("click", function () {
    document.getElementById("clientName").value = "";
    document.getElementById("auditComment").value = "";
    document.querySelectorAll("input.contactPerson").forEach(el => el.value = "");
    document.querySelectorAll("input.externalService").forEach(el => el.value = "");

    document.getElementById("maskedOutput").innerText = "Noch keine Maskierung durchgeführt.";
    document.getElementById("maskedOutput").contentEditable = "false";
    document.getElementById("optimizedOutput").innerText = "Noch keine Optimierung durchgeführt.";

    document.getElementById("optimizeButton").style.display = "none";
    document.getElementById("copyButton").style.display = "none";
  });
}

function addInputField(containerId, className, placeholder) {
  const container = document.getElementById(containerId);
  const div = document.createElement("div");
  div.classList.add("d-flex", "mt-2");
  div.innerHTML = `<input type="text" class="form-control ${className}" placeholder="${placeholder}">
                   <button type="button" class="btn btn-remove" onclick="this.parentElement.remove()">X</button>`;
  container.appendChild(div);
}