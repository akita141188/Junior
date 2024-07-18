const jwt = require("jsonwebtoken")
const config = require("config")
const CustomerModel = require("../../models/customerModel")
const generateAccessToken = (customer)=>{
    return jwt.sign(
        {email: customer.email, password : customer.password},
        config.get("app.jwtAccessKey"),
        {expiresIn : "10s"}
    )
}
const generateRefreshToken = (customer)=>{
    return jwt.sign(
        {email: customer.email, password : customer.password},
        config.get("app.jwtRefreshKey"),
        {expiresIn : "1d"}
    )
}
exports.loginCustomer = async (req,res)=>{
    try {
        const {body} = req;
        const customer = await CustomerModel.findOne({email: body.email});
        if(!customer){
            return res.status(401).json("Email not valid")
        }
        const validPassword = customer.password === body.password;
        if(!validPassword){
            return res.status(401).json("password not valid")
        }
        if(customer && validPassword){
            const accessToken = generateAccessToken(customer)
            const refreshToken = generateRefreshToken(customer)
            
            res.cookie("refreshToken",refreshToken)
            const {password,...others} = customer._doc;
            return res.status(200).json({
                ...others,
                accessToken,
                refreshToken,
            });
        }
    } catch (error) {
        return res.status(500).json(error);
    } 
}

exports.register = async(req,res)=>{
    try {
        const {body} = req;
        const customer = await CustomerModel.findOne({email : body.email});
        if(customer){
            return res.status(401).json("Email exits")
        }
        const isPhoneExits = await CustomerModel.findOne({phone : body.phone});
        if(isPhoneExits){
            return res.status(401).json("Phone exits")
        }
        const newCustomer = {
            email : body.email,
            password : body.password,
            fullName : body.fullName,
            address : body.address,
            phone : body.phone
        }
        await CustomerModel(newCustomer).save();
        return res.status(201).json({
            status: "success",
            message : "create Customer successfull"
        });
    } catch (error) {
                return res.status(500).json(error);
    }
}

exports.refreshToken = async(req,res)=>{
    try {
        const {refreshToken} = req.cookies;
        jwt.verify(
            refreshToken,
            config.get("app.jwtRefreshKey"),
            (error,customer)=>{
                if(error) return res.status(401).json("Authentication failed");
                const newAccessToken = generateAccessToken(customer);
                const newRefreshToken = generateRefreshToken(customer);
                return res.status(200).json({
                    accessToken : newAccessToken,
                    refreshToken : newRefreshToken
                })
            }
        );

    } catch (error) {
        res.status(500).json(error)
    }
}