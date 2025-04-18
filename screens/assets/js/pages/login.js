// 登入頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 為登入按鈕添加點擊事件
    const loginButtons = document.querySelectorAll('.login-btn');
    
    loginButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 這裡可以添加登入邏輯
            // 目前只是簡單地轉到 onboarding 頁面
            window.location.href = 'onboarding.html';
        });
    });
}); 