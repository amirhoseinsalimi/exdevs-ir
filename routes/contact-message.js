let express = require('express'),
    router = express.Router(),
    connection = require('../connection');

/* Process POST data */
router.post('/', function(req, res, next) {

    connection.connect((err) => {
        if (err){
            res.status(500);
            res.render('500');
        } else {
            const name = req.body.name;
            const email = req.body.email;
            const message = req.body.message;

            const query = `INSERT INTO messages (name, email, text) VALUES (?, ?, ?);`;

            connection.query(query, [name, email, message], (err, result) => {
                if (err) {
                    res.status(500);
                    res.render('500');
                } else {
                    res.redirect('/');
                }

                connection.end();
            });
        }
    });

});

module.exports = router;
