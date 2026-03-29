**Period:** 2024.12 - 2025.02 (3 months)

**Affiliation:** Com2us / ECO Division (Client Development)

**Role:** Intern, Solo Project, LLM and RAG-based Chatbot Development

## Overview

This project was an internal employee-search AI chatbot built to help employees quickly find the right person in charge of a specific task using natural language questions. Because detailed task information for each employee was fragmented across documents and people despite the company's large workforce, finding the right owner required excessive time and process. To solve this, I built an LLM and RAG-based retrieval system and a self-updating pipeline based on developers' weekly reports.

![Com2us result 01](/content/portfolio/com2us-employee-search/result01.png "w=1080 h=620")
![Com2us result 02](/content/portfolio/com2us-employee-search/result02.png "w=1080 h=620")

## Skills

- Python
- LLM
- Embedding Model
- Fine-tuning
- RAG
- Milvus
- FastAPI

## Pain Point & Project Goals

- **Existing problem:** Although the company had a large workforce, information about which employee was actually responsible for which detailed project tasks was fragmented across documents and people, so finding the right owner took too much time and too many steps.
- **Data quality issue:** I built the RAG system using weekly reports, but because each person wrote in a different format, data imbalance occurred during embedding and retrieval accuracy remained low.
- **Domain-specific issue:** In a game development organization, many terms are highly similar, making it difficult for the embedding model to clearly distinguish between different projects and tasks.
- **Goal:** Build an AI chatbot that could find the person in charge of a specific task within 5 seconds through natural language questions, while continuously reflecting weekly updates and improving retrieval accuracy over time.

## Development Details

- **Employee search chatbot development:** I implemented an internal search chatbot that recommends the most relevant person in charge when a user enters a task or project.
- **Report normalization automation:** I built a pipeline that summarizes weekly reports with an LLM and normalizes them into JSON format, automating the preprocessing of highly inconsistent source documents.
- **Self-updating RAG architecture:** I vectorized the normalized reports, stored them in the embedding space, and designed a self-updating RAG structure so that newly accumulated weekly data would be continuously reflected.
- **Embedding model fine-tuning:** To solve the low discriminative power between similar terms, I built a dataset from 10 years of former employee data and fine-tuned the embedding model.
- **Data flywheel proposal:** I proposed an internal reward program for developers who wrote detailed weekly reports, contributing to an operational structure that continuously brought in higher-quality data.

## Troubleshooting & Solving

- **Problem situation:** The initial chatbot embedded weekly reports as-is, so document format variation was large, and the abundance of similar game-development terminology often prevented it from accurately identifying the true owner of a task.
- **Cause analysis:** The key cause of weak retrieval quality was not just the model itself, but the imbalance of input data and the low discriminative power of domain-specific terminology.
- **Solution:** I built an automated pipeline that normalized and summarized weekly reports into JSON, then fine-tuned the embedding model using a 10-year dataset so that it could better distinguish meaning at the task and project level.
- **Result:** Cosine similarity and Recall@10 improved significantly, and after deployment the chatbot started being used not only by my team but also by other departments.

## Quantitative Results

- **Search quality improvement:** Improved cosine similarity by 22.7%, reaching 0.869.
- **Ranking performance improvement:** Improved Recall@10 by about 4.5x, while ndcg@10 also improved together.
- **Operational adoption:** Deployed the chatbot internally, where it began to be used by my division as well as other departments.
- **Data-focused insight:** Learned that the core of AI performance improvement is not only model changes, but also deep understanding of data, continuous data quality improvement, and experimentation across many conditions.
