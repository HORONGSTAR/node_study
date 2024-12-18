import PostForm from '../components/post/PostForm'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { fetchPostByIdThunk, updatePostThunk } from '../features/postSlice'

const PostEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { post, loading, error } = useSelector((state) => state.posts)

   useEffect(() => {
      dispatch(fetchPostByIdThunk(id))
   }, [dispatch, id])

   const handleSubmit = useCallback(
      (postData) => {
         dispatch(updatePostThunk({ id, postData }))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 등록 중 에러:', error)
               alert('게시물 등록에 실패했습니다.')
            })
      },
      [dispatch, id]
   )

   if (loading) return <p>로딩중...</p>
   if (error) return <p>에러발생:{error}</p>

   return (
      <Container maxWidth="md">
         <h1>게시물 등록</h1>
         {post && <PostForm onSubmit={handleSubmit} initialValues={post} />}
      </Container>
   )
}

export default PostEditPage
