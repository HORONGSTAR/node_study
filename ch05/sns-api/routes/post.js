const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { User, Post, Hashtag } = require('../models')
const { isLoggedIn } = require('./middlewares')

//uploads폴더가 없을 경우 새로 생성
try {
   fs.readdirSync('uploads')
} catch (err) {
   console.log('uploads 폴더가 없어 uploads폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

//이미지 업로드를 위한 multer설정
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/') //uploads 폴더에 저장
      },
      filename(req, file, cb) {
         const ext = path.extname(file.originalname)
         cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
      },
   }), //저장할 위치
   limits: { fileSize: 5 * 1024 * 1024 }, //파일크기 5MB로 제한
})

//게시물 등록
router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      if (!req.file) {
         //업로한 파일이 없거나 무언가 이상이 생겨서 파일 정보가 넘어오지 않는 경우
         return res.status(400).json({ success: false, message: '파일업로드에 실패했습니다.' })
      }
      //게시물 생성
      const post = await Post.create({
         content: req.body.content,
         img: `/${req.file.filename}`,
         alt: req.body.alt,
         UserId: req.user.id,
      })
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g)
      //#을 기준으로 해시태그를 추출

      //추출된 해시태그 값이 있으면
      if (hashtags) {
         //Promise.all : 여러개의 비동기 직업을 병렬로 처리, 모든 해시태그가 데이터 베이스에서 생성되거나 찾아질때까지 기다림
         //병렬처리 : 동시에 여러개의 작업을 실행

         //두 작업이 비동기적으로 동시 실행(findOrCreate:비동기, Promise.all:병렬처리)
         //-> 빠른 속도로 처리 가능
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) },
               })
            )
         )
         //result = [HashtagInstance1, true] 새로 생성된 해시태그라면 true, 이미 있다면 false
         //r[0] = HashtagInstance1
         //HashtagInstance를 통해 post와의 관계를 설정하고 이 과정에서 PostHashtag 테이블의 postId와 HashtagId 컬럼에 값이 추가됨
         await post.addHashtags(result.map((r) => r[0]))
      }
      res.json({
         success: true,
         post: {
            id: post.id,
            content: post.content,
            img: post.img,
            alt: post.alt,
            UserId: post.UserId,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시물 등록 중 오류가 발생했습니다.',
         error,
      })
   }
})

//게시물 수정
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      //게시물 존재 여부
      const post = await Post.findOne({
         where: {
            id: req.params.id,
            UserId: req.user.id,
         },
      })
      if (!post) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }

      //게시글 수정
      await post.update({
         content: req.body.content,
         alt: req.body.alt,
         img: req.file ? `/${req.file.filename}` : post.img, //수정된 이미지 파일이 있으면 교체, 없으면 기존 값 유지
      })
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g)

      if (hashtags) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) },
               })
            )
         )

         await post.addHashtags(result.map((r) => r[0]))
      }
      //게시물 다시 조회
      const updatedPost = await Post.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
               //select User.id, User.nick from User join Post on id;
            },
            {
               model: Hashtag,
               attributes: ['title'],
               //select Hashtag.title from Hashtag join Post on id;
            },
         ],
      })
      res.json({
         success: true,
         post: updatedPost,
         message: '게시글을 성공적으로 수정했습니다.',
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '게시글 수정중 오류가 발생했습니다.',
      })
   }
})
//게시물 삭제
router.delete('/:id', async (req, res) => {
   try {
      const post = await Post.findOne({
         where: {
            id: req.params.id,
            UserId: req.user.id,
         },
      })
      if (!post) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      await post.destroy()
      res.json({
         success: true,
         message: '게시글이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시글 삭제 중 오류가 발생했습니다.',
         error,
      })
   }
})

//특정 게시물 불러오기(id로 게시물 조회)
router.get('/:id', async (req, res) => {
   try {
      const post = await Post.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })
      if (!post) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      res.json({
         success: true,
         post,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시물을 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

//전체 게시물 불러오기(페이징 기능)
router.get('/', async (req, res) => {
   // parseInt('08')=>일부 브라우저에서 NaN반환
   // parseInt('08',10)=>10진수 8을 반환
   const page = parseInt(req.query.page, 10) || 1
   const limit = parseInt(req.query.limit, 10) || 3 // 한페이지당 나타낼 레코드 갯수(기본값:3)
   const offset = (page - 1) * limit //오프셋 계산
   /* 
         page = 1, limit = 3 => offset = 0
         page = 2, limit = 3 => offset = 3
         page = 3, limit = 3 => offset = 6
         page = 4, limit = 3 => offset = 9
      */

   // 게시물의 전체 갯수 가져오기
   try {
      // select count(*) from posts
      const count = await Post.count()

      // 게시물 레코드를 가져오기
      // select * from posts
      const posts = await Post.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         //게시글을 작성한 사람과 게시글에 작성된 해시태그를 같이 가져온다
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'email'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })

      res.json({
         success: true,
         posts,
         pagination: {
            totalPosts: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit, //페이지당 게시물 수
         },
         message: '전체 게시물 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시물 리스트를 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

module.exports = router
