const postRepository = require('../repositories/postRepository');
const sanitizeHtml = require('sanitize-html');

/**
 * Post Service
 * 게시글 관련 비즈니스 로직을 담당
 */

/**
 * 모든 게시글 조회
 */
async function getAllPosts() {
    // postRepository.findAll() 호출
    return await postRepository.findAll();
}

/**
 * 게시글 상세 조회
 */
async function getPostById(postId) {
    // postRepository.findById() 호출
    // 게시글이 없으면 적절한 에러 처리
    const post = await postRepository.findById(postId);
    if(!post) throw new Error('게시글을 찾을 수 없습니다!');
    return post;
}

/**
 * 게시글 작성
 */
async function createPost(title, content, userId) {
    // 1. 입력 유효성 검사
    // 2. postRepository.create() 호출
    // 3. 생성된 게시글 조회 및 반환
    if(title.trim() === '' || content.trim() === '') throw new Error('제목과 내용은 비어있을 수 없습니다.');
    const sanitizedTitle = sanitizeHtml(title)
    const sanitizedContent = sanitizeHtml(content)
    const createPostId = await postRepository.create(sanitizedTitle, sanitizedContent, userId);
    const createdPost = await postRepository.findById(createPostId);
    return createdPost;
}

/**
 * 게시글 수정
 */
async function updatePost(postId, title, content, userId) {
    // 1. 입력 유효성 검사
    // 2. 게시글 존재 확인
    // 3. 작성자 확인 (postRepository.isOwner)
    // 4. postRepository.update() 호출
    // 5. 수정된 게시글 조회 및 반환
    if(title.trim() === '' || content.trim() === '') throw new Error('제목과 내용은 비어있을 수 없습니다.');
    const isOwner = await postRepository.isOwner(postId, userId);
    if(!isOwner) throw new Error('자신의 게시글만 수정할 수 있습니다.');
    const updated = await postRepository.update(postId, sanitizeHtml(title), sanitizeHtml(content));
    if(!updated) throw new Error('수정에 실패하였습니다.');
    const updatedPost = await postRepository.findById(postId);
    return updatedPost;
}

/**
 * 게시글 삭제
 */
async function deletePost(postId, userId) {
    // 1. 게시글 존재 확인
    // 2. 작성자 확인 (postRepository.isOwner)
    // 3. postRepository.deleteById() 호출
    const post = await postRepository.findById(postId);
    if(!post) throw new Error('게시글이 존재하지 않습니다!');
    const isOwner = await postRepository.isOwner(postId, userId);
    if(!isOwner) throw new Error('자신의 게시글만 삭제할 수 있습니다.');
    const deleted = await postRepository.deleteById(postId);
    if(!deleted) throw new Error('삭제에 실패했습니다.');
    return;
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
