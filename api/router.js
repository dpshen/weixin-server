const router = require('koa-router')();

const {checkServer, getJsApiTicket} = require('./checkServer');
const {loadFile} = require('./loadMedia');

router.get('/', checkServer);
router.get('/ticket', getJsApiTicket);
router.post('/loadmedia', loadFile);

// const {addApi, updateApi, getApiList, getApi} = require('./api/apiCtrl');
// const {addGroup, updateGroup, getGroupList, getGroup} = require('./api/groupCtrl');
// const mock = require('./api/mockData').mock;
//
// router.post('/addApi', addApi);
// router.post('/updateApi', updateApi);
// router.get('/getApi', getApi);
// router.get('/getApiList', getApiList);
//
// router.post('/addGroup', addGroup);
// router.post('/updateGroup', updateGroup);
// router.get('/getGroup', getGroup);
// router.get('/getGroupList', getGroupList);
//
// router.all('/mock/**', mock);

module.exports = router;