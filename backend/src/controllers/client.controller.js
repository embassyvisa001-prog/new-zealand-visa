const clientModel = require("../models/client.model");


exports.createClient = async (req, res) => {
    const { Category, FullName, Email, Password, Gender, Address, telephone, DOB, POB, CountryofCitizenship, PassportNumber } = req.body;

    try {

        if(!Category || !FullName || !Email || !Password || !Gender || !Address || !telephone || !DOB || !POB || !CountryofCitizenship || !PassportNumber) {
            return res.status(400).json({ message: "All fields including Password are required" });
        }

        const newClient = new clientModel({
            Category,
            FullName,
            Email,
            Password,
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
    const { Email, Password, PassportNumber, identNum } = req.body;
    const passportToSearch = PassportNumber || identNum;

    try {
        // If Password is sent, treat as User Login authentication
        if (Password !== undefined) {
            if (!Email || !Email.trim() || !Password || !Password.trim()) {
                return res.status(400).json({ message: "Email ID and Password are required." });
            }

            const client = await clientModel.findOne({
                Email: { $regex: new RegExp(`^${Email.trim()}$`, "i") }
            });

            if (!client || client.Password !== Password.trim()) {
                return res.status(400).json({ message: "Invalid Email ID or Password." });
            }

            return res.status(200).json(client);
        }

        // Admin lookup by Email or PassportNumber (when no Password parameter passed)
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
