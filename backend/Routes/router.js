const express = require('express')
const userController=require('../Controller/userController')
const noteController=require('../Controller/noteController')
const jwtMiddleware=require('../Middleware/jwtMiddleware')



const router = new express.Router()




router.post('/register',userController.registerUserController)


router.post('/login',userController.loginController)



router.post('/addNote',jwtMiddleware,noteController.createNoteController) 

router.get('/getNotes',jwtMiddleware,noteController.getNotesController) 

router.put('/updateNotes/:id',jwtMiddleware,noteController.updateNoteController) 

router.delete('/deleteNote/:id',jwtMiddleware,noteController.deleteNoteController)


router.get('/getSingleBlog/:id',jwtMiddleware,noteController.getSingleBlogController)

module.exports = router