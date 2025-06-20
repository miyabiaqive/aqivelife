// 登入流程整合 - Email 檢查與導引
// 這個檔案展示如何在 SSO 登入後檢查用戶是否需要補填 email

/**
 * SSO 登入完成後的處理流程
 * 在各種 SSO 登入方法（Google, Facebook, Line, Apple）的回調中調用
 */
function handleSSOLoginComplete(ssoUserData) {
    console.log('SSO 登入完成，用戶數據：', ssoUserData);
    
    // 檢查用戶是否已有 email
    const hasEmail = checkUserHasEmail(ssoUserData);
    
    if (hasEmail) {
        // 有 email，正常進入應用
        proceedToApp(ssoUserData);
    } else {
        // 沒有 email，導引到 email 補填頁面
        redirectToEmailComplete(ssoUserData);
    }
}

/**
 * 檢查用戶是否已有有效的 email
 */
function checkUserHasEmail(userData) {
    // 方法 1: 檢查 SSO 回傳的數據中是否包含 email
    if (userData.email && userData.email.trim() !== '') {
        // 驗證 email 格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(userData.email)) {
            // 儲存 email 到本地
            localStorage.setItem('user_email', userData.email);
            localStorage.setItem('email_completed', 'true');
            return true;
        }
    }
    
    // 方法 2: 檢查本地儲存是否已有 email
    const storedEmail = localStorage.getItem('user_email');
    if (storedEmail && storedEmail.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(storedEmail)) {
            return true;
        }
    }
    
    // 方法 3: 檢查是否曾經完成過 email 設定
    const emailCompleted = localStorage.getItem('email_completed');
    if (emailCompleted === 'true') {
        return true;
    }
    
    return false;
}

/**
 * 正常進入應用
 */
function proceedToApp(userData) {
    // 儲存用戶資料
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('login_time', new Date().toISOString());
    
    // 跳轉到主頁面
    window.location.href = 'home.html';
}

/**
 * 導引到 email 補填頁面
 */
function redirectToEmailComplete(userData) {
    // 儲存用戶資料（除了 email）
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('login_time', new Date().toISOString());
    
    // 構建重定向 URL
    const redirectUrl = encodeURIComponent('home.html');
    let emailCompleteUrl = `email-complete.html?redirect=${redirectUrl}`;
    
    // 如果 SSO 有部分 email 資料，可以預填
    if (userData.email && userData.email.includes('@')) {
        emailCompleteUrl += `&email=${encodeURIComponent(userData.email)}`;
    }
    
    // 跳轉到 email 補填頁面
    window.location.href = emailCompleteUrl;
}

/**
 * Google SSO 登入完成處理
 */
function handleGoogleLogin(googleUser) {
    const profile = googleUser.getBasicProfile();
    const userData = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl(),
        provider: 'google'
    };
    
    handleSSOLoginComplete(userData);
}

/**
 * Facebook SSO 登入完成處理
 */
function handleFacebookLogin(response) {
    FB.api('/me', { fields: 'id,name,email,picture' }, function(fbUser) {
        const userData = {
            id: fbUser.id,
            name: fbUser.name,
            email: fbUser.email || '', // Facebook 可能不返回 email
            imageUrl: fbUser.picture?.data?.url || null,
            provider: 'facebook'
        };
        
        handleSSOLoginComplete(userData);
    });
}

/**
 * Line SSO 登入完成處理
 */
function handleLineLogin(lineUser) {
    const userData = {
        id: lineUser.userId,
        name: lineUser.displayName,
        email: lineUser.email || '', // Line 通常不提供 email
        imageUrl: lineUser.pictureUrl,
        provider: 'line'
    };
    
    handleSSOLoginComplete(userData);
}

/**
 * Apple SSO 登入完成處理
 */
function handleAppleLogin(appleUser) {
    const userData = {
        id: appleUser.authorization.id_token,
        name: appleUser.user?.name?.firstName + ' ' + appleUser.user?.name?.lastName || 'Apple 用戶',
        email: appleUser.user?.email || '', // Apple 可能不提供 email（根據用戶選擇）
        imageUrl: null, // Apple 不提供頭像
        provider: 'apple'
    };
    
    handleSSOLoginComplete(userData);
}

/**
 * 檢查登入狀態的工具函數
 * 可在其他頁面使用，確保用戶已完成必要的設定
 */
function checkLoginStatus() {
    const userData = localStorage.getItem('user_data');
    const emailCompleted = localStorage.getItem('email_completed');
    const emailSkipped = localStorage.getItem('email_skipped');
    
    if (!userData) {
        // 未登入，跳轉到登入頁面
        window.location.href = 'login.html';
        return false;
    }
    
    if (emailCompleted !== 'true' && emailSkipped !== 'true') {
        // 需要補填 email
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== 'email-complete.html') {
            const redirectUrl = encodeURIComponent(currentPage);
            window.location.href = `email-complete.html?redirect=${redirectUrl}`;
            return false;
        }
    }
    
    return true;
}

/**
 * 登出處理
 */
function handleLogout() {
    // 清除所有用戶相關的本地儲存
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_email');
    localStorage.removeItem('email_completed');
    localStorage.removeItem('email_skipped');
    localStorage.removeItem('login_time');
    localStorage.removeItem('email_completion_time');
    localStorage.removeItem('email_skip_time');
    
    // 跳轉到登入頁面
    window.location.href = 'login.html';
}

// 導出函數給全域使用
window.handleSSOLoginComplete = handleSSOLoginComplete;
window.handleGoogleLogin = handleGoogleLogin;
window.handleFacebookLogin = handleFacebookLogin;
window.handleLineLogin = handleLineLogin;
window.handleAppleLogin = handleAppleLogin;
window.checkLoginStatus = checkLoginStatus;
window.handleLogout = handleLogout;

// 使用範例:
/*
// 在 login.html 或其他需要檢查登入狀態的頁面中：

// 1. 引入這個檔案
<script src="assets/js/login-flow-integration.js"></script>

// 2. 在頁面載入時檢查登入狀態
document.addEventListener('DOMContentLoaded', function() {
    // 如果不是登入頁面，則檢查登入狀態
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'login.html' && currentPage !== 'email-complete.html') {
        checkLoginStatus();
    }
});

// 3. 在各 SSO 登入按鈕的點擊事件中調用對應的處理函數
document.getElementById('googleLoginBtn').addEventListener('click', function() {
    // Google SSO 登入邏輯
    // 成功後調用 handleGoogleLogin(googleUser)
});
*/ 