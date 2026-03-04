const PASS_HASH = "5b484d8b2799daf74779ce686501847d4a08b5e917c1e8395e1da7f7e73bce0d";

const PRESETS = {
  benign: {
    failedAuth: 1,
    requestBurst: 48,
    geoSpread: 1,
    anomalyScore: 14,
    lateralHops: 1,
    policyDrift: 8,
    provider: "aws",
  },
  portscan: {
    failedAuth: 5,
    requestBurst: 520,
    geoSpread: 3,
    anomalyScore: 61,
    lateralHops: 3,
    policyDrift: 22,
    provider: "gcp",
  },
  credential: {
    failedAuth: 14,
    requestBurst: 180,
    geoSpread: 4,
    anomalyScore: 74,
    lateralHops: 5,
    policyDrift: 38,
    provider: "azure",
  },
  ddos: {
    failedAuth: 6,
    requestBurst: 980,
    geoSpread: 5,
    anomalyScore: 90,
    lateralHops: 4,
    policyDrift: 44,
    provider: "aws",
  },
};

const EMAIL_TEMPLATE = [
  "Subject: Password request for SIF-CCA research download",
  "",
  "Hello Md Anisur Rahman Chowdhury,",
  "I followed the GitHub profile, subscribed to the YouTube channel, and would like the password for the encrypted SIF-CCA research package.",
  "Name:",
  "Institution:",
  "Purpose of use:",
  "",
  "Regards,",
  "",
].join("\n");

function byId(id) {
  return document.getElementById(id);
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function toggleNav() {
  const links = byId("nav-links");
  if (links) {
    links.classList.toggle("open");
  }
}

function closeNav() {
  const links = byId("nav-links");
  if (links) {
    links.classList.remove("open");
  }
}

function openGate() {
  const overlay = byId("download-gate");
  if (!overlay) {
    return;
  }
  overlay.classList.remove("is-hidden");
  goToGateStep(1);
}

function closeGate() {
  const overlay = byId("download-gate");
  if (overlay) {
    overlay.classList.add("is-hidden");
  }
}

function goToGateStep(step) {
  document.querySelectorAll("[data-gate-step]").forEach((node) => {
    node.classList.add("is-hidden");
  });
  const active = document.querySelector(`[data-gate-step="${step}"]`);
  if (active) {
    active.classList.remove("is-hidden");
  }
  const error = byId("gate-error");
  if (error) {
    error.classList.add("is-hidden");
  }
}

function gateStepOneReady() {
  const git = byId("gate-github");
  const yt = byId("gate-youtube");
  return Boolean(git && git.checked && yt && yt.checked);
}

function gateStepTwoReady() {
  const req = byId("gate-request");
  return Boolean(req && req.checked);
}

function continueGate(step) {
  if (step === 2 && !gateStepOneReady()) {
    return;
  }
  if (step === 3 && !gateStepTwoReady()) {
    return;
  }
  goToGateStep(step);
}

async function unlockDownloads() {
  const input = byId("gate-password");
  const error = byId("gate-error");
  if (!input) {
    return;
  }
  const hash = await sha256(input.value.trim());
  if (hash === PASS_HASH) {
    goToGateStep(4);
    input.value = "";
    return;
  }
  if (error) {
    error.classList.remove("is-hidden");
  }
  input.value = "";
}

function syncGateButtons() {
  const step1 = byId("gate-next-1");
  const step2 = byId("gate-next-2");
  if (step1) {
    step1.disabled = !gateStepOneReady();
  }
  if (step2) {
    step2.disabled = !gateStepTwoReady();
  }
}

function copyEmailTemplate(button) {
  navigator.clipboard.writeText(EMAIL_TEMPLATE).then(() => {
    if (!button) {
      return;
    }
    const prev = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = prev;
    }, 1500);
  });
}

function fillPreset(name) {
  const preset = PRESETS[name];
  if (!preset) {
    return;
  }
  Object.entries(preset).forEach(([key, value]) => {
    const input = byId(key);
    if (input) {
      input.value = value;
    }
  });
  runSimulation();
}

function classify(score, anomalyScore, requestBurst, policyDrift, failedAuth) {
  if (requestBurst >= 800 || score >= 85) {
    return {
      label: "DDoS / volumetric surge",
      action: "Throttle function concurrency, isolate ingress path, and fan out provider-side mitigations.",
      decision: "Block and absorb",
    };
  }

  if (failedAuth >= 10 || (score >= 68 && anomalyScore >= 70)) {
    return {
      label: "Credential abuse / brute force",
      action: "Force step-up identity checks, revoke active tokens, and quarantine the principal.",
      decision: "Challenge and isolate",
    };
  }

  if (policyDrift >= 35 || (score >= 58 && anomalyScore >= 55)) {
    return {
      label: "Cross-cloud policy anomaly",
      action: "Pause inter-cloud trust propagation and re-apply OPA policy from the unified control plane.",
      decision: "Contain and re-sync",
    };
  }

  if (score >= 42) {
    return {
      label: "Reconnaissance / port-scan pattern",
      action: "Rate-limit source IPs, increase logging depth, and enforce narrow least-privilege paths.",
      decision: "Constrain",
    };
  }

  return {
    label: "Benign / low risk",
    action: "Allow traffic and keep continuous verification active.",
    decision: "Allow",
  };
}

function providerRoute(provider, score) {
  const routes = {
    aws: "AWS Lambda receives the event first, then forwards policy state to Azure and GCP.",
    azure: "Azure Functions executes the first response and propagates identity state through the unified control plane.",
    gcp: "Google Cloud Functions handles ingress scoring, then triggers cross-cloud remediation hooks.",
  };

  const base = routes[provider] || routes.aws;
  if (score >= 70) {
    return `${base} Emergency mode enables synchronized policy push across all providers.`;
  }
  return base;
}

function runSimulation() {
  const values = {
    failedAuth: Number(byId("failedAuth")?.value || 0),
    requestBurst: Number(byId("requestBurst")?.value || 0),
    geoSpread: Number(byId("geoSpread")?.value || 1),
    anomalyScore: Number(byId("anomalyScore")?.value || 0),
    lateralHops: Number(byId("lateralHops")?.value || 0),
    policyDrift: Number(byId("policyDrift")?.value || 0),
    provider: byId("provider")?.value || "aws",
  };

  const score = Math.min(
    100,
    Math.round(
      values.failedAuth * 3 +
        values.requestBurst * 0.05 +
        values.geoSpread * 4 +
        values.anomalyScore * 0.35 +
        values.lateralHops * 4 +
        values.policyDrift * 0.35
    )
  );

  const result = classify(
    score,
    values.anomalyScore,
    values.requestBurst,
    values.policyDrift,
    values.failedAuth
  );

  const riskFill = byId("riskFill");
  if (riskFill) {
    riskFill.style.width = `${score}%`;
  }

  const scoreValue = byId("scoreValue");
  const resultLabel = byId("resultLabel");
  const resultAction = byId("resultAction");
  const resultDecision = byId("resultDecision");
  const resultProvider = byId("resultProvider");
  const statusChip = byId("statusChip");

  if (scoreValue) {
    scoreValue.textContent = String(score);
  }
  if (resultLabel) {
    resultLabel.textContent = result.label;
  }
  if (resultAction) {
    resultAction.textContent = result.action;
  }
  if (resultDecision) {
    resultDecision.textContent = result.decision;
  }
  if (resultProvider) {
    resultProvider.textContent = providerRoute(values.provider, score);
  }
  if (statusChip) {
    statusChip.textContent = score >= 70 ? "High-risk multi-cloud event" : "Simulated SIF-CCA assessment";
  }
}

function initCharts() {
  if (!window.Chart) {
    return;
  }

  const perf = byId("performanceChart");
  if (perf) {
    new Chart(perf, {
      type: "bar",
      data: {
        labels: ["RF", "XGBoost", "CNN", "LSTM", "SIF-CCA"],
        datasets: [
          {
            label: "Accuracy (%)",
            data: [94.85, 95.41, 95.56, 96.14, 98],
            backgroundColor: ["#c3d3e4", "#a7c4df", "#8bb5d7", "#5f94bf", "#0f766e"],
            borderRadius: 10,
          },
          {
            label: "ROC-AUC",
            data: [94.2, 95.9, 95.1, 96.6, 99],
            backgroundColor: ["#f1ddbb", "#eec98f", "#eabf73", "#e4a146", "#d97706"],
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 90,
            max: 100,
            ticks: {
              callback(value) {
                return `${value}%`;
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }

  const cloud = byId("cloudChart");
  if (cloud) {
    new Chart(cloud, {
      type: "bar",
      data: {
        labels: ["AWS Lambda", "Azure Functions", "Google Cloud", "Cross-cloud avg"],
        datasets: [
          {
            label: "Avg latency (ms)",
            data: [135, 142, 135, 135],
            backgroundColor: ["#17395c", "#285f8f", "#4d8fc8", "#0f766e"],
            borderRadius: 10,
          },
          {
            label: "Cold start (ms)",
            data: [221, 263, 249, 244],
            backgroundColor: ["#d9c4a5", "#d5b17b", "#d18e52", "#d97706"],
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }
}

function bindActions() {
  document.querySelectorAll("[data-open-gate]").forEach((button) => {
    button.addEventListener("click", openGate);
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.querySelectorAll(".preset-btn").forEach((button) => {
    button.addEventListener("click", () => fillPreset(button.dataset.preset));
  });

  ["gate-github", "gate-youtube", "gate-request"].forEach((id) => {
    const input = byId(id);
    if (input) {
      input.addEventListener("change", syncGateButtons);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindActions();
  syncGateButtons();
  runSimulation();
  initCharts();
});
