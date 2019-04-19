const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const express = require('express')


const cleanrouter = require("../index");
const utils = require("../utils")

describe("## express clean routes creator", (done) => {
    let  postStub;
    beforeEach(() => {
        spy1 = sinon.spy(cleanrouter);
        postStub = sinon.stub(express.Router(), 'route').callsFake(()=>{
            return false
        });

    });
    afterEach(() => {

    });

    it("registerRoutes to throw error for invalid method", (done)=>{
        const path = [
            {
                'path' : '/users/info',
                'method' : 'invalidmethod',
                'middlewares' : [() =>{}],
                'handlers' : () =>{}
            }
        ]
        const routerSpy = sinon.spy(cleanrouter)
        try {
            routerSpy([path]);
        } catch(e){
            expect(e.message).to.equal('invalid route for /users/info Method:invalidmethod');
            done();
        }


    });
    it("registerRoutes to throw error for invalid handler", (done)=>{
        const path = [
            {
                'path' : '/users/info',
                'method' : 'get',
                'middlewares' : [() =>{}],
                'handlers' : {}
            }
        ]
        const routerSpy = sinon.spy(cleanrouter)
        try {
            routerSpy([path]);
        } catch(e){
            expect(e.message).to.equal('invalid route for /users/info Method:get');
            done();
        }


    });
    it("registerRoutes should validate the inputs in path", (done)=>{
        const path = [
            {
                'path' : '/users/info',
                'method' : 'get',
                'middlewares' : [() =>{}],
                'handlers' : () =>{}
            }
        ]
        const validatePathStub = sinon.spy(utils, "validatePath")
        const validateMiddlewaresStub = sinon.spy(utils, "validateMiddlewares")
        const validateRouteHandlerStub = sinon.spy(utils, "validateRouteHandler")
        const validateRouteMethodStub = sinon.spy(utils, "validateRouteMethod")
        cleanrouter([path]);
        sinon.assert.calledOnce(validatePathStub);
        sinon.assert.calledOnce(validateMiddlewaresStub);
        sinon.assert.calledTwice(validateRouteHandlerStub);
        sinon.assert.calledOnce(validateRouteMethodStub);
        utils.validatePath.restore();
        utils.validateMiddlewares.restore();
        utils.validateRouteHandler.restore();
        utils.validateRouteMethod.restore();
        done();

    });

});