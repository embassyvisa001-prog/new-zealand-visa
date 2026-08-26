const clientModel = require("../models/client.model");


exports.createClient = async (req, res) => {
    const { Category, FullName, Email, Gender, Address, telephone, DOB, POB, CountryofCitizenship, PassportNumber } = req.body;

    try {

        if(!Category || !FullName || !Email || !Gender || !Address || !telephone || !DOB || !POB || !CountryofCitizenship || !PassportNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newClient = new clientModel({
            Category,
            FullName,
            Email,
            Gender,
            Address,
            telephone,
            DOB,
            POB,
            CountryofCitizenship,
            PassportNumber
        });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAClients = async (req, res) => {
    const { Email, PassportNumber, identNum } = req.body;
    const passportToSearch = PassportNumber || identNum;

    try {
        const query = {};
        if (Email && Email.trim()) {
            query.Email = { $regex: new RegExp(`^${Email.trim()}$`, "i") };
        }
        if (passportToSearch && passportToSearch.trim()) {
            query.PassportNumber = { $regex: new RegExp(`^${passportToSearch.trim()}$`, "i") };
        }

        if (!query.Email && !query.PassportNumber) {
            return res.status(400).json({ message: "Please provide an Email or Passport / Identification Number to search." });
        }

        const client = await clientModel.findOne(query);
        if (!client) {
            return res.status(404).json({ message: "No client application found matching your details." });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.editClient = async (req, res) => {
    const { id } = req.params;
    const { Status , Paragraph } = req.body;

    try {
        const client = await clientModel.findById(id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        Object.assign(client, req.body);
        await client.save();
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
