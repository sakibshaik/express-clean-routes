const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const util = require("../utils");

describe("## express clean routes utils", () => {
    beforeEach(() => {

    });
    afterEach(() => {

    });

    it(" validateRouteMethod to return true for all accepted http methods", (done)=>{
        expect(util.validateRouteMethod('get')).to.equal(true);
        expect(util.validateRouteMethod('post')).to.equal(true);
        expect(util.validateRouteMethod('delete')).to.equal(true);
        expect(util.validateRouteMethod('put')).to.equal(true);
        expect(util.validateRouteMethod('GET')).to.equal(true);
        expect(util.validateRouteMethod('POST')).to.equal(true);
        expect(util.validateRouteMethod('DELETE')).to.equal(true);
        expect(util.validateRouteMethod('PUT')).to.equal(true);
        expect(util.validateRouteMethod('Get')).to.equal(true);
        expect(util.validateRouteMethod('Post')).to.equal(true);
        expect(util.validateRouteMethod('Delete')).to.equal(true);
        expect(util.validateRouteMethod('Put')).to.equal(true);
        done();
    });

    it("validateRouteMethod to return false for all non-accepted http methods", (done)=>{
        expect(util.validateRouteMethod('come')).to.equal(false);
        expect(util.validateRouteMethod('send')).to.equal(false);
        expect(util.validateRouteMethod('go')).to.equal(false);
        done()
    });

    it("validateRouteHandler to return true for valid handler", (done)=>{
        const functionDef = ()=>{
            return ;
        };
        expect(util.validateRouteHandler(functionDef)).to.equal(true);
        done()
    });

    it("validateRouteHandler to return false for invalid handler", (done)=>{
        const functionDef = {};
        expect(util.validateRouteHandler(functionDef)).to.equal(false);
        done()
    });

    it("validatePath to return true for valid path", (done)=>{
        const path = '/path';
        expect(util.validatePath(path)).to.equal(true);
        done()
    });


    it("validatePath to return false for invalid path", (done)=>{
        const path = {};
        expect(util.validatePath(path)).to.equal(false);
        done()
    });

    it("validateMiddlewares to return true for valid middleware", (done)=>{
        const middleware = [()=>{}, ()=>{}];
        expect(util.validateMiddlewares(middleware)).to.equal(true);
        done()
    });

    it("validateMiddlewares to return false for invalid middleware", (done)=>{
        const middleware = [()=>{}, {}];
        expect(util.validateMiddlewares(middleware)).to.equal(false);
        done()
    });
});