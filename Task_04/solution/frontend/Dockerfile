
FROM node:18.16.1

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x /frontend/entrypoint.sh
RUN sed -i 's/\r$//' "/frontend/entrypoint.sh"

ENTRYPOINT ["sh", "/frontend/entrypoint.sh"]
