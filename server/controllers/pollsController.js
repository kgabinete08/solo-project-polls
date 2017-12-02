const db = require('../db');

module.exports = {
  getPolls: (req, res) => {
    db.query('SELECT * FROM polls ORDER BY _id asc', (error, result) => {
      if (error) return res.status(500).send('error');
      res.status(200);
      return res.json(result.rows);
    });
  },

  updatePoll: (req, res) => {
    let count;
    db.query(`SELECT options[${req.body.option}][2] from polls where _id = ${req.body.id}`, (error, result) => {
      count = parseFloat(result.rows[0].options) + 1;
      db.query(`UPDATE polls set options[${req.body.option}][2] = ${count} where _id = ${req.body.id}`, (err) => {
        db.query('SELECT * FROM polls ORDER BY _id asc', (errors, output) => {
          if (error) return res.status(500).send('error');
          res.status(200);
          return res.json(output.rows);
        });
      });
    });
  },
};
