import PostForm from '../components/post/PostForm'
import { Container } from '@mui/material'
import { useCallback } from 'react'
import { createPostThunk } from '../features/postSlice'
import { useDispatch } from 'react-redux'

const PostCreatePage = () => {
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      // postData: 사용자가 PostForm에서 작성한 정보
      (postData) => {
         dispatch(createPostThunk(postData))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 등록 중 에러:', error)
               alert('게시물 등록에 실패했습니다.')
            })
      },
      [dispatch]
   )
   return (
      <Container maxWidth="md">
         <h1>게시물 등록</h1>
         <PostForm onSubmit={handleSubmit} />
      </Container>
   )
}

export default PostCreatePage
