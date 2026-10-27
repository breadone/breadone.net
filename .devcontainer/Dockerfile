FROM mcr.microsoft.com/devcontainers/javascript-node:22-trixie

ARG DEBIAN_FRONTEND=noninteractive

RUN apt update \
    && apt install -y --no-install-recommends \
    && npm install -g aws-cdk@2.1146.1 \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://awscli.amazonaws.com/v2/install.sh | bash && export PATH=/home/node/.local/bin:$PATH

LABEL devcontainer.metadata='[{ \
    "mounts": [ \
        "source=${localEnv:HOME}/.ssh,target=/home/node/.ssh,type=bind", \
        "source=${localEnv:HOME}/.aws,target=/home/node/.aws,type=bind", \
    ], \
    "runArgs": ["--userns=keep-id"], \
    "containerUser": "node", \
    "remoteUser": "node" \
}]'