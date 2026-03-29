**Duration:** March 26, 2024 - April 7, 2024 (2 weeks)

**Organization:** Korea University Generative AI Club Team Project

**Role:** Frontend Developer, Component Development, Prompt Engineering

## Overview

Blank-It is a web service that generates 10 fill-in-the-blank questions from uploaded lecture PPT files. We designed it as a study tool that could help students memorize content across any academic field, and built it as a team project in a generative AI club at Korea University. Following DDD principles, we used Next.js, React, and Firebase, with the goal of planning, building, and deploying the project within two weeks.

![Blank-It result 01](/content/portfolio/blank-it/result01.png "w=1080 h=620")
![Blank-It result 02](/content/portfolio/blank-it/result02.png "w=1080 h=620")

- Built a study flow where users upload lecture PPT files and receive 10 fill-in-the-blank questions based on key concepts.
- Designed the service as a broadly usable memorization tool that works across different majors and lecture topics.
- Focused on shipping a fully usable web product within a short two-week timeline.

## Skills

- Next.js
- React
- Firebase
- Tailwind CSS
- OpenAI API

## Pain Point & Project Goals

- **Existing Problem:** Turning lecture materials into practice questions manually takes time, and there were few broadly usable tools that could support memorization across different academic fields.
- **Constraint:** The team had to plan, develop, and deploy the entire service within two weeks, while also handling unstable text extraction quality from uploaded PDF-based materials.
- **Goal:** Build a web service that could quickly turn lecture materials from any subject into usable study questions and make it deployable for real student usage in a very short timeframe.

## Development Details

- **Frontend and Component Development:** Implemented the full user flow with Next.js and React, and built key UI components such as buttons to keep the interface consistent while moving quickly.
- **Prompt Engineering for Quiz Generation:** Designed and iterated on prompts that could reliably extract key information from lecture materials and turn it into 10 fill-in-the-blank questions.
- **DDD-Based Collaboration Structure:** Organized the project around domain responsibilities so the team could divide work clearly and still move fast under a short schedule.

## Troubleshooting & Solving

- **Issue:** During PDF parsing, text often became corrupted, OCR occasionally failed, and line breaks or handwritten notes inside PDFs degraded extraction quality.
- **Root Cause Analysis:** The biggest issue was not the LLM itself but the quality of the input text, especially inconsistencies caused by different PDF structures and visual formatting.
- **Solution:** I improved both prompt design and preprocessing criteria while repeatedly checking parsing outputs, then handled broken characters, OCR failures, line-break distortion, and handwritten text as separate problem cases.
- **Result:** We stabilized question generation across a wider range of lecture materials and completed a deployable learning service within the target schedule.

## Quantitative Results

- **Fast Delivery:** Completed planning, development, and deployment within two weeks.
- **Early Traction:** Recorded over 2,500 page views within the first week after launch.
- **Usage Metrics:** Attracted more than 750 visitors and generated more than 1,200 study questions.
