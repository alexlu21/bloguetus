import { format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import { UserContext } from '../components/UserContext'
import { URL_BACKEND } from '../config'

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null)
  const {id} = useParams()
  const {userInfo} = useContext(UserContext)

  useEffect(()=>{
    // console.log(id)
    fetch(`${URL_BACKEND}/post/${id}`)
    .then(res =>{
      res.json().then(postInfo =>{
        setPostInfo(postInfo)
      })
    })
  },[id])

  if(!postInfo){
    return ""
  }

  return (
    <div className="post-page">
      <h1 style={{marginBottom:"20px"}}>{postInfo.tittle}</h1>
      <time style={{color:'black'}}>Publicado el {format(new Date(postInfo.createdAt), "d/MM/yyy | HH:mm")}</time>
      <div className="author" style={{fontSize:'15px'}}>Hecho por: {postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edtit Post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`${URL_BACKEND}/${postInfo.cover}`} alt='' />
      </div>
      <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
    </div>
  )
}

export default PostPage
