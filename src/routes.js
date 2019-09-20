const host = 'localhost';
const port = '3000';

export default {
  nodesUrl: () => [`${host}:${port}`, 'nodes'].join('/'),
  nodeUrl: (id) => [`${host}:${port}`, 'nodes', id].join('/'),
};
