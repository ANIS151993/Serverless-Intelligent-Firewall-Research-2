# Serverless Intelligent Firewall Research-2 (SIF-CCA)

## Towards a Serverless Intelligent Firewall: Integrating Cross-Cloud Adaptation, AI-Driven Security, and Zero-Trust Architectures

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-0f766e)](https://anis151993.github.io/Serverless-Intelligent-Firewall-Research-2/)
[![Research-1](https://img.shields.io/badge/Research--1-Reference-17395c)](https://anis151993.github.io/Serverless-Intelligent-Firewall-Research-1/)
[![Status](https://img.shields.io/badge/SmartCloud%202026-Under%20Review-d97706)](https://cloud-conf.net/smartcloud/2026/index.html)

This repository is the second research artifact in the **Serverless Intelligent Firewall** series.  
It extends Research-1 into a practical multi-cloud model with:

- hybrid XGBoost + BiGRU detection
- cross-cloud serverless orchestration (AWS, Azure, GCP)
- unified zero-trust control plane
- graph-rich interactive website and implementation guidance

## Live Research Portal

- Main portal: <https://anis151993.github.io/Serverless-Intelligent-Firewall-Research-2/>
- HTML report: <https://anis151993.github.io/Serverless-Intelligent-Firewall-Research-2/report.html>
- Poster: <https://anis151993.github.io/Serverless-Intelligent-Firewall-Research-2/poster.html>
- Combined implementation guide: <https://anis151993.github.io/Serverless-Intelligent-Firewall-Research-2/implementation.html>

---

## Research-1 to Research-2 Linkage

```mermaid
flowchart LR
    R1[Research-1\nLSTM IDS Foundation] --> R2[Research-2\nSIF-CCA Hybrid Engine]
    R1 --> B1[Serverless IDS baseline]
    R2 --> B2[Cross-cloud orchestration]
    R2 --> B3[Unified zero-trust control plane]
    B1 --> G[Real-time production blueprint]
    B2 --> G
    B3 --> G
```

| Dimension | Research-1 | Research-2 |
|---|---|---|
| Core model | LSTM | XGBoost + BiGRU fusion |
| Scope | IDS in serverless context | IDS + multi-cloud orchestration + UCP |
| Cloud model | Early single-cloud orientation | AWS + Azure + GCP |
| Zero-trust | Conceptual integration | Unified control plane with consistency metrics |
| Portal maturity | Website + report + poster | Expanded analytics + implementation blueprint |

---

## Key Results (Graphical)

```mermaid
xychart-beta
    title "Accuracy Comparison (%)"
    x-axis [RF, XGBoost, CNN, LSTM, SIF-CCA]
    y-axis "Accuracy" 90 --> 100
    bar [94.85, 95.41, 95.56, 96.14, 98.00]
```

```mermaid
pie showData
    title Attack Mix (Illustrative from evaluation set)
    "BENIGN" : 38
    "DDoS" : 21
    "DoS" : 19
    "PortScan" : 17
    "Other" : 5
```

```mermaid
xychart-beta
    title "Cross-Cloud Runtime Latency (ms)"
    x-axis [AWS, Azure, GCP, CrossCloud]
    y-axis "Latency" 120 --> 160
    bar [135, 142, 135, 135]
```

---

## Interactive Architecture (Graphical)

```mermaid
flowchart TD
    A[Traffic + Telemetry Ingestion]
    B[Feature Engineering + Normalization]
    C1[Research-1 Path\nLSTM Baseline]
    C2[Research-2 Path\nXGBoost + BiGRU]
    D[Response Orchestrator\nAWS/Azure/GCP]
    E[Unified Control Plane\nPolicy + Identity]
    F[ALLOW / CHALLENGE / BLOCK]

    A --> B
    B --> C1
    B --> C2
    C1 --> D
    C2 --> D
    D --> E
    E --> F
```

The website also includes an **interactive architecture explorer** (`/docs/index.html`) where each phase can be selected to view operational details.

---

## Real-Time Implementation Guidance (Combined Documentation)

The implementation documentation combines both research phases and is available at:

- Web version: [`docs/implementation.html`](docs/implementation.html)
- Repository reference: [`IMPLEMENTATION_GUIDE.md`](IMPLEMENTATION_GUIDE.md)

Implementation progression:

```mermaid
timeline
    title Combined Production Rollout
    Phase 1 : Build baseline IDS path from Research-1 (LSTM)
    Phase 2 : Introduce hybrid fusion path from Research-2 (XGBoost + BiGRU)
    Phase 3 : Enable multi-cloud serverless orchestration
    Phase 4 : Enforce unified zero-trust control plane
    Phase 5 : Run pilot, validate SLOs, then scale
```

---

## Repository Structure

```text
.
├── docs/
│   ├── index.html                 # Main portal (interactive charts + architecture explorer)
│   ├── report.html                # Public report with extended analytics
│   ├── poster.html                # Poster-style overview
│   ├── implementation.html        # Combined real-time implementation guide
│   ├── styles.css
│   ├── script.js
│   └── assets/
│       ├── images/
│       └── papers/                # Encrypted archives only
├── scripts/
│   └── check-js.sh                # Local JavaScript syntax checker
├── IMPLEMENTATION_GUIDE.md
└── README.md
```

---

## Protected Artifacts Policy

Raw manuscript files are intentionally not published in plaintext.  
Public distribution uses encrypted archives only:

- `docs/assets/papers/SIF-CCA-Research-Paper-Encrypted.zip`
- `docs/assets/papers/SIF-CCA-LaTeX-Source-Encrypted.zip`

Access policy:

1. Follow GitHub profile: <https://github.com/ANIS151993>
2. Subscribe to overview video/channel: <https://youtu.be/O_pLEz7cyaY>
3. Send password request to: `engr.aanis@gmail.com`
4. Enter password in website gate before download

---

## Deployment

Use GitHub Pages branch deployment:

1. Repository Settings -> Pages
2. Source: `Deploy from a branch`
3. Branch: `main`
4. Folder: `/docs`

---

## Local JavaScript Syntax Check

Run one command from the repository root:

```bash
bash scripts/check-js.sh
```

Optional custom Node binary:

```bash
NODE_BIN=/absolute/path/to/node bash scripts/check-js.sh
```

---

## Primary Links

- Research-1 website: <https://anis151993.github.io/Serverless-Intelligent-Firewall-Research-1/>
- Research-1 repository: <https://github.com/ANIS151993/Serverless-Intelligent-Firewall-Research-1>
- Research-2 website: <https://anis151993.github.io/Serverless-Intelligent-Firewall-Research-2/>
