**Period:** 2025.04 - 2026.01 (10 months)

**Affiliation:** Bard Architects / Development Outsourcing

**Role:** Freelance, Solo Outsourced Developer, Full-Stack Web Development

## Overview

TERENE is an outsourced accommodation booking website project used by real customers. I received a Framer design with only the UI implemented, then independently designed and developed the full service including reservations, payments, membership, coupons, and admin features. The core goal was to transform a manually handled reservation process into an automated service ready for real-world operation.

![TERENE result 01](/content/portfolio/terene/result01.png "w=1080 h=620")
![TERENE result 02](/content/portfolio/terene/result02.png "w=1080 h=620")
![TERENE result 03](/content/portfolio/terene/result03.png "w=1080 h=620")
![TERENE result 04](/content/portfolio/terene/result04.png "w=1080 h=620")
![TERENE result 05](/content/portfolio/terene/result05.png "w=1080 h=620")
![TERENE result 06](/content/portfolio/terene/result06.png "w=1080 h=620")
![TERENE result 07](/content/portfolio/terene/result07.jpg "w=1080 h=620")
![TERENE result 08](/content/portfolio/terene/result08.png "w=1080 h=620")

## Skills

- Framer
- React
- TypeScript
- Express
- PostgreSQL
- Render
- Toss Payments API
- SOLAPI

## Pain Point & Project Goals

- **Existing problem:** The outsourced deliverable only had the UI implemented in Framer, while the core business logic such as reservation automation, payments, membership, coupons, and admin features was entirely missing. In addition, the reservation flow still relied on manual processing and could take up to 24 hours even though it served real customers.
- **Constraints:** Framer did not support GitHub integration and allowed only limited coding, so it was difficult to structure the project like a typical React application.
- **Goal:** Preserve the existing design while quickly implementing reservations, payments, notifications, member features, and admin features, and automate the reservation process used by real customers within 5 seconds.

## Development Details

- **Framer-based code component development:** I found that Framer could inherit `.tsx` code components, and used that to reconstruct major UI elements as React-based code components while preserving the existing design.
- **State-driven frontend implementation:** I built Toss payment widgets, calendars, receipts, coupon generation and issuance, and member and reservation tables by fetching data from the server, reflecting it in state, and rendering from there.
- **Reservation, payment, and notification integration:** I connected member and guest reservation flows, Toss Payments API-based payments, and SOLAPI-based automated notification messages into one end-to-end flow from reservation creation to confirmation and follow-up notifications.
- **Operational admin page development:** I built an admin page that allowed non-technical managers to directly handle various actions related to reservations, members, and coupons.
- **Change-resilient data design:** To respond to frequent policy changes, I designed a normalized database structure that minimized migrations, and in some cases responded to sensitive requirement changes using frontend code without changing the database.

## Troubleshooting & Solving

- **Problem situation:** During development, the reservation loading screen was delayed for over 30 seconds, significantly degrading the actual booking completion experience.
- **Cause analysis:** A large number of automated notification messages sent to both managers and customers were being processed synchronously along with multiple database tasks, blocking the entire reservation flow.
- **Solution:** I redesigned the system so that every reservation was tracked and processed through a queue, and separated the reservation-processing API server from the automated notification API server so that the core booking flow and auxiliary tasks were decoupled.
- **Result:** I automated the reservation process to complete within 5 seconds, and then continued improving service stability by fixing device- and OS-specific bugs found in the real usage environment.

## Quantitative Results

- **Reservation automation:** Reduced a 24-hour reservation process to within 5 seconds.
- **Real service operation:** Handled more than 70 customer reservations after deployment while continuously improving the service in production.
- **Membership growth:** Secured 15 membership users.
- **Practical engineering growth:** Gained hands-on experience across policy changes, schema design, operational issue response, and admin UX improvements.
- **Live service:** [https://terene.kr/](https://terene.kr/)
