# 制定node镜像的版本
FROM node:17
# 移动当前目录下面的文件到app目录下
ADD . /app/
# 进入到app目录下面，类似cd
WORKDIR /app
# 安装依赖
RUN npm install
# 对外暴露的端口，这里的3010需要和inde.js监听的端口一致
EXPOSE 3010
# 程序启动脚本，意思为 执行 npm start
CMD ["npm", "run", "prod"]