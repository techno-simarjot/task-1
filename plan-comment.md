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
