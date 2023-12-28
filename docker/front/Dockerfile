FROM node:18

# RUN apt --no-cache add --virtual native-deps \
#     g++ gcc libgcc libstdc++ linux-headers make python3 && \
#     npm install --quiet node-gyp -g

RUN mkdir -p /opt/front
WORKDIR /opt/front

COPY ./front/package.json /opt/front

RUN yarn install

COPY ./front /opt/front
COPY ./docker/front/entrypoint.sh /

RUN chmod u+x /entrypoint.sh

RUN export NODE_OPTIONS="--max-old-space-size=8192"

# RUN apk add node-sass
# RUN yarn add sass serve

RUN yarn build

ENTRYPOINT ["/entrypoint.sh"]