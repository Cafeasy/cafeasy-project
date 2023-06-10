const CustomerController = require('../controllers/Customercontroller');
const CustomerModel = require('../model/Customermodel');
const db = require('../config/database');

beforeAll(async () => await db.connect())

afterAll(async () => await db.closeDatabse())

describe('Customer Function', () => {
    it('GetName Adjie', (done) => {
        CustomerModel.findOne({name:"adjie"})
            .then((result) => expect(result.name).toEqual("adjie")).catch((err) => console.log(err))

        done();
    })
    it('Insert Customer and get it as inserted', async () => {
        const pelanggan = {
            id: "12840981902384",
            name: "angie"
        }
        await CustomerController.buatCustomer(pelanggan);
        const customerId = await CustomerController.getOneCustomerById("12840981902384");
        expect(customerId.id).toEqual("12840981902384")
        expect(customerId.name).toEqual("angie")
    })
})

