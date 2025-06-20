// Email 補填頁面的邏輯處理
class EmailCompleteHandler {
    constructor() {
        this.emailInput = document.getElementById('email');
        this.completeBtn = document.getElementById('completeBtn');
        this.form = document.getElementById('emailForm');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupInitialState();
    }
    
    setupEventListeners() {
        // 即時 Email 驗證
        this.emailInput.addEventListener('input', (e) => {
            this.validateEmailInput(e.target.value);
        });
        
        // 表單提交
        this.form.addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });
        
        // 頁面載入時自動 focus
        window.addEventListener('load', () => {
            this.emailInput.focus();
        });
    }
    
    setupInitialState() {
        // 初始化按鈕狀態
        this.completeBtn.disabled = true;
        
        // 檢查是否有預填的 email
        const urlParams = new URLSearchParams(window.location.search);
        const prefillEmail = urlParams.get('email');
        if (prefillEmail) {
            this.emailInput.value = prefillEmail;
            this.validateEmailInput(prefillEmail);
        }
    }
    
    validateEmailInput(email) {
        const trimmedEmail = email.trim();
        
        if (trimmedEmail === '') {
            this.clearValidationState();
            this.completeBtn.disabled = true;
        } else if (this.isValidEmail(trimmedEmail)) {
            this.setValidState();
            this.completeBtn.disabled = false;
        } else {
            this.setInvalidState();
            this.completeBtn.disabled = true;
        }
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    clearValidationState() {
        this.emailInput.classList.remove('valid', 'invalid');
    }
    
    setValidState() {
        this.emailInput.classList.remove('invalid');
        this.emailInput.classList.add('valid');
    }
    
    setInvalidState() {
        this.emailInput.classList.remove('valid');
        this.emailInput.classList.add('invalid');
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        
        if (!this.isValidEmail(email)) {
            this.setInvalidState();
            return;
        }
        
        try {
            this.showLoadingState();
            await this.submitEmail(email);
            this.handleSuccess();
        } catch (error) {
            this.handleError(error);
        }
    }
    
    showLoadingState() {
        this.completeBtn.classList.add('loading');
        this.completeBtn.textContent = '';
        this.completeBtn.disabled = true;
    }
    
    hideLoadingState() {
        this.completeBtn.classList.remove('loading');
        this.completeBtn.textContent = '完成設定';
        this.completeBtn.disabled = false;
    }
    
    async submitEmail(email) {
        // 模擬 API 請求
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 這裡應該調用實際的 API 來儲存 email
                console.log('Email to save:', email);
                
                // 模擬成功/失敗
                const success = Math.random() > 0.1; // 90% 成功率
                
                if (success) {
                    // 儲存到 localStorage 作為備份
                    localStorage.setItem('user_email', email);
                    localStorage.setItem('email_completion_time', new Date().toISOString());
                    resolve();
                } else {
                    reject(new Error('網路錯誤，請稍後再試'));
                }
            }, 1500);
        });
    }
    
    handleSuccess() {
        // 標記 email 已完成
        localStorage.setItem('email_completed', 'true');
        
        // 跳轉到主頁面
        const redirectUrl = this.getRedirectUrl();
        window.location.href = redirectUrl;
    }
    
    handleError(error) {
        this.hideLoadingState();
        
        // 顯示錯誤訊息
        this.showErrorMessage(error.message);
    }
    
    showErrorMessage(message) {
        // 創建或更新錯誤提示
        let errorDiv = document.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.style.cssText = `
                background: rgba(255, 59, 48, 0.1);
                border: 1px solid rgba(255, 59, 48, 0.2);
                border-radius: 12px;
                padding: 12px 16px;
                margin-bottom: 20px;
                color: #FF3B30;
                font-size: 14px;
                text-align: center;
            `;
            this.form.insertBefore(errorDiv, this.form.firstChild);
        }
        
        errorDiv.textContent = message;
        
        // 3秒後自動隱藏
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
    
    getRedirectUrl() {
        // 檢查是否有指定的重定向 URL
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect');
        
        if (redirect) {
            return decodeURIComponent(redirect);
        }
        
        // 預設跳轉到主頁
        return 'home.html';
    }
}

// 跳過 Email 設定的全域函數
function skipEmail() {
    const confirmed = confirm(
        '確定要跳過 Email 設定嗎？\n\n' +
        '您之後仍可在設定頁面中補填 Email 地址。\n' +
        '但這可能會影響您接收重要的帳戶通知。'
    );
    
    if (confirmed) {
        // 標記為已跳過
        localStorage.setItem('email_skipped', 'true');
        localStorage.setItem('email_skip_time', new Date().toISOString());
        
        // 跳轉到主頁面
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect');
        const redirectUrl = redirect ? decodeURIComponent(redirect) : 'home.html';
        
        window.location.href = redirectUrl + '?email_skipped=true';
    }
}

// 檢查用戶是否需要補填 email 的工具函數
function checkEmailRequired() {
    const emailCompleted = localStorage.getItem('email_completed');
    const emailSkipped = localStorage.getItem('email_skipped');
    const userEmail = localStorage.getItem('user_email');
    
    // 如果已完成或已跳過，則不需要補填
    if (emailCompleted === 'true' || emailSkipped === 'true') {
        return false;
    }
    
    // 如果已有 email，則不需要補填
    if (userEmail && userEmail.trim() !== '') {
        return false;
    }
    
    return true;
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
    new EmailCompleteHandler();
});

// 導出給其他頁面使用
window.EmailCompleteHandler = EmailCompleteHandler;
window.checkEmailRequired = checkEmailRequired;
window.skipEmail = skipEmail; 