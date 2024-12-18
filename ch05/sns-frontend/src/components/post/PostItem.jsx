import {
   Card,
   CardMedia,
   CardContent,
   Typography,
   Box,
   CardActions,
   Button,
   IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Link } from 'react-router-dom'
import React, { useCallback } from 'react'
import dayjs from 'dayjs'
import { deletePostThunk } from '../../features/postSlice'
import { useDispatch } from 'react-redux'

const PostItem = ({ post, isAuthenticated, user }) => {
   const dispatch = useDispatch()

   const onClickDelete = useCallback(
      (id) => {
         const check = window.confirm('게시물을 삭제하시겠습니까?')
         if (!check) return
         dispatch(deletePostThunk(id))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 삭제중 오류 발생', error)
               alert('게시물 삭제 중 오류가 발생했습니다.')
            })
      },
      [dispatch]
   )

   return (
      <Card style={{ margin: '20px 0' }}>
         <CardMedia
            sx={{ height: 240 }}
            image={`${process.env.REACT_APP_API_URL}${post.img}`}
            alt={post.alt}
         />
         <CardContent>
            <Link to={`/my/${post.User.id}`} style={{ textDecoration: 'none' }}>
               <Typography sx={{ color: 'primary.main' }}>@{post.User.nick} </Typography>
            </Link>
            <Typography>{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
            <Typography>{post.content}</Typography>
            {post.Hashtags && post.Hashtags.map((hashtag) => <Button>#{hashtag.title}</Button>)}
         </CardContent>
         <CardActions>
            <Button size="small" color="primary">
               <FavoriteBorderIcon fontSize="small" />
            </Button>
            {/* isAuthenticated가 true 이면서 post.User.id와 user.id가 같을때 렌더링 => 내가 작성한 게시글만 수정, 삭제 */}
            {isAuthenticated && post.User.id === user.id && (
               <Box sx={{ p: 2 }}>
                  <Link to={`/posts/edit/${post.id}`}>
                     <IconButton aria-label="edit" size="small">
                        <EditIcon fontSize="small" />
                     </IconButton>
                  </Link>
                  <IconButton
                     aria-label="delete"
                     size="small"
                     onClick={() => onClickDelete(post.id)}
                  >
                     <DeleteIcon fontSize="small" />
                  </IconButton>
               </Box>
            )}
         </CardActions>
      </Card>
   )
}

export default PostItem
