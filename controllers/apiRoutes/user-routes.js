const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
        id: req.params.id
      },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
          attributes: [
              'id',
              'title',
              'post_body',
              'created_at'
          ]
        },
        {
          model: Comment,
          attributes: [
              'id',
              'comment_text',
              'post_id',
              'user_id',
              'created_at'
            ],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found.' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log.og(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
          email: req.body.email
        }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'Email or Password is incorrect.' });
        return;
      }
    
      const validatePassword = dbUserData.checkPassword(req.body.password);
        if (!validatePassword) {
        res.status(400).json({ message: 'Email or Password is incorrect.' });
        return;
      }
      
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        
            res.json({ user: dbUserData, message: 'Logged in.' });
        })
    });
});

router.put('/:id', withAuth, (res,req) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found.' });
            return;
          }
        res.json(dbUserData);
        })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

module.exports = router;