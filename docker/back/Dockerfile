FROM node:18

RUN mkdir -p /opt/back
WORKDIR /opt/back

COPY ./back/package.json /opt/back

RUN yarn install

COPY ./back /opt/back
COPY ./docker/back/entrypoint.sh /

RUN chmod u+x /entrypoint.sh

RUN export NODE_OPTIONS="--max-old-space-size=8192"

ENTRYPOINT ["/entrypoint.sh"]