const replyRepository = require('../repositories/replyRepository');
const postRepository = require('../repositories/postRepository');
const sanitizeHtml = require('sanitize-html');
const { HttpError } = require('../utils/error');
/**
 * Reply Service
 * 댓글 관련 비즈니스 로직을 담당
 */

/**
 * 특정 게시글의 댓글 목록 조회
 */
async function getRepliesByPostId(postId) {
    const post = await postRepository.findById(postId);
    if (!post) throw new HttpError("게시물을 찾을 수 없습니다", 404);
    const result = await replyRepository.findByPostId(postId);

    return result;
}

/**
 * 댓글 작성
 */
async function createReply(content, postId, userId) {
    
    if (content.trim() !== "") throw new HttpError("내용은 빈칸일수 없습니다.", 404);
    const post = await postRepository.findById(postId);
    if (!post) throw new HttpError("게시물을 찾을 수 없습니다", 404);

    const createdId = await replyRepository.create(content, postId, userId);
    const createdReply = await replyRepository.findById(createdId);
    return createdReply;
}

/**
 * 댓글 삭제
 */
async function deleteReply(replyId, userId) {
    const reply = replyRepository.findById(replyId);
    if (!reply) throw new HttpError("댓글을 찾을 수 없습니다!", 404);
    if (!(await replyRepository.isOwner(replyId, userId))) throw new HttpError("자기 자신의 댓글만 삭제할 수 있습니다.", 403);
    
    const success = await replyRepository.deleteById(replyId);
    if (!success) throw new HttpError("삭제에 실패하였습니다", 500);
    
    return;
}

module.exports = {
    getRepliesByPostId,
    createReply,
    deleteReply
};
