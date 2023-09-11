const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it, before, after } = require("mocha");
const app = require("./routes/Music");

chai.use(chaiHttp);
const { expect } = chai;

describe("Search API", () => {
  before((done) => {
    // Perform any setup before running the tests
    done();
  });

  after((done) => {
    // Perform any teardown after running the tests
    done();
  });

  describe("GET /search", () => {
    it("should return search results for music media type", (done) => {
      chai
        .request(app)
        .get("/search")
        .query({ term: "test", media: "music" })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf.at.least(1);
          expect(res).to.matchSnapshot();
          done();
        });
    });

    it("should return an error for an invalid media type", (done) => {
      chai
        .request(app)
        .get("/search")
        .query({ term: "test", media: "invalid" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.equal("Invalid media type");
          done();
        });
    });

    it("should return an error for a server error", (done) => {
      // Mock the axios.get method to simulate a server error
      chai.spy.on(app.axios, "get", () => {
        throw new Error("Server error");
      });

      chai
        .request(app)
        .get("/search")
        .query({ term: "test", media: "music" })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.text).to.equal("Server error");
          done();
        });
    });
  });
});
