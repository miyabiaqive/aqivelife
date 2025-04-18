// 設定頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initToggleSwitches();
    initSettingsItems();
    initLogoutButton();
});

// 初始化開關
function initToggleSwitches() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.closest('.settings-item').querySelector('.settings-label').textContent;
            const isEnabled = this.checked;
            
            console.log(`設定 "${settingName}" 已${isEnabled ? '啟用' : '停用'}`);
            
            // 這裡可以添加保存設定到本地存儲的邏輯
            localStorage.setItem(settingName, isEnabled);
        });
    });
}

// 初始化設定項目
function initSettingsItems() {
    const settingsItems = document.querySelectorAll('.settings-item');
    
    settingsItems.forEach(item => {
        if (!item.querySelector('.toggle-switch')) {
            item.addEventListener('click', function() {
                const settingLabel = this.querySelector('.settings-label').textContent;
                console.log(`點擊了設定: ${settingLabel}`);
                
                // 這裡可以添加導航到相應設定頁面的邏輯
                // 例如根據設定類型跳轉到不同頁面
            });
        }
    });
}

// 初始化登出按鈕
function initLogoutButton() {
    const logoutButton = document.querySelector('.logout-button');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            if (confirm('確定要登出嗎？')) {
                // 清除登入狀態
                localStorage.removeItem('isLoggedIn');
                
                // 重定向到登入頁面
                window.location.href = 'login.html';
            }
        });
    }
} 