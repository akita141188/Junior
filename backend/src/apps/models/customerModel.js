const mongoose = require("../../common/database")();
const customerSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    fullName : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
},{timestamps: true});

const CustomerModel = mongoose.model("Customers",customerSchema,"customers");
module.exports = CustomerModel;