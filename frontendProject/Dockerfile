FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9000 \
    BASE_URL="http://localhost:9000" \
    SECRET_KEY="_IISKxfY6EP:j'4LDxNJz7Q9.W4Q|.h;5yvxlXO!+MArNaL!fz*(>_6Uy@Zl3.~"

EXPOSE 9000

CMD ["npm", "run", "dev"]