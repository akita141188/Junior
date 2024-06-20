const CustomerModel = require("../../models/customerModel")

exports.update = async (req, res) => {
    try {
        const { body } = req;
        const customerByPhone = await CustomerModel.findOne({ phone: body.phone });
        if (customerByPhone && customerByPhone.email !== body.email) return res.status(401).json("Phone Number exits !")
        await CustomerModel.updateOne(
            { email: body.email },
            {
                $set : {
                    fullName: body.fullName,
                    phone: body.phone,
                    address: body.address
                }
            }
        )
        return res.status(200).json("Update Customer successfully !")

    } catch (error) {
        return res.status(500).json(error);

    }
}