const { dbConf, dbQuery } = require("../config/db");
const crypto = require('crypto');
const magenta = '\x1b[35m';
module.exports = {
    getListEmployeeName: async (req, res) => {

        let date = new Date();
        let timestamp = magenta + date.toLocaleDateString() + ' ';



        let query = `
        SELECT name, id FROM card_items 
        `;


        dbConf.query(query, async (err, results) => {
            if (err) {
                res.status(500).send({
                    message: ` ERROR! Please Check Connection`,
                    success: false,
                    err
                });
                console.log(`${timestamp} ERROR at auth -> createUser message: ${err}`);
            } else {
                res.status(200).send({
                    message: ` successfully Get Employee Data !`,
                    success: true,
                    data: results,
                    err: ''
                });
                console.log(`${timestamp} admin => Get Employee Data success`);
            }
        })

    }, getEmployeeData: async (req, res) => {
        let date = new Date();
        let timestamp = magenta + date.toLocaleDateString() + ` `;

        let { employee_id } = req.query; // Correct variable name here

        let query = `
        SELECT * from card_items where id = ?`; // Using placeholder to prevent SQL injection

        dbConf.query(query, [employee_id], async (err, results) => { // Passing employee_id as parameter
            if (err) {
                res.status(500).send({
                    message: ` ERROR! Please Check Connection`,
                    success: false,

                });
                console.log(`${timestamp} ERROR at auth -> Get message: ${err}`);
            } else {
                res.status(200).send({
                    message: ` successfully Get Employee Data !`,
                    success: true,
                    data: results,
                });
                console.log(`${timestamp} admin => Get Employee Data with id ${employee_id} success`);
            }
        })
    },
    setEmployeeData: async (req, res) => {
        let date = new Date();
        let timestamp = magenta + date.toLocaleDateString() + ` `;

        let {

            e_name,
            e_position,
            e_phone,
            e_mail,
            e_extphone,
            e_company,
            e_link,
        } = req.body; // Access data from request body

        e_name = e_name || ""; // If e_name is null, replace with empty string
        e_position = e_position || "";
        e_phone = e_phone || "";
        e_mail = e_mail || "";
        e_extphone = e_extphone || 0;
        e_company = e_company || "";
        e_link = e_link || "";

        const hash = crypto.createHash('sha256'); // Use SHA-256 hash algorithm
        hash.update(e_name); // Update the hash with the name
        const e_id = hash.digest('hex');
        // Construct the SQL query
        let query = `
            INSERT INTO cards.card_items
            (id, name, position, phone, mail, ext_phone, company, link)
            VALUES('${e_id}', '${e_name}', '${e_position}', '${e_phone}', '${e_mail}', '${e_extphone}', '${e_company}', '${e_link}');
            `;

        // Execute the SQL query
        dbConf.query(query, async (err, results) => {
            if (err) {
                // Handle errors
                res.status(500).send({
                    message: `ERROR! Please Check Connection`,
                    success: false,
                    err
                });
                console.log(`${timestamp} ERROR at auth -> Get message: ${err}`);
                console.log("e_name", e_name)
                console.log("e_position", e_position)
                console.log("e_phone", e_phone)
                console.log("e_mail", e_mail)
                console.log("e_extphone", e_extphone)
            } else {
                // Send success response
                res.status(200).send({
                    message: `Successfully Create Employee Data!`,
                    success: true,
                    qr: e_id,
                });
                console.log(`${timestamp} admin => Create Employee Data with id ${e_id} success`);
            }
        });
    },
    updateEmployeeData: async (req, res) => {
        let date = new Date();
        let timestamp = magenta + date.toLocaleDateString() + ` `;

        let {
            e_identification,
            e_name,
            e_position,
            e_phone,
            e_mail,
            e_extphone,
            e_company,
            e_link,
        } = req.body;

        e_name = e_name || ""; // If e_name is null, replace with empty string
        e_position = e_position || "";
        e_phone !== -1 ? e_phone : ""
        e_mail = e_mail || "";
        e_extphone = e_extphone || 0;
        e_company = e_company || "" ;
        e_link = e_link || "";

        let query = `
        UPDATE cards.card_items
    SET name = '${e_name}',
        position = '${e_position}',
        phone = '${e_phone}',
        mail = '${e_mail}',
        ext_phone = '${e_extphone}',
        company = '${e_company}',
        link = '${e_link}'
    WHERE id = '${e_identification}';
        `;

        dbConf.query(query, async (err, results) => {
            if (err) {
                res.status(500).send({
                    message: `ERROR! Please Check Connection`,
                    success: false,
                    err
                });
                console.log(`${timestamp} ERROR at auth -> Get message: ${err}`);
                console.log("e_name", e_name)
                console.log("e_position", e_position)
                console.log("e_phone", e_phone)
                console.log("e_mail", e_mail)
                console.log("e_extphone", e_extphone)
            } else {
                res.status(200).send({
                    message: `Successfully Update Employee Data!`,
                    success: true,
                    qr: e_identification

                });
                console.log(`${timestamp} admin => Update Employee Data with id ${e_identification} success`);
            }
        });
    }, deleteeEmployeeData: async (req, res) => {
        let date = new Date();
        let timestamp = magenta + date.toLocaleDateString() + ` `;

        let {
            e_identification,
        } = req.body;

        let query = `
        DELETE FROM cards.card_items
        WHERE id = '${e_identification}';
        `;

        dbConf.query(query, async (err, results) => {
            if (err) {
                res.status(500).send({
                    message: `ERROR! Please Check Connection`,
                    success: false,
                    err
                });
                console.log(`${timestamp} ERROR at auth -> Get message: ${err}`);
                console.log("e_name", e_name)
                console.log("e_position", e_position)
                console.log("e_phone", e_phone)
                console.log("e_mail", e_mail)
                console.log("e_extphone", e_extphone)
            } else {
                res.status(200).send({
                    message: `Successfully Delete Employee Data!`,
                    success: true,

                });
                console.log(`${timestamp} admin => Delete Employee Data with id ${e_identification} success`);
            }
        });
    }


}