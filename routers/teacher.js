let express = require('express')
let router = express.Router()
let models = require('../models')

// router.get('/', (req,res) => {
//   teachersModels.
// })

router.get('/', function(req, res) {
  models.Teacher.findAll({
    include: [models.Subject]
  }).then(function(Teacher) {
    res.render('teacher',{dataTeachers:Teacher});
    // res.send(Teacher[0].Subject.subject_name)
  })
  // models.Teacher.findAll().then(function(Teacher) {
  //   models.Subject.findAll().then(function(Subject) {
  //     for (var i = 0; i < Teacher.length; i++) {
  //       for (var j = 0; j < Subject.length; j++) {
  //         if (Teacher[i].id_subject == Subject[j].id) {
  //           Teacher[i].name = Subject[j].subject_name
  //         }
  //       }
  //     }
  //
  //     res.render('teacher',{dataTeachers:Teacher,dataSubject:Subject});
  //
  //   })
  //
  // });
});

//========================================================= ADD
router.get('/add', function(req, res) {
  res.render('teacher-add',{err: false});
})
router.post('/add', function(req,res) {
  models.Teacher.create({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    id_subject : req.body.id_subject
  })
  .then(() => {
    res.redirect('/teacher')
  })
  .catch(() => {
    res.render('teacher-add')
  })
})
//====================================================== getById
router.get('/edit/:id', (req, res) => {
  models.Teacher.findAll({
    where: {
      id: req.params.id
    }
  }).then(data => {
    models.Subject.findAll().then(dataSubject => {
      res.render('teacher-edit', {data:data, dataSubject:dataSubject})
    })
  })
})


router.post('/edit/:id', (req, res) => {
  models.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    id_subject : req.body.id_subject
  },{
    where: {
      id: req.params.id
    }
  })
  .then(()=>{
    res.redirect('/teacher')
  })
  .catch((data)=>{
    res.redirect('/teacher')
  })
})
//===================================================== Delete
router.get('/delete/:id', (req, res) => {
  models.Teacher.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(()=>{
    res.redirect('/teacher')
  })
})

module.exports = router
