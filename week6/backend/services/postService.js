const postRepository = require('../repositories/postRepository');
const sanitizeHtml = require('sanitize-html');
const { HttpError } = require('../utils/error');

/**
 * Post Service
 * 게시글 관련 비즈니스 로직을 담당
 */

/**
 * 모든 게시글 조회
 */
async function getAllPosts() {
    // TODO: Implement
    // postRepository.findAll() 호출
    return await postRepository.findAll();
}

/**
 * 게시글 상세 조회
 */
async function getPostById(postId) {
    // TODO: Implement
    // postRepository.findById() 호출
    // 게시글이 없으면 적절한 에러 처리
    const post = await postRepository.findById(postId);
    if(!post) throw new HttpError('해당하는 게시글이 없습니다.',404)
    return post
}

/**
 * 게시글 작성
 */
async function createPost(title, content, userId) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    // 2. postRepository.create() 호출
    // 3. 생성된 게시글 조회 및 반환
    if(title.trim() === '' || content.trim() === '')
        throw new HttpError('제목과 내용은 빈칸일 수 없습니다', 400)
    const createdPostId = await postRepository.create(sanitizeHtml(title),sanitizeHtml(content), userId)
    const post = await postRepository.findById(createdPostId)
    return post 
}

/**
 * 게시글 수정
 */
async function updatePost(postId, title, content, userId) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    // 2. 게시글 존재 확인
    // 3. 작성자 확인 (postRepository.isOwner)
    // 4. postRepository.update() 호출
    // 5. 수정된 게시글 조회 및 반환
    if(title.trim() === '' || content.trim() === '')
        throw new HttpError('제목과 내용은 빈칸일 수 없습니다', 400)
    const post = await getPostById(postId)
    if(post.userId !== userId) throw new HttpError('자신의 개시물만 수정할 수 있습니다',403);
    const createdPostId = await postRepository.update(postId, sanitizeHtml(title), sanitizeHtml(content))
    if(!createdPostId) throw new HttpError('삭제에 실패했습니다..', 500)
    const updatedPost = await getPostById(postId)
    
    return updatedPost
    
}

/**
 * 게시글 삭제
 */
async function deletePost(postId, userId) {
    // TODO: Implement
    // 1. 게시글 존재 확인
    // 2. 작성자 확인 (postRepository.isOwner)
    // 3. postRepository.deleteById() 호출
    const post = await getPostById(postId)
    if(await postRepository.isOwner(postId, userId)) 
        throw new HttpError('자기 자신의 게시물만 삭제할 수 있습니다.', 403);
    const isSucceded = await postRepository.deleteById(postId)
    if(!isSucceded) throw new HttpError('삭제에 실패했습니다..', 500);
    return 
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
