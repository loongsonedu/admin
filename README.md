## Environment

- node 16.10.0

## Start

1. git clone https://github.com/os2edu/admin.git
2. cd admin
3. yarn
4. yarn start

## 关于clientId
`clientId 没有什么标准，但是为了能够灵活更改，在 src/requestErrorConfig.ts 做了统一配置，如果检测到 query string 或者 post 方法的 data 中有 clientId 相关参数将进行统一替换。`

### clientId 配置
config/config.ts
```js
  define: {
    'process.env.clientId': 385,
  },
```
