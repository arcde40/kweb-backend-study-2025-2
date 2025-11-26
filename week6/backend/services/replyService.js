const replyRepository = require('../repositories/replyRepository');
const postRepository = require('../repositories/postRepository');
const sanitizeHtml = require('sanitize-html');

/**
 * Reply Service
 * 댓글 관련 비즈니스 로직을 담당
 */

/**
 * 특정 게시글의 댓글 목록 조회
 */
async function getRepliesByPostId(postId) {
    // 1. 게시글 존재 확인 (postRepository.findById)
    // 2. replyRepository.findByPostId() 호출
    const replies = await replyRepository.findByPostId(postId);
    return replies;
}

/**
 * 댓글 작성
 */
async function createReply(content, postId, userId) {
    // 1. 입력 유효성 검사
    // 2. 게시글 존재 확인 (postRepository.findById)
    // 3. replyRepository.create() 호출
    // 4. 생성된 댓글 조회 및 반환
    const post = await postRepository.findById(postId);
    if(!post) throw new Error('게시글이 존재하지 않습니다!');
    const createdReplyId = await replyRepository.create(sanitizeHtml(content), postId, userId);
    const createdReply = await replyRepository.findById(createdReplyId);
    return createdReply;
}

/**
 * 댓글 삭제
 */
async function deleteReply(replyId, userId) {
    // 1. 댓글 존재 확인 (replyRepository.findById)
    // 2. 작성자 확인 (replyRepository.isOwner)
    // 3. replyRepository.deleteById() 호출
    const reply = await replyRepository.findById(replyId);
    if(reply.id !== userId) throw new Error('자신이 쓴 댓글만 지울 수 있습니다!');
    const deleted = await replyRepository.deleteById(replyId);
    if(!deleted) throw new Error('삭제에 실패했습니다.');
    return;
}

module.exports = {
    getRepliesByPostId,
    createReply,
    deleteReply
};
