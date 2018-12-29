const express = require('express')
const router = express.Router();

const db = require('../config/db');
const Gig = require('../models/Gig');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gigs
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render('gigs', {
        gigs
      });
    })
    .catch(err => console.log(err));
});

//Display gig form
router.get('/add', (req, res) => {
  res.render('add');
})


// Add gigs
router.post('/add', (req, res) => {
  let {
    title,
    technologies,
    description,
    budget,
    contact_email
  } = req.body;

  let errors = []

  //Validate errors
  if (!title) {
    errors.push({
      text: 'Please enter title'
    })
  }
  if (!technologies) {
    errors.push({
      text: 'Please add some technologies'
    });
  }
  if (!description) {
    errors.push({
      text: 'Please add a description'
    });
  }
  if (!contact_email) {
    errors.push({
      text: 'Please add a contact email'
    });
  }

  //Check erros
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      description,
      budget,
      contact_email
    })
  } else {
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/, /g, ',');

    //Insert into table
    Gig.create({
        title,
        technologies,
        description,
        budget,
        contact_email
      })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err))
  }
});

router.get('/search', (req, res) => {
  let {
    term
  } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({
      where: {
        technologies: {
          [Op.iLike]: '%' + term + '%'
        }
      }
    })
    .then(gigs => res.render('gigs', {
      gigs
    }))
    .catch(err => console.log(err));
});

module.exports = router;