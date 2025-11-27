const { runQuery } = require('./database');

/**
 * Reply Repository
 * 댓글 관련 데이터베이스 쿼리를 담당
 */

/**
 * 특정 게시글의 모든 댓글 조회 (작성자 정보 포함)
 */
async function findByPostId(postId) {
    // TODO: JOIN 쿼리 작성 (users 테이블과 조인)
    const rows = await runQuery(
        `SELECT replies.id, replies.content, replies.post_id as postId, replies.user_id as userId, username, replies.created_at as createdAt 
        from replies left outer join users on replies.user_id = users.id where post_id = ?`,
        [postId]
    );
    return rows;
}

/**
 * ID로 댓글 조회
 */
async function findById(id) {
    const rows = await runQuery(
        `SELECT replies.id, replies.content, replies.post_id as postId, replies.user_id as userId, username, replies.created_at as createdAt 
        from replies left outer join users on replies.user_id = users.id where replies.id = ?`,
        [id]
    );
    return rows[0];
}

/**
 * 댓글 생성
 */
async function create(content, postId, userId) {
    const result = await runQuery(
        'INSERT INTO replies (content, post_id, user_id) VALUES (?, ?, ?)',
        [content, postId, userId]
    );
    return result.insertId;
}

/**
 * 댓글 삭제
 */
async function deleteById(id) {
    const result = await runQuery(
        'DELETE FROM replies WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}

/**
 * 댓글 작성자 확인
 */
async function isOwner(replyId, userId) {
    const rows = await runQuery(
        'SELECT user_id FROM replies WHERE id = ?',
        [replyId]
    );
    return rows.length > 0 && rows[0].user_id === userId;
}

module.exports = {
    findByPostId,
    findById,
    create,
    deleteById,
    isOwner
};
