# AqiveLife 用戶登入與條款同意流程

## 流程概述

用戶在登入 AqiveLife 應用後，必須先同意服務條款和隱私權政策才能進入應用的主要功能。

## 詳細流程

### 1. 登入頁面 (`login.html`)
- 用戶可以選擇以下登入方式：
  - Gmail 登入
  - Apple 登入
  - Facebook 登入
  - LINE 登入
- 登入成功後，系統會：
  - 設置 `userLoggedIn = 'true'` 到 localStorage
  - 跳轉到服務條款同意頁面 (`terms-agreement.html`)

### 2. 服務條款同意頁面 (`terms-agreement.html`)
- **頁面功能**：
  - 顯示服務條款和隱私權政策的重點摘要
  - 提供連結讓用戶查看完整的服務條款和隱私權政策
  - 要求用戶勾選同意選項
  - 只有勾選同意後，「開始使用」按鈕才會啟用

- **用戶操作**：
  - 閱讀條款摘要
  - 可選擇點擊連結查看完整條款
  - 勾選「我已閱讀並同意服務條款和隱私權政策」
  - 點擊「開始使用 AqiveLife」按鈕

- **系統行為**：
  - 同意後設置 `termsAgreed = 'true'` 到 localStorage
  - 跳轉到應用首頁 (`home.html`)

### 3. 首頁訪問保護 (`home.html`)
- **保護機制**：
  - 檢查 `userLoggedIn` 狀態
  - 檢查 `termsAgreed` 狀態
  - 如果任一檢查失敗，會跳轉到相應頁面

- **跳轉邏輯**：
  - 未登入 → 跳轉到 `login.html`
  - 已登入但未同意條款 → 跳轉到 `terms-agreement.html`
  - 已登入且已同意條款 → 正常顯示首頁內容

## 技術實現

### localStorage 狀態管理
```javascript
// 登入狀態
localStorage.setItem('userLoggedIn', 'true');

// 條款同意狀態
localStorage.setItem('termsAgreed', 'true');

// 登入提供商（可選）
localStorage.setItem('loginProvider', 'gmail'); // 或 'apple', 'facebook', 'line'
```

### 頁面保護邏輯
```javascript
// 在需要保護的頁面中添加
document.addEventListener('DOMContentLoaded', function() {
    // 檢查登入狀態
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (!userLoggedIn || userLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // 檢查條款同意狀態
    const termsAgreed = localStorage.getItem('termsAgreed');
    if (!termsAgreed || termsAgreed !== 'true') {
        window.location.href = 'terms-agreement.html';
        return;
    }

    // 初始化頁面功能
    initializePage();
});
```

## 用戶體驗設計

### 條款同意頁面特色
1. **清晰的視覺層次**：重要信息突出顯示
2. **易讀的條款摘要**：避免用戶需要閱讀冗長的法律文件
3. **便捷的完整條款訪問**：提供快速連結查看詳細內容
4. **明確的同意機制**：勾選框 + 啟用按鈕的組合
5. **品牌一致性**：與應用整體設計風格保持一致

### 流程優勢
1. **合規性**：確保用戶明確同意條款
2. **用戶友好**：簡化的同意流程，不會造成過多阻礙
3. **安全性**：防止未授權訪問應用功能
4. **可追蹤性**：localStorage 記錄用戶的同意狀態

## 後續擴展

### 可能的增強功能
1. **條款版本管理**：當條款更新時，要求用戶重新同意
2. **同意時間記錄**：記錄用戶同意的具體時間
3. **部分同意選項**：允許用戶選擇性同意某些條款
4. **同意狀態同步**：將同意狀態同步到服務器

### 維護注意事項
1. 定期檢查條款內容的準確性
2. 確保連結指向正確的完整條款頁面
3. 測試不同登入方式的流程完整性
4. 監控用戶在條款頁面的停留時間和行為 