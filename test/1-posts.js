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
  describe("GET all posts", () => {
    it("it should receive unauthorized message", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have
            .property("msg")
            .eql("No token. Authorization denied.");
          done();
        });
    });
  });
});

describe("Authorized - with auth token", () => {
  describe("Sign in as Casey", () => {
    var token = "";
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

    it("it should GET all existing posts", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .set("x-auth-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });

    describe("Operation on a particular post", () => {
      let postId = "";

      it("it should CREATE a post", (done) => {
        let newPost = {
          text: "This is a post created by Casey during testing. :)",
        };

        chai
          .request(server)
          .post("/api/posts")
          .set("x-auth-token", token)
          .send(newPost)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.a.property("_id");
            res.body.should.have.a.property("text");
            res.body.should.have.a.property("name");
            res.body.should.have.a.property("user");
            res.body.should.have.a.property("date");
            postId = res.body["_id"].toString();
            done();
          });
      });

      it("it should GET an existing post", (done) => {
        chai
          .request(server)
          .get(`/api/posts/${postId}`)
          .set("x-auth-token", token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.a.property("_id");
            res.body.should.have.a.property("_id").eql(postId);
            res.body.should.have.a.property("text");
            res.body.should.have.a.property("name");
            res.body.should.have.a.property("user");
            res.body.should.have.a.property("date");
            done();
          });
      });

      it("it should DELETE Casey's post using her token", (done) => {
        chai
          .request(server)
          .delete(`/api/posts/${postId}`)
          .set("x-auth-token", token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.a.property("msg");
            res.body.should.have.a.property("msg").eql("Post removed");
            done();
          });
      });

      it("it should not find a deleted post", (done) => {
        chai
          .request(server)
          .get(`/api/posts/${postId}`)
          .set("x-auth-token", token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
            res.body.should.have.a.property("msg");
            res.body.should.have.a.property("msg").eql("No such post found. ");
            done();
          });
      });
    });
  });
});
