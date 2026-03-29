## Overview

EventSep was my graduation thesis project focused on separating only the target sound described in natural language from mixed audio containing multiple events such as music, speech, and environmental noise.

## Research Goal

The main objective was to let a user describe a desired sound in plain language and then isolate only that sound from a complex audio recording.

## Method

![EventSep result 01](/content/portfolio/eventsep/result01.png "w=1080 h=620")
![EventSep result 02](/content/portfolio/eventsep/result02.png "w=1080 h=620")
![EventSep result 03](/content/portfolio/eventsep/result03.png "w=1080 h=620")
![EventSep result 04](/content/portfolio/eventsep/result04.png "w=1080 h=620")

- Detect the time range where the described audio event exists
- Apply STFT-based masking only to the frequency region of the target sound
- Use frame-wise sound event detection probabilities to guide masking
- Combine pretrained models including AudioSep and FlowSep through an ensemble strategy across frequency ranges

## Key Idea

Instead of relying on a single model, I combined the strengths of multiple pretrained audio separation approaches to improve semantic quality and separation performance.

## Result

- Improved CLAPScore on the VGGSound dataset by 25%
- Score increased from 0.2838 to 0.3549

## Demo

- Live demo: https://eventsep-demo.onrender.com
