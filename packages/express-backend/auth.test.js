const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./auth"); // Replace with the actual path to the function

describe("generateAccessToken", () => {
  let signMock;

  beforeEach(() => {
    // Create a mock for jwt.sign
    signMock = jest.spyOn(jwt, "sign");
  });

  afterEach(() => {
    // Restore the original function after each test
    signMock.mockRestore();
  });

  it("should generate a valid token when TOKEN_SECRET is set", () => {
    // Set the mock environment variable
    process.env.TOKEN_SECRET = "testsecret";

    // Mock the behavior of jwt.sign to return a fixed token value
    signMock.mockReturnValue("mocked_token"); // Ensure sign returns a mocked token

    const username = "testUser";
    const token = generateAccessToken(username);

    expect(token).toBe("mocked_token"); // Ensure token matches the mocked value
    expect(signMock).toHaveBeenCalledWith(
      { username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
    ); // Ensure sign was called with correct arguments
  });

  it("should throw an error when TOKEN_SECRET is not set", () => {
    // Unset the environment variable
    delete process.env.TOKEN_SECRET;

    expect(() => generateAccessToken("testUser")).toThrow(
      "TOKEN_SECRET environment variable is not set.",
    );
  });
});
