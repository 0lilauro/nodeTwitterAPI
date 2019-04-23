// Initialize 
let twitter = require('express').Router();
let mariadb = require('mariadb');

// Create a db connection
const pool = mariadb.createPool({
	user: "root",
	host: "localhost",
	password: "",
	database: "apitest",
	connectionLimit: 5
});

// route (localhost:8080/twitter/:id?)
twitter.get('/:id?', function (req, res) {
    let limiter = 100;
    let conditional = '';
    if(req.params.id) {
        conditional = `WHERE id = ${req.params.id}`;
    }
	async function asyncFunction() {
		let conn;
		try {
            conn = await pool.getConnection();
            let query = `
            SELECT 
                id,
                username,
                post,
                DATE_FORMAT(date_post,'%d/%m/%Y') as 'date'
            FROM 
                twitter
            ${conditional} 
            LIMIT ${limiter}
            `;
			const rows = await conn.query(query);
			res.json({
				status: 'success',
				message: rows
			}); 
		} catch (err) {
			res.json({
				status: 'erro',
				message: err.message
			});
		} finally {
			if (conn) return conn.end();
		}
    }
    asyncFunction();
});

// route (localhost:8080/twitter/)
// Body:
// {
//  "username": "@melissaLinda",
// 	"post": "lorem ipsum"
// }
twitter.post('/', function (req, res) {
    async function asyncFunction() {
        let conn;
        let username = req.body.username;
        let post = req.body.post;
		try {
            conn = await pool.getConnection();
            let query = `
            INSERT INTO twitter VALUES
            (NULL,'${username}','${post}',DEFAULT);
            `;
			const response = await conn.query(query);
			res.json({
				status: 'success',
				message: response
			}); 
		} catch (err) {
			res.json({
				status: 'erro',
				message: err.message
			});
		} finally {
			if (conn) return conn.end();
		}
    }
    if(req.body.username != undefined && req.body.post != undefined) {
        asyncFunction();
    }
    else {
        res.json({
            status: 'error',
            message: "No json parsed"
        });
    }
});

// route (localhost:8080/twitter/:id)
// Body:
// {
//  "username": "@melissaLinda",
// 	"post": "lorem ipsum"
// }
twitter.put('/:id', function (req, res) {
	async function asyncFunction() {
        let conn;
        let set = '';
        let username = req.body.username;
        let post = req.body.post;
        let id = req.params.id;
        if(post && username) {
            set = `username = '${username}', post = '${post}'`;
        } 
        else if(post) {
            set = `post = '${post}'`;
        }
        else {
            set = `username = '${username}'`;
        }
        try {
            conn = await pool.getConnection();
            let query = `
            UPDATE 
                twitter
            SET ${set}
            WHERE 
                id = ${id}            
            `;
			const response = await conn.query(query);
			res.json({
				status: 'success',
				message: response
			}); 
		} catch (err) {
			res.json({
				status: 'erro',
				message: err.message
			});
		} finally {
			if (conn) return conn.end();
		}
    }
    if(req.body.username != undefined || req.body.post != undefined) {
        asyncFunction();
    }
    else {
        res.json({
            status: 'error',
            message: "No json parsed"
        });
    }
});

// route (localhost:8080/twitter/:id)
twitter.delete('/:id', function (req, res) {
	async function asyncFunction() {
        let conn;
        let id = req.params.id;
		try {
            conn = await pool.getConnection();
            let query = `
            DELETE 
            FROM 
                twitter
            WHERE id = ${id}
            `;
			const rows = await conn.query(query);
			res.json({
				status: 'success',
				message: rows
			}); 
		} catch (err) {
			res.json({
				status: 'erro',
				message: err.message
			});
		} finally {
			if (conn) return conn.end();
		}
    }
    if(req.params.id != undefined) {
        asyncFunction();
    }
    else {
        res.json({
            status: 'error',
            message: "No id parsed"
        });
    }
});

// Export API ROUTES
module.exports = twitter;