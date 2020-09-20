//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Unauthorized - no auth token", () => {
  /*
   * Test the /GET route
   */
  describe("GET all profiles", () => {
    it("it should GET all existing profiles", (done) => {
      chai
        .request(server)
        .get("/api/profile")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  // describe("GET a particular user's profile", () => {
  //   it("it should GET Casey's profile", (done) => {
  //     chai
  //       .request(server)
  //       .get("/api/profile/user/")
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("array");
  //         done();
  //       });
  //   });
  // });
});

describe("Authorized - with auth token", () => {
  describe("Sign in as Casey", () => {
    let token = "";
    let userId = "";
    beforeEach((done) => {
      chai
        .request(server)
        .post("/api/auth")
        .send({
          email: "casey@yahoo.com",
          password: "111111",
        })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it("it should CREATE a profile", (done) => {
      let newProfile = {
        company: "Casey pte ltd",
        status: "Working",
        location: "Kota Kinabalu, Sabah, Malaysia",
        website: "www.casey.com",
        bio: "I love cassettes",
        githubusername: "cassieorcasey",
        facebook: "facebook.com/casey",
        instagram: "instagram.com/kc",
        skills: "node, express, googling, attending lecture, use zoom",
      };
      chai
        .request(server)
        .post("/api/profile")
        .set("x-auth-token", token)
        .send(newProfile)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("social");
          res.body.should.have.property("skills");
          res.body.should.have.property("date");
          res.body.should.have.property("_id");
          res.body.should.have.property("user");
          res.body.should.have.property("company");
          res.body.should.have.property("company").eql(newProfile.company);
          res.body.should.have.property("website");
          res.body.should.have.property("website").eql(newProfile.website);
          res.body.should.have.property("location");
          res.body.should.have.property("location").eql(newProfile.location);
          res.body.should.have.property("bio");
          res.body.should.have.property("bio").eql(newProfile.bio);
          res.body.should.have.property("status");
          res.body.should.have.property("status").eql(newProfile.status);
          res.body.should.have.property("githubusername");
          res.body.should.have
            .property("githubusername")
            .eql(newProfile.githubusername);
          userId = res.body.user.toString();
          done();
        });
    });

    it("it should UPDATE her profile", (done) => {
      let newProfile = {
        company: "Casey pte ltd",
        status: "Student",
        location: "Singapore",
        website: "www.casey.com",
        bio: "I love cassettes",
        githubusername: "casey",
        facebook: "facebook.com/caseyupdated",
        instagram: "instagram.com/kc",
        skills: "node, express, googling, attending lecture, use zoom",
      };
      chai
        .request(server)
        .post("/api/profile")
        .set("x-auth-token", token)
        .send(newProfile)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("social");
          res.body.should.have.property("skills");
          res.body.should.have.property("date");
          res.body.should.have.property("_id");
          res.body.should.have.property("user");
          res.body.should.have.property("company");
          res.body.should.have.property("company").eql(newProfile.company);
          res.body.should.have.property("website");
          res.body.should.have.property("website").eql(newProfile.website);
          res.body.should.have.property("location");
          res.body.should.have.property("location").eql(newProfile.location);
          res.body.should.have.property("bio");
          res.body.should.have.property("bio").eql(newProfile.bio);
          res.body.should.have.property("status");
          res.body.should.have.property("status").eql(newProfile.status);
          res.body.should.have.property("githubusername");
          res.body.should.have
            .property("githubusername")
            .eql(newProfile.githubusername);
          userId = res.body.user.toString();
          done();
        });
    });

    it("it should GET her own profile", (done) => {
      chai
        .request(server)
        .get(`/api/profile/user/${userId}`)
        .set("x-auth-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("it should DELETE her own profile", (done) => {
      chai
        .request(server)
        .delete("/api/profile")
        .set("x-auth-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("msg").eql("User deleted");
          done();
        });
    });
  });
});
