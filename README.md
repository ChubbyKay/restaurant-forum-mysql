# Restaurant Forum project
AWS:

## Test account:

User
```
email	: user1@example.com
Password : 12345678

```

## 相關環境變數
env.example
```
IMGUR_CLIENT_ID=SKIP
JWT_SECRET=SKIP
PORT=3000
```

## 網頁介紹

利用 Node.js、Express 以及 MySQL 建置的 Restaurant Forum 專案。  
撰寫方式包含後端 API 開發，以及全端開發。  
主要功能為，使用者可瀏覽餐廳介紹，並留下評論。


## API 文件

SKIP

## Features

- 登入/登出
- 使用者進入首頁後，可以操作:
SKIP
 
## Installing 

1.打開Terminal，複製此專案至本地端

```
git clone https://github.com/ChubbyKay/receipt-storage
```

2.開啟Terminal，進入存放此專案的資料夾

```
cd restaurant_forum
```

3.安裝 npm套件

```
npm install  //安裝套件
```

4.安裝 nodemon 套件

```
npm install -g nodemon
```

5.設定資料庫
```
username: root
password: password
database: forum
```

6.Migrate
```
$ npx sequelize db:migrate
```

7.新增種子資料，運行 seed 腳本

```
npm run seed
```

8.透過 nodemon 啟動伺服器，執行 app.js

```
nodemon app.js
```

9.當 terminal 出現以下字樣，表示伺服器已啟動並成功連結

```
Express is listening on localhost:3000
```

## 開發環境

    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-handlebars": "^5.1.0",
    "express-session": "^1.17.1",
    "faker": "^5.1.0",
    "imgur-node-api": "^0.1.0",
    "jsonwebtoken": "^8.5.1",
    "method-override": "^3.0.0",
    "moment": "^2.28.0",
    "multer": "^1.4.2",
    "mysql2": "^2.1.0",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "pg": "^8.3.3",
    "sequelize": "^6.3.5",
    "sequelize-cli": "^6.2.0"
