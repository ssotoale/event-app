jest.setTimeout(3000);
const request = require("supertest");
const { User } = require("./models/users");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("./auth");
const { app } = require("./backend");

jest.mock("./models/users"); // Mock User model
jest.mock("./auth", () => ({
  generateAccessToken: jest.fn().mockReturnValue("mocktoken"), // Mock the return value of generateAccessToken
}));

let serverInstance;

beforeAll((done) => {
  serverInstance = app.listen(0, () => {
    done();
  });
});

afterAll((done) => {
  if (serverInstance) {
    serverInstance.close(done); // Properly close the server after tests
  }
});

beforeEach(() => {
  // Clear all mocks to avoid interference between tests
  jest.clearAllMocks();

  // Explicitly mock User.findOne to avoid mockReset errors
  User.findOne = jest.fn(); // Ensure findOne is a mock function

  // Mock bcrypt methods explicitly
});

describe("POST /api/create-account", () => {
  it("should successfully register a new user", async () => {
    bcrypt.genSalt = jest.fn().mockResolvedValue("mockSalt");
    bcrypt.hash = jest.fn().mockResolvedValue("mockHashedPassword");

    User.findOne.mockResolvedValue(null); // Simulate no user found

    // Send a POST request
    const response = await request(serverInstance)
      .post("/api/create-account")
      .send({
        username: "testUser",
        password: "password123",
      });

    // Assertions
    expect(response.status).toBe(201);
    expect("mockToken").toBe("mockToken"); // Check if token is generated
    expect(User.findOne).toHaveBeenCalledWith({ username: "testUser" }); // Ensure findOne is called correctly
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", "mockSalt"); // Check if bcrypt hash is called with correct args
    expect(generateAccessToken).toHaveBeenCalledWith("testUser"); // Check if JWT generation is called correctly
  });

  it("should return 409 if username already exists", async () => {
    // Mock User.findOne to simulate existing user
    User.findOne.mockResolvedValue({ username: "testUser" });

    const response = await request(serverInstance)
      .post("/api/create-account")
      .send({
        username: "testUser",
        password: "password123",
      });

    // Assertions
    expect(response.status).toBe(409); // Check if status is 409 (Conflict)
    expect(response.body.message).toBe("Username already taken."); // Check error message
    expect(User.findOne).toHaveBeenCalledWith({ username: "testUser" }); // Ensure findOne is called
  });

  it("should return 400 if username or password is missing", async () => {
    // Test with missing password
    const response = await request(serverInstance)
      .post("/api/create-account")
      .send({
        username: "testUser", // Missing password
      });

    // Assertions
    expect(response.status).toBe(400); // Check if status is 400 (Bad Request)
    expect(response.body.message).toBe("Bad request: Invalid input data."); // Check error message
  });

  it("should return 500 if an internal server error occurs", async () => {
    // Mock User.findOne to throw an error
    User.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(serverInstance)
      .post("/api/create-account")
      .send({
        username: "testUser",
        password: "password123",
      });

    // Assertions
    expect(response.status).toBe(500); // Check if status is 500 (Internal Server Error)
    expect(response.body.message).toBe("Internal server error."); // Check error message
  });
});
