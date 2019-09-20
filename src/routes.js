const host = 'localhost';
const port = '3000';

export default {
  nodesUrl: () => [`http://${host}:${port}`, 'nodes'].join('/'),
  nodeUrl: (id) => [`http://${host}:${port}`, 'nodes', id].join('/'),
};
