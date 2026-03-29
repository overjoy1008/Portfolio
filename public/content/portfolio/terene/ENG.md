# TERENE

## Overview

TERENE is an accommodation booking platform that I built as a solo full-stack developer in collaboration with a web UI designer. The goal was to turn a manual reservation workflow into a real service that could handle booking, payment, notification, and member management in one flow.

![TERENE landing page mockup](https://picsum.photos/seed/terene-gallery-1/1280/820 "w=1080 h=620")
![TERENE reservation flow mockup](https://picsum.photos/seed/terene-gallery-2/1280/820 "w=1080 h=620")
![TERENE room detail mockup](https://picsum.photos/seed/terene-gallery-3/1280/820 "w=1080 h=620")
![TERENE member dashboard mockup](https://picsum.photos/seed/terene-gallery-4/1280/820 "w=1080 h=620")
![TERENE admin console mockup](https://picsum.photos/seed/terene-gallery-5/1280/820 "w=1080 h=620")

## What I Built

![TERENE booking flow mockup](https://picsum.photos/seed/terene-flow/1200/700 "w=980")

- Member and guest reservation flows
- Payment integration with Toss Payments API
- Automated KakaoTalk booking notifications with SOLAPI
- Member and admin pages for reservations, user data, coupons, and mileage
- Custom backend APIs with Express and PostgreSQL

## Frontend

- Framer
- React
- TypeScript code components

## Backend

- Express
- PostgreSQL
- Render

## Key Engineering Work

The biggest issue in the original workflow was that reservations were processed manually and could take up to 24 hours. I redesigned the pipeline around a queue-based reservation process on the server so that payment, booking status updates, notifications, and related data changes could be handled in a controlled sequence.

I also structured the API around transactional flows for booking, cancellation, and refund scenarios so that the service could maintain data consistency across customer, reservation, payment, refund, calendar, coupon, and mileage records.

## Outcome

- Reduced reservation processing time from 24 hours to under 5 seconds
- Completed 70 cumulative reservations
- Secured 15 membership users
- Launched and operated the live service at https://terene.kr/
