let express = require('express')
let router = express.Router()
let models = require('../models')

// router.get('/', (req,res) => {
//   teachersModels.
// })

router.get('/', function(req, res) {
  models.Student.findAll().then(function(Student) {
    res.render('student',{dataStudent:Student});
  });
});

//===================================================== ADD
router.get('/add', function(req, res) {
  res.render('student-add',{err: false});
})
router.post('/add',function (req, res) {
  models.Student.create({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  })
  .then(() => {
    res.redirect('/student')
  })
  .catch(()=>{
    res.render('student-add',{err: 'Maaf Email Telah digunakan Brow'});
  })
})
//===================================================== getById
router.get('/edit/:id', (req, res) => {
  models.Student.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.render('student-edit', {data:data})
  })
})
router.post('/edit/:id', (req, res) => {
  models.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  },{
    where: {
      id: req.params.id
    }
  })
  .then(()=>{
    res.redirect('/student')
  })
  .catch((data)=>{
    res.redirect('/student')
  })
})
//===================================================== Delete
router.get('/delete/:id', (req, res) => {
  models.Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(()=>{
    res.redirect('/student')
  })
})
//================================================ Add Subject
router.get('/addsubject/:id', (req, res)=>{
  models.Student.findById(req.params.id)
  .then((dataStudent) => {
    models.Subject.findAll()
    .then((dataSubject) => {
      res.render('student-addsubject', {dataStudent:dataStudent, dataSubject:dataSubject})
    })
  })
})

router.post('/addsubject/:id', (req, res)=>{
  models.Studentsubject.create({
    student_id: `${req.params.id}`,
    subject_id: `${req.body.subject_id}`
  })
  .then(() => {
    res.redirect('/student')
  })
})




module.exports = router
