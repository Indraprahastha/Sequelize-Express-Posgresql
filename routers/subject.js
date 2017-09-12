let express = require('express')
let router = express.Router()
let models = require('../models')
let helper = require('../helper/score')

// router.get('/', (req,res) => {
//   teachersModels.
// })

router.get('/', function(req, res) {
  models.Subject.findAll({
    include: [models.Teacher]
  }).then(function(Subject) {
    res.render('subject',{dataSubjects:Subject});
    // res.send(Subject[0].Teachers[0].first_name)
  });
});

//===================================================== enroll student

router.get('/:id/enrolledstudents', function(req, res) {
  models.Subject.findAll({
    where: {
      id: `${req.params.id}`
    },
    include: [models.Student]
  }).then(function(Subject) {
    // res.render('subject',{dataSubjects:Subject});
    res.render('subject-enrolledstudents',{dataSubjects:Subject[0].Students,subject:Subject,helper:helper})

  });
});

//========================================================= give score

router.get('/:id/:ids/givescore', (req, res)=>{
  models.Subject.findAll({
    where: {
      id: `${req.params.ids}`
    }
  })
  .then((dataSubject) => {
    models.Student.findAll({
      where: {
        id: `${req.params.id}`
      }
    })
    // console.log(dataSubject, '<------ data subject yang baru');
    .then((dataStudent) => {
      // console.log(dataSubject, '<---------- data subject');
      res.render('subject-giveScore', {dtStudent:dataStudent[0], dtSubject:dataSubject[0]})
    })
  })
})

router.post('/:id/:ids/givescore', (req, res)=>{
  models.Studentsubject.update({
    score: Number(req.body.score)
  },{
    where: {
      student_id: `${req.params.id}`,
      $and: {
        subject_id: `${req.params.ids}`
      }
    }
  })
  .then(() => {
    res.redirect('/subject')
    // res.send(Studentsubject)
  })
})


module.exports = router
