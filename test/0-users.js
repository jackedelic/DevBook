//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Unauthorized - no auth token", () => {
  it("should CREATE a user", (done) => {
    let newUser = {
      name: "Casey",
      email: "casey@yahoo.com",
      password: "111111",
    };
    chai
      .request(server)
      .post("/api/users")
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        done();
      });
  });
});
