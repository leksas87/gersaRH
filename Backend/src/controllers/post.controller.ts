import {Request,Response} from 'express'
import {connect} from '../database'
import {Post} from '../interface/Post'

export async function getPosts(req:Request,res:Response): Promise<Response>{
    const conn=await connect();
    const post=await conn.query('Select * from usuario');
    return res.json(post[0]);
}

export async function createPost(req:Request,res:Response) {
    const newPost:Post=req.body;
    const conn=await connect();
    await conn.query("INSERT INTO usuario SET ?",[newPost]);
    return res.json({
        message:'Post Created',
        data:newPost
    });
}

export async function getPost(req:Request,res:Response) :Promise<Response>{
    const id=req.params.postId;
    const conn=await connect();
    const post=await conn.query('SELECT * FROM usuario where id=?',[id])
    return res.json(post[0]);
}

export async function deletePost(req:Request,res:Response) :Promise<Response>{
    const id=req.params.postId;
    const conn=await connect();
    const post=await conn.query('DELETE FROM usuario where id=?',[id])
    return res.json({
        message:'Post deleted'
    });
}

export async function updatePost(req:Request,res:Response) {
    const id=req.params.postId;
    const updatePost:Post=req.body;
    const conn=await connect();
    const post=await conn.query('UPDATE usuario SET ? where id=?',[updatePost, id])
    return res.json({
        message:'Post updated'
    });
}