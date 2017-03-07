'use strict';

import importDir from 'import-dir';

const socketFolderList = ['room'];

export default function sockets(app) {
  socketFolderList.map(current => {
    const socketModule = importDir(`./${current}`);

    // Visit each socket module to pass app instance
    Object.keys(socketModule).map(name => socketModule[name](app));
  });
};
