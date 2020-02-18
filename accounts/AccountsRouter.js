const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  // list of accounts
  db.select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to GET the list of accounts.' });
    });
});

router.get('/:id', (req, res) => {
  // an account by it's id
  db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to GET the account.' });
    })
});

router.post('/', (req, res) => {
  // add an account
  const accountInfo = req.body;

  db('accounts')
    .insert(accountInfo)
    .then(newAcct => {
      res.status(201).json(newAcct);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to POST the account.' });
    });
});

router.put('/:id', (req, res) => {
  // update an account
  const id = req.params.id;
  const changes = req.body;

  db('accounts')
    .where({ id })
    .update(changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to PUT the account.' });
    });
});

router.delete('/:id', (req, res) => {
  // delete an account
  const id = req.params.id;

  db('accounts')
    .where({ id })
    .del()
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to PUT the account.' });
    });
});

module.exports = router;