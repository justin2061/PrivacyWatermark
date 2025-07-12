# Privacy Watermark - 隱私浮水印工具

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_BADGE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys)

**Privacy Watermark** 是一個完全免費、注重隱私安全的線上圖片浮水印工具。它專為需要提交個人證件（如身分證、護照、駕照）的場景設計，讓您可以在提交前為圖片加上「僅供XX用途」之類的文字浮水印，有效防止您的個人資料被濫用。

本專案的核心理念是 **100% 在本地端處理**。所有圖片處理和浮水印的添加完全在您的瀏覽器中完成，圖片檔案**絕對不會**上傳到任何伺服器，從根本上保護您的隱私安全。

## ✨ 主要功能

- **純本地端處理**：圖片無需上傳，保障您的資料安全與隱私。
- **即時預覽**：在調整設定的同時，即時看到浮水印的效果。
- **豐富的自訂選項**：
  - 自訂浮水印文字內容。
  - 調整浮水印的透明度。
  - 提供**九宮格**定位，可將浮水印精確放置在圖片的九個不同位置。
  - 四種不同的字體大小可供選擇。
- **邊界安全**：智慧判斷，確保浮水印文字絕不會超出圖片邊界。
- **PWA 支援**：可將網站「安裝」到您的桌面或手機主畫面，支援離線使用。
- **響應式設計**：在桌面和行動裝置上都有良好的使用體驗。

## 🛠️ 技術棧

- **前端框架**: [React](https://react.dev/)
- **建置工具**: [Vite](https://vitejs.dev/)
- **UI 元件庫**: [shadcn/ui](https://ui.shadcn.com/)
- **CSS 框架**: [Tailwind CSS](https://tailwindcss.com/)
- **狀態管理**: React Hooks
- **部署平台**: [Netlify](https://www.netlify.com/)

## 🚀 在本地端啟動

如果您想在自己的電腦上執行此專案，請依照以下步驟操作：

1.  **複製專案**

    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```

2.  **安裝套件管理器 (pnpm)**

    本專案建議使用 `pnpm` 來管理依賴套件，以避免潛在的依賴問題。

    ```bash
    npm install -g pnpm
    ```

3.  **安裝依賴**

    ```bash
    pnpm install
    ```

4.  **啟動開發伺服器**

    ```bash
    pnpm run dev
    ```

    執行後，應用程式將會在 `http://localhost:5000` 上啟動。

## 部署

本專案已設定為可透過 [Netlify](https://www.netlify.com/) 進行持續整合與部署 (CI/CD)。您只需要將自己的 Git 倉庫連接到 Netlify，即可實現自動化部署。

設定檔 `netlify.toml` 已經包含所有必要的建置指令和設定。

## 📄 授權條款

本專案採用 [MIT License](LICENSE) 授權條款。
