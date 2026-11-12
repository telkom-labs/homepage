---
title: Spenditure
order: 2
status: Retired
since: Feb 2024
summary: "AI-assisted FinOps for Google Cloud: an answer engine for billing questions, live spend views and a 3D Cloud Map of deployments and their costs."
home_summary: AI answer engine for Google Cloud billing, built on MCP tools and Gemini, beside a 3D Cloud Map of deployments and costs.
lede: AI-assisted FinOps for Google Cloud. Teams see spend and infrastructure in one place and ask billing questions in plain language.
tags: [AI agents, MCP, Gemini, Google Cloud]
team: [griffin, platt]
platform: Google Cloud
features:
  - name: Answer engine
    text: Gemini-powered chat with in-process MCP tools resolves billing questions on its own.
  - name: Cloud Map
    text: A 3D map of deployments, combined with their costs.
  - name: Live spend views
    text: Spending and optimization views from BigQuery Billing Export data, read-only.
  - name: Reseller ready
    text: Multi-reseller tenancy and whitelabeling.
stack:
  - { label: Dashboard, value: "React, TypeScript" }
  - { label: API, value: "FastAPI, GraphQL, Firestore" }
  - { label: AI, value: "Gemini, MCP tools" }
  - { label: Hosting, value: Cloud Run behind Auth0 }
  - { label: Delivery, value: "Terraform, GitHub Actions" }
---
