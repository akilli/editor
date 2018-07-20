FROM akilli/node

LABEL maintainer="Ayhan Akilli"

#
# Setup
#
RUN npm install -g \
        http-server && \
    rm -rf \
        /root/.config \
        /root/.npm

#
# Ports
#
EXPOSE 8080

#
# Command
#
CMD ["su-exec", "app", "http-server", "/app"]
