import request from "supertest";
import app from "../server.js";

describe("Health Check API", () => {
  it("should return 200 and healthy status", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: "healthy",
      message: "Application is running",
    });
  });
});
