# 調酒酒譜論壇

利用 PERN 架構實作出一個前後端的酒譜論壇，前端部分利用 React，後端用 Node 與其框架 Express 和 Postgresql 資料庫最後部署於 AWS 的 ubuntu 主機。
讓使用者可以註冊登入為會員外，可以分享自己研發的酒譜，並且有留言版的形式可供會員們彼此之間的互動。


測試的會員帳號：test@test1.com
測試的會員密碼 : 1234

## 功能介紹
首頁：做出一個相片的 Slider 版面，並在版面下方擷取最新的 9 篇文章
![](https://i.imgur.com/prBL4Cv.gif)

![](https://i.imgur.com/LpiNL6U.gif)

酒譜列表：實作分頁機制，一次只會呈現出 10 個酒譜，並且顯示出酒譜相關資訊(標題、留言數、分類)
![](https://i.imgur.com/gXYo3ff.gif)

酒譜：每篇酒譜裡面有留言機制，只有登入的會員才可留言並留下評分，如果是該酒譜的創作者則可以編輯或者刪除文章。
留言板：只有登入的會員才可以留言與評分
新增/編輯酒譜：串接 CKEditor5 文字編輯器方便使用者編輯文章。
分類列表：利用分類的方式來閱讀自己想要的該分類文章，利用 infinite scroll 方式一次只顯現出兩篇文章
![](https://i.imgur.com/hYCUWHL.gif)

我的酒譜：顯示該會員所建立的酒譜，以方便編輯或者刪除
![](https://i.imgur.com/Q5vxkTH.gif)

登入/註冊：會員/管理員可以登入頁面，如果輸入錯誤時會顯示出錯誤訊息。
![](https://i.imgur.com/y6u5ADa.gif)


## 使用工具
### 前端技術
-----
React ： 利用 Hooks 形式的 function component 來完成版面
React-router-dom ： 處理前端的路由
styled-components ： RWD 版面的樣式處理，利用 gloabal style 以及 component 形式讓 CSS 語法看起來具有簡潔和共用性。

### 後端技術
-----
Node/Express ： 串接 API 以及 CRUD 的操作，實作出處理會員認證註冊與登入程序，還有分頁功能
jsonwebtoken ： 利用 JWT token 的形式發送到前端，簽署 token 實作使用者身分驗證，確保資料不會被任意串改。
multer ： 存取來自前端的圖片資料並協助照片上傳
cloundinary ： 利用 multer 把照片上傳到雲端伺服器，Client 端可以直接從雲端讀取以避免佔用太多空間在本地端
AWS / Ubuntu ： 網站部署，ubuntu 主機利用 nginx 伺服器架設前後端。
bcrypt ： 將使用者密碼雜湊之後存進資料庫。
Postgres ： 利用 SQL 語法，與 server 端串接出資料庫間 CRUD 的操作

資料庫設計
[連結](https://dbdiagram.io/d/61261be16dc2bb6073bab605) 
![](https://i.imgur.com/RHMdDSR.png)

## 圖片來院
unsplash

本網站僅作為個人練習，註冊時請勿使用真實資料。另本網站包含之圖片與內容僅作練習使用，不作任何商業用途。

