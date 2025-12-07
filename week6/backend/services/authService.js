const userRepository = require('../repositories/userRepository');
const { hashPassword, comparePassword } = require('../utils/password');
const {HttpError} = require('../utils/error')

/**
 * Auth Service
 * 인증 관련 비즈니스 로직을 담당
 */

/**
 * 회원가입
 */
async function register(username, password) {
    // TODO: Implement
    // 1. 입력 유효성 검사
    // 2. 중복 사용자 확인 (userRepository.existsByUsername)
    // 3. 비밀번호 해싱 (hashPassword)
    // 4. 사용자 생성 (userRepository.create)
    // 5. 사용자 정보 반환 (비밀번호 제외)
    if(username.trim() === '' || password.trim() === '') 
        throw new HttpError("아이디와 비밀번호는 빈칸일 수 없습니다!", 400)
    const hasUser = await userRepository.existsByUsername(username);
    if (hasUser) throw new HttpError("이미 생성된 유저입니다", 409);
    const hashedPassword = await hashPassword(password)
    const response = await userRepository.create(username, hashedPassword);

    return response
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
    if(username.trim() === '' || password.trim() === '') 
        throw new HttpError("아이디와 비밀번호는 빈칸일 수 없습니다!", 400)
    const user = await userRepository.findByUsername(username)
    if(!user) throw new HttpError("로그인에 실패했습니다", 401);
    if(!(await comparePassword(password, user.password)))
        throw new HttpError('로그인에 실패했습니다',401);
    
    return {
        id : user.id,
        username : user.username
    };
}

/**
 * 현재 사용자 조회
 */
async function getCurrentUser(userId) {
    // TODO: Implement
    // 1. 사용자 조회 (userRepository.findById)
    // 2. 사용자 정보 반환 (비밀번호 제외)
    const user = await userRepository.findById(userId)
    if(!user) throw new HttpError(`유저를 찾을 수 없습니다`, 404)
    
    return {
        id : user.id,
        username : user.username
    }
}

module.exports = {
    register,
    login,
    getCurrentUser
};
