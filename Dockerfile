ARG env="dev"
ARG basepath="TODO_REPLACE_ME"

FROM node:20-alpine AS node
ARG env
ARG basepath

COPY . /build

RUN cd /build \
    && npm ci

RUN cd /build \
    && npm run build:"${env:?}" \
    && mkdir -p /app \
    && mv /build/dist /app

# Deployment image
FROM nginx:alpine as base
RUN echo "                                             \
  server {                                             \
      listen 3000;                                     \
      server_name localhost;                           \
      location ^~ /"${basepath:?}" {                   \
          alias /usr/share/nginx/html;                 \
          try_files \$uri /"${basepath:?}"/index.html; \
      }                                                \
      location /health {                               \
          return 200 'Healthy';                        \
      }                                                \
      error_page 500 502 503 504 /50x.html;            \
      location = /50x.html {                           \
          root /usr/share/nginx/html;                  \
      }                                                \
  }                                                    \
  " > /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=node /app/dist /usr/share/nginx/html/

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production

CMD ["nginx", "-g", "daemon off;"]