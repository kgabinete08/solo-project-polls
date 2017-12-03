const db = require('../db');

module.exports = {
  getPolls: (req, res) => {
    db.query('SELECT * FROM polls ORDER BY _id desc', (error, result) => {
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
        if (err) res.status(500).send(err.stack);

        db.query('SELECT * FROM polls ORDER BY _id desc', (errors, output) => {
          if (error) return res.status(500).send('error');
          res.status(200);
          return res.json(output.rows);
        });
      });
    });
  },

  createPoll: (req, res) => {
    const { title, options } = req.body;
    const optionArray = options.map(item => [item.option, '0']);

    db.query('INSERT INTO polls (title, options) values ($1, $2);', [title, optionArray], (err, table) => {
      if (err) return res.status(500).send(err.stack);
      res.status(200);
      return res.json(table);
    });
  },
};
