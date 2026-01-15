FROM alpine:latest

ARG PB_VERSION=0.33.0

WORKDIR /pb

RUN apk add --no-cache \
    unzip \
    curl \
    ca-certificates \
    bash \
    sqlite

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_arm64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

VOLUME [ "/pb/pb_data", "/pb/pb_migrations", "/pb/pb_hooks" ]

EXPOSE 8090

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["serve", "--http=0.0.0.0:8090"]
