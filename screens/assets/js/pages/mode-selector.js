// 模式選擇頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 為目標卡片添加點擊事件
    const goalCards = document.querySelectorAll('.goal-card');
    const continueButton = document.getElementById('start-tuning-btn');
    
    // 禁用繼續按鈕，直到用戶選擇模式
    if (continueButton) {
        continueButton.disabled = true;
    }
    
    goalCards.forEach(card => {
        card.addEventListener('click', function() {
            // 移除其他卡片的選中狀態
            goalCards.forEach(c => {
                c.classList.remove('selected');
            });
            
            // 添加當前卡片的選中狀態
            this.classList.add('selected');
            
            // 啟用繼續按鈕
            if (continueButton) {
                continueButton.disabled = false;
            }
            
            // 儲存選中的目標
            const goalType = this.getAttribute('data-goal');
            localStorage.setItem('selectedMode', goalType);
        });
    });
});

// 選擇目標函數 (用於 onclick 屬性)
function selectGoal(element, goal) {
    // 移除其他卡片的選中狀態
    document.querySelectorAll('.goal-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加當前卡片的選中狀態
    element.classList.add('selected');
    
    // 啟用繼續按鈕
    const continueButton = document.getElementById('start-tuning-btn');
    if (continueButton) {
        continueButton.disabled = false;
    }
    
    // 保存選擇的模式，用於傳遞到下一頁
    localStorage.setItem('selectedMode', goal);
} 