// 初始設定頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化頁面時更新進度條
    updateProgress(1, 3);
    
    // 為目標卡片添加點擊事件
    initGoalCards();
    
    // 為導航按鈕添加事件
    initNavigationButtons();
});

// 更新進度條
function updateProgress(currentStep, totalSteps) {
    const progressBarInner = document.querySelector('.progress-bar-inner');
    if (progressBarInner) {
        const progressPercentage = (currentStep / totalSteps) * 100;
        progressBarInner.style.width = progressPercentage + '%';
    }
}

// 初始化目標卡片
function initGoalCards() {
    const goalCards = document.querySelectorAll('.goal-card');
    
    goalCards.forEach(card => {
        card.addEventListener('click', function() {
            // 移除其他卡片的選中狀態
            goalCards.forEach(c => {
                c.classList.remove('selected');
            });
            
            // 添加當前卡片的選中狀態
            this.classList.add('selected');
            
            // 儲存選中的目標
            const goalType = this.getAttribute('onclick').match(/selectGoal\(this, '(\w+)'\)/)[1];
            localStorage.setItem('selectedGoal', goalType);
        });
    });
}

// 初始化導航按鈕
function initNavigationButtons() {
    const skipButton = document.querySelector('.btn-skip');
    const continueButton = document.querySelector('.btn-primary');
    
    if (skipButton) {
        skipButton.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }
    
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }
}

// 選擇目標
function selectGoal(element, goal) {
    // 移除其他卡片的選中狀態
    document.querySelectorAll('.goal-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加當前卡片的選中狀態
    element.classList.add('selected');
    
    // 儲存用戶選擇
    localStorage.setItem('selectedGoal', goal);
} 