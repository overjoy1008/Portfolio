**Period:** 2024.06 - 2024.10 (5 months)

**Affiliation:** SK Telecom / AI Fellowship 6

**Role:** AI Fellow (VR/AI Development), Three-person Undergraduate Team, VR Infrastructure and AI Feature Implementation

## Overview

This project was an AI learning assistant built for a Meta Quest 3-based VR environment. The team had no developer who was already proficient with Unity, and one team member's sudden overseas schedule made in-person testing difficult, yet we still had to complete the project successfully. I analyzed the necessary use cases, split the work into VR and Unity, 2D-to-3D, and LLM domains, and took ownership of the most difficult area, VR and Unity development, while leading overall system integration.

![SKT result 01](/content/portfolio/skt-ai-fellowship/result01.png "w=1080 h=620")
![SKT result 02](/content/portfolio/skt-ai-fellowship/result02.png "w=1080 h=620")
![SKT result 03](/content/portfolio/skt-ai-fellowship/result03.png "w=1080 h=620")

## Skills

- Unity
- C#
- Meta Quest 3 VR
- Python
- LLM
- Meshy.ai API
- STT
- FastAPI
- AWS S3
- AWS EC2

## Pain Point & Project Goals

- **Team collaboration issue:** The team consisted of three undergraduate students, and one member's overseas schedule made it difficult to gather and perform VR device compilation and testing together.
- **Technical capability issue:** No one on the team was already proficient with Unity, which made carrying out a VR-centered project itself a high barrier.
- **Goal:** Create a structure in which each teammate could work independently despite limited in-person collaboration, and ultimately build a learning assistant that integrated voice questions, 3D generation, and AI responses inside a VR environment.

## Development Details

- **Development area split:** I analyzed the required use cases and divided the work into VR and Unity, 2D-to-3D, and LLM areas so that each teammate could work independently.
- **VR and Unity infrastructure development:** I self-studied Unity for a month, synchronized the Meta Quest 3 environment, and directly implemented the learning-oriented VR scenes and interaction features.
- **Server API integration:** I integrated each teammate's feature through server APIs and succeeded in real-time integration with Unity, while modularizing the system so that weekly remote collaboration was enough for immediate system integration later.
- **AI pipeline implementation:** I connected voice question handling, intent classification, 2D image-to-3D conversion, and LLM response generation into a single VR learning experience.
- **Pivot response:** When the company requested a topic pivot midway through the project, the modular structure allowed us to preserve the overall logic and server functionality while switching quickly by changing only part of the input data.

## Troubleshooting & Solving

- **Problem situation:** The project was difficult to complete because of the team's lack of Unity experience, limited in-person testing opportunities, and an unexpected pivot request in the middle of development.
- **Cause analysis:** Beyond the raw technical difficulty, if the team's collaboration structure was not made explicit, integration would continue to be delayed in a project heavily dependent on VR devices.
- **Solution:** I first divided the system clearly by use case so that parallel development was possible, then took responsibility for VR and Unity plus system integration by connecting each feature at the API level. I also designed a clear intent-classification structure so that the system could achieve useful performance with a relatively small amount of data.
- **Result:** Even with limited data, we achieved 97% STT-based intent classification accuracy and about 2 seconds of response time, and successfully finished the final demo.

## Quantitative Results

- **Project completion:** Successfully completed the project through modular task division and an integration-friendly structure despite multiple constraints.
- **Performance achieved:** Reached 97% STT intent classification accuracy and about 2 seconds of response time.
- **Flexible system design:** Built a structure that could respond quickly to a pivot by keeping the overall system intact and replacing only some inputs.
- **Final demo:** [Final demo video](https://drive.google.com/file/d/1WGmMBFYE4gbls7s0fGj0YVqr5cjdAzlU/view?usp=drive_link)
