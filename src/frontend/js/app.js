import { initMasking } from "./masking.js";
import { initOptimization } from "./optimization.js";
import { initDynamicFields } from "./dynamicFields.js";

function initApp() {
  initMasking();
  initOptimization();
  initDynamicFields();
}

document.addEventListener("DOMContentLoaded", initApp);