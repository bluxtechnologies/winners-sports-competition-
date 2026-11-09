# 05 --- Team Registration Specification

## 1. Purpose

This document defines the information and administrative workflow
required to register 16 teams for the Winners Football Competition.

## 2. Registration rules

-   Maximum accepted teams: 16.
-   Squad size: exactly 7 players per team.
-   Eligibility: current Southern Delta University, Ozoro students only.
-   Fee: ₦10,000 per team.
-   Full payment is required before confirmation.
-   Payment method: bank transfer with manual admin verification.
-   A player may appear on one team roster only.

## 3. Team information

Collect: - Team name. - Captain's full name. - Captain's email
address. - Captain's phone number. - Captain's student
identification/matric number. - Seven player records.

## 4. Player information

For each of the seven players, collect: - Full name. - Email address. -
Phone number **\[RECOMMENDED; confirm whether mandatory\]**. - Student
identification/matric number. - Student status verification evidence or
method.

Email addresses must be normalized and checked for uniqueness across the
entire competition. Student identification numbers should also be
checked for duplication. Names alone must not be treated as unique
identifiers.

## 5. Payment information

Display official bank details only after they have been approved by the
organizer. Collect: - Payer name. - Transfer date. - Amount
transferred. - Transfer reference. - Payment evidence, if required.

The system should mark payment as **Pending Verification** until an
authorized administrator confirms receipt. A team becomes **Confirmed**
only when all required registration checks and full payment are
approved.

## 6. Suggested registration statuses

-   Draft.
-   Submitted.
-   Under Review.
-   Payment Pending.
-   Payment Verification.
-   Confirmed.
-   Rejected.
-   Withdrawn.

## 7. Validation requirements

-   Prevent more than 16 confirmed teams.
-   Prevent duplicate player email addresses across teams.
-   Prevent duplicate student IDs across teams.
-   Require exactly seven player records before final submission.
-   Prevent a player from being assigned to a second team.
-   Do not expose private player details publicly.
-   Keep an audit record of admin changes and payment verification.
-   Only authorized admins may confirm payments, reject registrations or
    edit locked rosters.

## 8. Admin workflow

1.  Team captain submits team and player details.
2.  System validates required fields and duplicate identifiers.
3.  Captain receives bank transfer instructions.
4.  Captain submits payment reference.
5.  Finance Officer checks the bank account and marks payment verified.
6.  Registration administrator verifies student eligibility and roster.
7.  Team is confirmed and assigned a unique team ID.
8.  Captain receives confirmation and the registration deadline/next
    steps.

## 9. Public information

The public website may show team name, team logo (if supplied), captain
display name where approved, fixtures, scores and public statistics. Do
not publish email addresses, phone numbers, matric numbers, payment
receipts or identity documents.

## 10. Data protection

Collect only information necessary to administer the tournament.
Restrict access to identity and payment evidence. State who can access
it, why it is collected, how long it is retained and how participants
can raise a privacy concern. Delete or securely archive sensitive
records when no longer needed, subject to legitimate recordkeeping
requirements.

## 11. Items to decide before development

-   Registration opening and closing dates.
-   Whether player phone numbers are mandatory.
-   Accepted proof of current student status.
-   Whether team logos are optional.
-   Whether the captain must also be one of the seven players.
-   Roster replacement deadline and exceptional replacement process.
-   Refund policy.
-   Official bank account and payment reference format.
