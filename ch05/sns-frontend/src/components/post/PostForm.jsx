import React, { useState, useCallback, useMemo } from 'react'
import { TextField, Button, Box } from '@mui/material'

const PostForm = ({ onSubmit, initialValues = {} }) => {
   console.log(initialValues)
   const [imgUrl, setImgUrl] = useState(
      initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : ''
   )
   const [imgFile, setImgFile] = useState(null)
   const [imgAlt, setImgAlt] = useState(initialValues.alt || '')
   const [content, setContent] = useState(initialValues.content || '')
   const [hashtags, setHashtags] = useState(
      initialValues.Hashtags ? initialValues.Hashtags.map((tag) => `#${tag.title}`).join(' ') : ''
   )

   const handleImageChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return //파일이 없을경우 함수 종료

      setImgFile(file) //업로드한 파일 객체를 state에 저장
      const reader = new FileReader()
      reader.readAsDataURL(file) //파일을 Base64 URL로 변환(이미지 미리보기에 주로 사용)
      //파일을 비동기적으로 읽을 수 있도록 해주는 객체 -> 이미지 미리보기, 텍스트 파일 읽기 등 주로 사용
      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
      //onload: 파일을 성공적으로 읽은 후 실행되는 함수
   }, [])

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()
         if (!content.trim()) {
            alert('내용을 입력하세요.')
            return
         }
         if (!hashtags.trim()) {
            alert('해시태그를 입력하세요.')
            return
         }
         if (!imgUrl) {
            alert('이미지 파일을 추가하세요.')
            return
         }

         const formData = new FormData() //폼데이터를 쉽게 생성/전송할 수 있도록 하는 객체
         formData.append('content', content) //게시물 내용 추가
         formData.append('hashtags', hashtags) //해시태그 추가
         formData.append('img', imgFile) //이미지 파일 추가
         formData.append('alt', imgAlt || '게시물 이미지') //이미지 파일Alt 추가
         onSubmit(formData)
      },
      [content, hashtags, imgFile, imgAlt, onSubmit]
   )

   const submitButtonLabel = useMemo(
      () => (initialValues.id ? '수정하기' : '등록하기'),
      [initialValues.id]
   )
   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
         {/* 이미지 업로드 필드 */}
         <Button variant="contained" component="label">
            이미지 업로드
            <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
         </Button>

         {imgUrl && (
            <>
               <Box mt={2}>
                  <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
                  <TextField
                     label="대체 이미지 텍스트(Alt)"
                     variant="outlined"
                     fullWidth
                     multiline
                     rows={1}
                     value={imgAlt}
                     onChange={(e) => setImgAlt(e.target.value)}
                     sx={{ mt: 2 }}
                  />
               </Box>
            </>
         )}

         {/* 게시물 내용 입력 필드 */}
         <TextField
            label="게시물 내용"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mt: 2 }}
         />

         {/* 해시태그 입력 필드 */}
         <TextField
            label="해시태그 (# 구분)"
            variant="outlined"
            fullWidth
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="예: #여행 #음식 #일상"
            sx={{ mt: 2 }}
         />

         {/* 등록 / 수정 버튼 */}
         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {submitButtonLabel}
         </Button>
      </Box>
   )
}

export default PostForm
