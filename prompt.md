
Implement the approved GitHub issue.

ISSUE TITLE:
Add a Health Check API Endpoint

ISSUE DESCRIPTION:
Create a simple health check API endpoint that verifies whether the application is running.
Requirements
Add a /health/ GET endpoint.
Return HTTP status code 200.
Return JSON response:

{
  "status": "healthy",
  "message": "Application is running"
}
Add a basic test for the endpoint.
Follow the existing project structure and coding conventions.
Expected Result
Calling /health/ should return a successful response indicating that the application is running.

APPROVED IMPLEMENTATION PLAN:
<!-- GROQ_IMPLEMENTATION_PLAN -->
## Groq Implementation Plan

**1. Understanding of the Issue**

The project already exposes a REST API (see `backend/server.js` and `backend/routes/historyRoutes.js`).  
The issue requests a *health‑check* endpoint that:

* is reachable at `GET /health/`
* always returns HTTP **200**
* returns the JSON payload

```json
{
  "status":  "healthy",
  "message": "Application is running"
}
```

A simple unit test must be added to verify that the endpoint behaves as expected.  
The implementation must respect the existing project layout, coding style, and test infrastructure.

---

**2. Root Cause / Required Functionality**

* The current code base has no `/health/` route.
* The server is started directly in `backend/server.js`; tests that import the app will therefore try to bind the same port again, causing a conflict.
* No test exists that checks the health endpoint.

**Goal** – add the route, make the server safe to import

---
Review this plan. Add the `groq-approve` label to authorize implementation.


Instructions:
- Follow the approved plan.
- Inspect existing code before modifying files.
- Follow existing project conventions.
- Write or update appropriate tests.
- Run relevant tests where possible.
- Do not access, print, or expose secrets.
- Do not modify GitHub Actions permissions or secrets.
- Do not merge the pull request.
- Do not make unrelated changes.
