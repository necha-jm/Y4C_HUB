# Human-Centered Design (HCD) Tool - Y4C Innovation Lab

This tool is a comprehensive platform for continuous user-centered improvement. It allows the lab to understand user needs, collect feedback, identify usability problems, and validate improvements.

## HCD Lifecycle
1. **User Need**: Captured via Personas and Research.
2. **User Research**: Structured personas managed in the Admin Dashboard.
3. **User Feedback**: Contextual feedback collected via the global floating button.
4. **Usability Evaluation**: 1-5 star ratings and satisfaction scores.
5. **Insights**: Automated pattern detection (e.g., "Recurring problem in /programs").
6. **Prioritization**: Issues prioritized based on frequency and impact.
7. **User Validation**: Closing the loop by asking users if the fix worked.

## Architecture
- **Backend**: Spring Boot JPA entities with a dedicated `HcdService` for analytics.
- **Frontend**: React + Framer Motion for a premium, interactive reporting experience.
- **Database**: PostgreSQL with audit trails for status transitions.

## Admin Features
- **Insights Tab**: Run "Pattern Analysis" to automatically find friction points.
- **Dashboard**: Track Open vs Resolved issues and average satisfaction.
- **Research**: Record student personas and pain points.

## How to use
- **User**: Click the blue message icon at the bottom-right of any page to report a bug or suggest a feature.
- **Facilitator**: Access the "HCD Lab" tab in the dashboard to review trends and insights.
