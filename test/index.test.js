const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const express = require('express')


const cleanrouter = require("../index");
const utils = require("../utils")

describe("## express clean routes creator", (done) => {
    let validatePathStub, validateMiddlewaresStub, validateRouteHandlerStub, validateRouteMethodStub, expressSpy
    beforeEach(() => {
        validatePathStub = sinon.spy(utils, "validatePath");
        validateMiddlewaresStub = sinon.spy(utils, "validateMiddlewares");
        validateRouteHandlerStub = sinon.spy(utils, "validateRouteHandler");
        validateRouteMethodStub = sinon.spy(utils, "validateRouteMethod");
        expressSpy = sinon.spy(express, "Router")

    });
    afterEach(() => {
        utils.validatePath.restore();
        utils.validateMiddlewares.restore();
        utils.validateRouteHandler.restore();
        utils.validateRouteMethod.restore();
        express.Router.restore()
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
            sinon.assert.calledOnce(validatePathStub);
            sinon.assert.calledOnce(validateMiddlewaresStub);
            sinon.assert.calledTwice(validateRouteHandlerStub);
            sinon.assert.calledOnce(validateRouteMethodStub);
            sinon.assert.calledOnce(expressSpy);
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
            sinon.assert.calledOnce(validatePathStub);
            sinon.assert.calledOnce(validateMiddlewaresStub);
            sinon.assert.calledTwice(validateRouteHandlerStub);
            sinon.assert.calledOnce(validateRouteMethodStub);
            sinon.assert.calledOnce(expressSpy);
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
        ];

        const routes = cleanrouter([path]);
        sinon.assert.calledOnce(validatePathStub);
        sinon.assert.calledOnce(validateMiddlewaresStub);
        sinon.assert.calledTwice(validateRouteHandlerStub);
        sinon.assert.calledOnce(validateRouteMethodStub);
        sinon.assert.calledOnce(expressSpy);
        expect(typeof routes).to.equal('function');
        done();
    });

});