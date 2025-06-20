# 🚀 AqiveLife 應用部署指南

## 📋 部署前準備

### 檢查專案結構
```
AqiveLife/
├── index.html              # 主頁面
├── screens/                # 應用畫面
├── package.json           # 專案配置
├── vercel.json            # Vercel 配置
├── netlify.toml           # Netlify 配置
└── README.md              # 說明文檔
```

### 確保資源完整
- ✅ 所有 HTML 檔案
- ✅ CSS 和 JavaScript 檔案
- ✅ 圖片和音頻資源
- ✅ 字體檔案（如果有本地字體）

---

## 🌟 推薦部署平台

### 1. **Vercel** ⭐⭐⭐⭐⭐ (最推薦)

**優點：**
- 完全免費的靜態網站託管
- 全球 CDN 加速
- 自動 HTTPS
- 簡單的部署流程
- 優秀的效能

#### 部署步驟：

**方法 A：網頁版部署（最簡單）**
1. 前往 [vercel.com](https://vercel.com)
2. 使用 GitHub/GitLab 帳戶登入
3. 點擊 "New Project"
4. 如果已推送到 Git：直接導入 repository
5. 如果沒有 Git：使用拖拽上傳整個專案資料夾
6. 設定完成後點擊 "Deploy"

**方法 B：命令列部署**
```bash
# 安裝 Vercel CLI
npm install -g vercel

# 在專案目錄執行
vercel

# 首次使用需要登入，按提示操作
# 之後每次部署只需要執行
vercel --prod
```

**自訂域名設定：**
- 在 Vercel Dashboard 中進入專案
- 點擊 "Settings" → "Domains"
- 添加您的域名並按提示設定 DNS

---

### 2. **Netlify** ⭐⭐⭐⭐

**優點：**
- 免費計劃慷慨
- 表單處理功能
- 函數 (Serverless Functions) 支援
- 分支預覽功能

#### 部署步驟：

**方法 A：拖拽部署**
1. 前往 [netlify.com](https://netlify.com)
2. 登入後進入 Dashboard
3. 直接將專案資料夾拖拽到部署區域
4. 等待部署完成

**方法 B：Git 連接**
1. 將專案推送到 GitHub/GitLab
2. 在 Netlify 中連接 repository
3. 設定構建指令（留空或使用預設）
4. 設定發布目錄：`.` (根目錄)

**方法 C：命令列**
```bash
# 安裝 Netlify CLI
npm install -g netlify-cli

# 在專案目錄執行
netlify deploy

# 生產部署
netlify deploy --prod --dir=.
```

---

### 3. **GitHub Pages** ⭐⭐⭐

**優點：**
- 與 GitHub repository 深度整合
- 完全免費
- 支援自訂域名

#### 部署步驟：
1. 將專案推送到 GitHub repository
2. 前往 repository 的 Settings
3. 滾動到 "Pages" 區段
4. 選擇 Source：Deploy from a branch
5. 選擇 Branch：main 和 / (root)
6. 點擊 Save

**URL 格式：** `https://yourusername.github.io/repository-name`

---

### 4. **Surge.sh** ⭐⭐⭐

**優點：**
- 超級簡單的部署
- 免費自訂域名
- 命令列友好

#### 部署步驟：
```bash
# 安裝 Surge
npm install -g surge

# 在專案目錄執行
surge

# 首次會要求設定 email 和密碼
# 選擇專案路徑（預設為當前目錄）
# 設定域名（可以使用提供的免費域名）
```

---

### 5. **Firebase Hosting** ⭐⭐⭐⭐

**優點：**
- Google 的平台，穩定可靠
- 免費額度充足
- 與其他 Google 服務整合

#### 部署步驟：
```bash
# 安裝 Firebase CLI
npm install -g firebase-tools

# 登入 Firebase
firebase login

# 初始化專案
firebase init hosting

# 設定選項：
# - 選擇現有專案或建立新專案
# - Public directory: . (根目錄)
# - Single-page app: No
# - GitHub integration: 可選

# 部署
firebase deploy
```

---

## ⚡ 快速部署命令

我已經在 `package.json` 中預設了部署腳本：

```bash
# Vercel 部署
npm run deploy:vercel

# Netlify 部署  
npm run deploy:netlify

# Surge 部署
npm run deploy:surge
```

---

## 🔧 進階配置

### 自訂域名設定

**Vercel:**
1. 在專案 Settings → Domains 中添加域名
2. 設定 DNS A 記錄指向 `76.76.19.61`
3. 或設定 CNAME 記錄指向 `cname.vercel-dns.com`

**Netlify:**
1. 在 Site Settings → Domain management 中添加域名
2. 設定 DNS A 記錄指向 Netlify 的 IP
3. 或使用 Netlify DNS 服務

### 效能優化

1. **圖片壓縮**：壓縮 `/screens/assets/images/` 中的圖片
2. **CDN 資源**：確保使用 CDN 版本的字體和圖標庫
3. **快取設定**：已在配置檔案中設定適當的快取標頭

### 安全性設定

配置檔案中已包含：
- Content Security Policy
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options

---

## 📊 平台比較

| 平台 | 免費額度 | 自訂域名 | SSL | CDN | 構建時間 | 推薦指數 |
|------|----------|----------|-----|-----|----------|----------|
| Vercel | 無限制 | ✅ | ✅ | ✅ | 快 | ⭐⭐⭐⭐⭐ |
| Netlify | 100GB/月 | ✅ | ✅ | ✅ | 快 | ⭐⭐⭐⭐ |
| GitHub Pages | 1GB | ✅ | ✅ | ✅ | 中等 | ⭐⭐⭐ |
| Surge.sh | 無限制 | ✅ | ✅ | ❌ | 快 | ⭐⭐⭐ |
| Firebase | 1GB | ✅ | ✅ | ✅ | 中等 | ⭐⭐⭐⭐ |

---

## 🎯 部署建議

### 對於原型展示：
- **推薦：Vercel** - 最簡單且功能完整
- **備選：Netlify** - 功能豐富，適合團隊協作

### 對於正式產品：
- **推薦：Vercel + 自訂域名** - 專業且高效能
- **備選：Firebase Hosting** - 如果需要後端整合

### 對於團隊開發：
- **推薦：Netlify** - 更好的協作功能
- **備選：Vercel** - 更好的效能

---

## 🛠️ 故障排除

### 常見問題

**1. 資源載入失敗**
- 檢查檔案路徑是否正確
- 確保所有資源檔案都已上傳

**2. iframe 無法載入**
- 某些平台可能有 iframe 限制
- 檢查 CSP 設定

**3. 自訂域名無法存取**
- 檢查 DNS 設定是否正確
- 等待 DNS 傳播（最多 24-48 小時）

**4. HTTPS 問題**
- 大部分平台會自動提供 SSL
- 如有問題，檢查混合內容警告

### 測試清單

部署後請測試：
- [ ] 主頁面 (index.html) 正常載入
- [ ] 所有 screens 頁面都能存取
- [ ] 圖片和音頻資源正常顯示
- [ ] 字體正確載入
- [ ] 手機端響應式設計正常
- [ ] iframe 內容正常顯示

---

## 📞 支援資源

- **Vercel 文檔**：https://vercel.com/docs
- **Netlify 文檔**：https://docs.netlify.com
- **GitHub Pages 指南**：https://pages.github.com
- **Firebase Hosting**：https://firebase.google.com/docs/hosting

---

💡 **提示**：建議先使用 Vercel 進行快速部署測試，確認所有功能正常後，再考慮是否需要遷移到其他平台或設定自訂域名。 