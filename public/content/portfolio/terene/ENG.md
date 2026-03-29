## Overview

TERENE is an accommodation booking platform that I built as a solo full-stack developer in collaboration with a web UI designer. The goal was to turn a manual reservation workflow into a real service that could handle booking, payment, notification, and member management in one flow.

![TERENE result 01](/content/portfolio/terene/result01.png "w=1080 h=620")
![TERENE result 02](/content/portfolio/terene/result02.png "w=1080 h=620")
![TERENE result 03](/content/portfolio/terene/result03.png "w=1080 h=620")
![TERENE result 04](/content/portfolio/terene/result04.png "w=1080 h=620")
![TERENE result 05](/content/portfolio/terene/result05.png "w=1080 h=620")
![TERENE result 06](/content/portfolio/terene/result06.png "w=1080 h=620")
![TERENE result 07](/content/portfolio/terene/result07.jpg "w=1080 h=620")
![TERENE result 08](/content/portfolio/terene/result08.png "w=1080 h=620")

## What I Built

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
