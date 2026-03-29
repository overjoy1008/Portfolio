## Overview

This project was an internal AI chatbot designed to help employees find the right person in charge of a task more quickly. I developed it during my Com2us internship under the mentoring of a senior AI/ML engineer, and the final system was actually used by internal developers.

## Problem

In practice, project ownership changed often and work was spread across many teams. That made it costly to find the right owner for a task. The goal was to answer natural language questions and retrieve the most relevant employee based on internal weekly reports.

## System Design

![Com2us result 01](/content/portfolio/com2us-employee-search/result01.png "w=1080 h=620")
![Com2us result 02](/content/portfolio/com2us-employee-search/result02.png "w=1080 h=620")

- Weekly reports were summarized by Qwen2.5-32B-Instruct-GPTQ-Int4
- The summaries were normalized into JSON format
- The normalized outputs were vectorized and stored in an embedding space
- User questions were matched against the stored vectors to retrieve the most relevant employee

This resulted in a self-updating RAG pipeline that continuously reflected newly accumulated reports.

## Model Improvement

To improve retrieval quality in the game development domain, I fine-tuned the multilingual-e5-large embedding model using historical weekly reports. Older reports were used to build the training set, and recent reports were used as a test set.

## Results

- recall@10 improved from 0.04 to 0.18
- ndcg@10 improved from 0.02 to 0.11
- cosine similarity between the query and the actual owner improved from 0.708 to 0.869

## Impact

The chatbot was deployed for real internal use at Com2us and contributed to broader adoption of AI services inside the company.
