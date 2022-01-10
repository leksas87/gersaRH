 import {Router} from 'express'
 const router=Router();
import {getPost,createPost, getPosts,deletePost,updatePost} from '../controllers/user.controller'

router.route('/')
    .get(getPosts) 
    .post(createPost);

router.route('/:postId')
    .get(getPost)
    .delete(deletePost)
    .put(updatePost);

 export default router;