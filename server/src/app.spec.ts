import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http'

import app from './app';


chai.use(chaiHttp);
const expect = chai.expect;
const requester = chai.request(app).keepOpen();

describe('Stock Server', () => {
    
    describe('Stocks', () => {
        it('Should GET stocks', (done) => {
            chai.request(app)
            .get('/stocks')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
        });
    });

    describe('Watchlist', () => {
        it('Should GET watchlist', (done) => {
            chai.request(app)
            .get('/watchlist')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
        });
    });
});

requester.close();
