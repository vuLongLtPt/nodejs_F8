const Course = require('../models/Course');
const { mongooseToObject} = require('../../util/mongoose');

class CoursesController {

    // [GET] /courses/:slug/
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {
                    course : mongooseToObject(course)
                })
            })
            .catch(next)
    };

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    };

    // [POST] /courses/stored
    stored(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`
        Course.create(req.body)
            .then( () =>  res.redirect('/me/courses'))
            .catch(next);
    }

    // [POST] /courses/:id/edit
    edit(req, res, next) {
        Course.findById({ _id : req.params.id })
        .then( course => res.render('courses/edit',{
            course : mongooseToObject(course)
        }))
        .catch(next);
    };

    // [PUT] /courses/:id/
    update(req, res, next) {
        Course.updateOne({ _id : req.params.id }, req.body)
            .then( course => res.redirect('/me/courses'))
            .catch(next);
    };

    // [DELETE] /courses/:id/
    delete(req, res, next) {
        Course.delete({ _id : req.params.id })
            .then( course => res.redirect('back'))
            .catch(next);
    };

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id : req.params.id })
            .then( course => res.redirect('back'))
            .catch(next);
    };


    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id : req.params.id })
            .then( course => res.redirect('back'))
            .catch(next);
    };
    
    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        // res.json(req.body)
        switch( req.body.action){
            case 'delete' :
                Course.delete({ _id : { $in : req.body.coursesId } })
                    .then( course => res.redirect('back'))
                    .catch(next);
                break;
            default :
                res.json({ message: 'Invalid action' })
        }
    }

    // [POST] /courses/handle-trash-actions
    handleTrashActions(req, res, next) {

        
        switch( req.body.action){
            case 'restore' :
                Course.restore({ _id : { $in : req.body.coursesId } })
                    .then( course => res.redirect('back'))
                    .catch(next);
                break;
            case 'force-delete' :
                Course.deleteMany({ _id : { $in : req.body.coursesId } })
                    .then( course => res.redirect('back'))
                    .catch(next);
                break;
            default :
                res.json({ message: 'Invalid action' })
        }
    }
};

module.exports = new CoursesController;
