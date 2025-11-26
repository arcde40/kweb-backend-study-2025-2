const userRepository = require('../repositories/userRepository');
const { hashPassword, comparePassword } = require('../utils/password');

/**
 * Auth Service
 * 인증 관련 비즈니스 로직을 담당
 */

/**
 * 로그인/회원가입 입력 검증
 */
const validateInput = (username, password) => {
    if(username.trim() === '' || password.trim() === '') throw new Error('입력이 올바르지 않습니다.');
}

/**
 * 회원가입
 */
async function register(username, password) {
    // 1. 입력 유효성 검사
    // 2. 중복 사용자 확인 (userRepository.existsByUsername)
    // 3. 비밀번호 해싱 (hashPassword)
    // 4. 사용자 생성 (userRepository.create)
    // 5. 사용자 정보 반환 (비밀번호 제외)
    validateInput(username, password)
    const userExistence = await userRepository.existsByUsername(username);
    if(userExistence) throw new Error('이미 존재하는 유저명입니다.');
    const encodedPassword = await hashPassword(password);
    return await userRepository.create(username, encodedPassword);
}

/**
 * 로그인
 */
async function login(username, password) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    // 2. 사용자 조회 (userRepository.findByUsername)
    // 3. 비밀번호 확인 (comparePassword)
    // 4. 사용자 정보 반환 (비밀번호 제외)
    validateInput(username, password);
    const user = await userRepository.findByUsername(username);
    if(!user || !(await comparePassword(password, user.password))) throw new Error('인증 정보를 찾을 수 없습니다.');
    return {
        id: user.id,
        username: user.username
    };
}

/**
 * 현재 사용자 조회
 */
async function getCurrentUser(userId) {
    // 1. 사용자 조회 (userRepository.findById)
    // 2. 사용자 정보 반환 (비밀번호 제외)
    const user = await userRepository.findById(userId);
    if(!user) throw new Error('해당 유저를 찾을 수 없습니다!');
    return {
        id: user.id,
        username: user.username
    };
}

module.exports = {
    register,
    login,
    getCurrentUser
};
