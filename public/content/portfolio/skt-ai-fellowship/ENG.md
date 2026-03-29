# VR-Based AI Learning Assistant

## Overview

This project was developed during the SKT AI Fellowship as a VR-based AI learning assistant. I worked in a three-person developer team and was responsible for VR device integration and AI feature implementation.

## Core Experience

The service was built to let users interact with learning content inside a VR environment, ask questions by voice, and receive either an AI-generated explanation or a generated 3D model depending on the intent of the question.

## Tech Stack

- Unity
- C#
- Meta Quest 3
- Meta XR All-In-One SDK
- FastAPI
- U2-Net
- Wit.ai
- ChatGPT-4o
- Meshy.ai API

## What I Implemented

![SKT result 01](/content/portfolio/skt-ai-fellowship/result01.png "w=1080 h=620")
![SKT result 02](/content/portfolio/skt-ai-fellowship/result02.png "w=1080 h=620")
![SKT result 03](/content/portfolio/skt-ai-fellowship/result03.png "w=1080 h=620")

- Built VR learning scenes in Unity
- Connected uploaded learning images to a FastAPI server pipeline
- Processed images with U2-Net for background removal and artifact cleanup
- Imported 3D models generated through Meshy.ai back into the Unity scene
- Implemented voice question handling on the VR device
- Built intent classification for LLM question answering, 3D model generation, and out-of-scope requests

## Performance

By building and fine-tuning the intent classification dataset, the system achieved about 97% confidence with 1 to 2 seconds of latency.

## Delivery

Depending on the detected user intent, the server returned either:

- an LLM response based on preprocessed textbook and wiki data, or
- a generated 3D model result for the Unity scene

This project helped me design a full VR-AI interaction pipeline across device, server, and model layers.
