const express = require('express');
const router = express.Router();
 
const courseController = require('../app/controllers/CoursesController')

router.get('/create' , courseController.create);
router.post('/stored' , courseController.stored);
router.get('/:id/edit' , courseController.edit);
router.post('/handle-form-actions' , courseController.handleFormActions );
router.post('/handle-trash-actions' , courseController.handleTrashActions );
router.patch('/:id/restore' , courseController.restore);
router.put('/:id' , courseController.update);
router.delete('/:id/force' , courseController.forceDelete);
router.delete('/:id' , courseController.delete);
router.get('/:slug' , courseController.show);

module.exports = router;
