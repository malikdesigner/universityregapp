const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
const port = 3304;

app.use(bodyParser.json());
// Increase the limit for URL-encoded payloads
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "QWERT!@#$%",
    database: "universityregapp"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit the process on connection error
    } else {
        console.log('Connected to MySQL');
    }
});
app.use(cors({
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true
}))
app.post('/addUserData', async (req, res) => {
    try {
        console.log("REQUEST");
        console.log(req.body);

        const {
            id,
            fullName,
            dofb,
            emails,
            phoneCode,
            phoneNumber,
            passwords,
            selectedAreas,
            marketingUpdates,
            correspondenceInWelsh,
            location
        } = req.body;

        const fullnumber = phoneCode + phoneNumber;
        const currentDate = new Date().toISOString(); // Get current date in ISO format
        const role=0;
        const sql = `INSERT INTO tbl_user (full_name, dob, email,phone_code, phone_number, password,selectedArea, marketing_updates,correspondence_in_welsh, date_added,userlocation,role) 
                    VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?)`;

        const result = await query(sql, [fullName, dofb, emails,phoneCode, phoneNumber, passwords, selectedAreas, marketingUpdates, correspondenceInWelsh, currentDate,location,role]);

        console.log('Record inserted successfully');
        res.status(200).json({ ok: true, message: 'Record inserted successfully' });
    } catch (error) {
        console.error('Error inserting record:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});
app.post('/addStaffData', async (req, res) => {
    try {
        console.log("REQUEST");
        console.log(req.body);

        const {
            fullName,
            dofb,
            emails,
            phoneCode,
            phoneNumber,
            passwords,
            selectedAreas,
            marketingUpdates,
            correspondenceInWelsh,
            location
        } = req.body;

        const fullnumber = phoneCode + phoneNumber;
        const currentDate = new Date().toISOString(); // Get current date in ISO format
        const role=1;
        const sql = `INSERT INTO tbl_user (full_name, dob, email,phone_code, phone_number, password,selectedArea, marketing_updates,correspondence_in_welsh, date_added,userlocation,role) 
                    VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?)`;

        const result = await query(sql, [fullName, dofb, emails,phoneCode, phoneNumber, passwords, selectedAreas, marketingUpdates, correspondenceInWelsh, currentDate,location,role]);

        console.log('Record inserted successfully');
        res.status(200).json({ ok: true, message: 'Record inserted successfully' });
    } catch (error) {
        console.error('Error inserting record:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});

app.post('/addSubject', async (req, res) => {
    try {
        console.log("REQUEST");
        console.log(req.body);

        const {
            subject
        } = req.body;

        const currentDate = new Date().toISOString(); // Get current date in ISO format
        const sql = `INSERT INTO tbl_subjects (subjects, date_added) 
                    VALUES (?, ?)`;

        const result = await query(sql, [subject,currentDate]);

        console.log('Record inserted successfully');
        res.status(200).json({ ok: true, message: 'Record inserted successfully' });
    } catch (error) {
        console.error('Error inserting record:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});

app.post('/updateUserData', async (req, res) => {
    try {
        console.log("REQUEST");
        console.log(req.body);

        const {
            id,
            fullName,
            dofb,
            emails,
            phoneCode,
            phoneNumber,
            passwords,
            selectedAreas,
            marketingUpdates,
            correspondenceInWelsh,
            location
        } = req.body;

        const fullnumber = phoneCode + phoneNumber;
        const currentDate = new Date().toISOString(); // Get current date in ISO format
        
        const sql = `UPDATE tbl_user 
                     SET full_name = ?, dob = ?, email = ?, phone_code = ?, phone_number = ?, password = ?, selectedArea = ?, 
                         marketing_updates = ?, correspondence_in_welsh = ?, date_added = ?, userlocation = ?
                     WHERE id = ?`;

        const result = await query(sql, [fullName, dofb, emails, phoneCode, phoneNumber, passwords, selectedAreas, 
                                         marketingUpdates, correspondenceInWelsh, currentDate, location, id]);

        console.log('Record updated successfully');
        res.status(200).json({ ok: true, message: 'Record updated successfully' });
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});

app.get('/getUserData', async (req, res) => {
    try {
        // Query to fetch game data along with comments and user details
        const userQuery = `SELECT * FROM tbl_user `;

        const userData = await query(userQuery);

        if (userData.length === 0) {
            return res.status(404).json({ ok: false, message: 'No User Found' });
        }

        // Group comments by game ID
       
        res.status(200).json({ ok: true, userData: userData });
    } catch (error) {
        console.error('Error fetching User data:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});
app.get('/getAllSubjects', async (req, res) => {
    try {
        // Query to fetch game data along with comments and user details
        const userQuery = `SELECT * FROM tbl_subjects `;

        const subData = await query(userQuery);

        if (subData.length === 0) {
            return res.status(404).json({ ok: false, message: 'No User Found' });
        }

        // Group comments by game ID
       
        res.status(200).json({ ok: true, subData: subData });
    } catch (error) {
        console.error('Error fetching User data:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Perform a query to check if the email and password match a user in the database
    const query = 'SELECT * FROM tbl_user WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: results[0] });
        }

        const user = results[0];
        // Compare hashed password with provided password
        if (user.password !== password) {
            return res.status(401).json({ message: results[0] });
        }

        // Valid login credentials
        console.log(user.id);
        res.json({ message: 'Login successful', user });
    });
});


function query(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
