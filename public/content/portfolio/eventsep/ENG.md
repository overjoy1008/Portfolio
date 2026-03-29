**Date:** 2025.11.30

**Affiliation:** Korea University, School of Electrical Engineering / Prof. Jintae Kwak's Lab (QuIlL)

**Role:** First Author, Undergraduate Thesis Research

## Overview

EventSep is a text-conditioned source separation study that selectively extracts only the specific acoustic object designated by the user from a complex audio environment through a natural language prompt. Existing text-based separation models can specify what to separate, but often lack explicit time information about when the sound actually exists, which leads to over-separation and temporal misalignment. To address this limitation, I proposed the EventSep framework, which combines pretrained separation, detection, and restoration models.

![EventSep result 01](/content/portfolio/eventsep/result01.png "w=1080 h=620")
![EventSep result 02](/content/portfolio/eventsep/result02.png "w=1080 h=620")
![EventSep result 03](/content/portfolio/eventsep/result03.png "w=1080 h=620")
![EventSep result 04](/content/portfolio/eventsep/result04.png "w=1080 h=620")

## Skills

- Python
- PyTorch
- AudioSep
- FlowSep
- PANNs
- Sound Event Detection
- STFT / ISTFT
- CLAPScore
- VGGSound
- ESC-50
- MUSIC

## Pain Point & Project Goals

- **Existing problem:** Text-conditioned source separation has the advantage of allowing the user to choose a specific acoustic object through natural language, but it is difficult to maintain stable separation performance because of text ambiguity, lack of temporal information, and mismatches between the prompt and the actual audio.
- **Structural limitation:** Existing models tend to separate even in regions where the target sound does not actually exist, which causes over-separation and temporal misalignment in long audio and multi-event environments.
- **Goal:** Preserve the semantic precision of text-based separation while selectively emphasizing only the time regions where the target sound exists, ultimately producing more reliable selective source separation.

## Development Details

- **4-stage EventSep pipeline design:** I designed a four-stage structure from input audio to final separation result consisting of prompt-to-class mapping, frame-wise SED, time-selective masking, and parallel separation with STFT-based fusion.
- **Frame-wise SED-based temporal selectivity:** Using PANNs-Cnn14-based SED, I estimated frame-wise presence probabilities for 527 AudioSet classes and used the class most semantically similar to the prompt as the basis for temporal masking.
- **Text-to-class semantic mapping:** I calculated similarity between natural language prompts and AudioSet class names so that expressions such as `"someone speaking softly"` could still be mapped to the appropriate acoustic category.
- **Time-selective filtering with soft and hard masks:** I expanded SED probabilities along the time axis and applied hard and soft masks so that only the regions where the target event existed would be emphasized.
- **Combination of pretrained models:** I ran U-Net-based AudioSep, which is strong in semantic alignment, together with diffusion-based FlowSep, which is strong in high-frequency restoration and perceptual quality, in parallel to combine their strengths.
- **STFT-based ensemble implementation:** I aligned the outputs of AudioSep and FlowSep in time, normalized RMS, combined them in the STFT domain, and reconstructed the final waveform using AudioSep's phase in a hybrid separation method.

## Troubleshooting & Solving

- **Problem situation:** Existing text-based separation models often attempted separation even in segments where the acoustic object specified by the prompt did not actually exist, producing outputs that looked semantically plausible but were temporally inaccurate.
- **Cause analysis:** The core cause was that text-based separation models could use semantic information about the target, but did not directly encode when that target appeared and disappeared along the time axis.
- **Solution:** I estimated target event presence probability frame by frame through frame-wise SED, connected it to time-selective masking centered on soft masks, and emphasized only the segments where the sound actually existed. I then balanced semantic fidelity and perceptual quality by combining AudioSep's semantic separation power and FlowSep's high-frequency restoration power through an STFT-based ensemble.
- **Result:** Temporal misalignment and over-separation were mitigated, and experiments on VGGSound, ESC-50, and MUSIC showed more stable semantic alignment performance than existing text-based separation baselines.

## Quantitative Results

- **Semantic alignment improvement:** Improved CLAPScore on VGGSound from 0.2838 to 0.3549, about a 25% increase.
- **Key contribution verified:** Experiments showed that SED-based temporal selectivity was the single biggest contributor to EventSep's performance improvement.
- **Hybrid architecture proposal:** Proposed a unified pipeline that combines AudioSep's semantic accuracy with FlowSep's perceptual naturalness.
- **Demo page:** Deployed a demo page for the undergraduate thesis results. [https://eventsep-demo.onrender.com/](https://eventsep-demo.onrender.com/)
