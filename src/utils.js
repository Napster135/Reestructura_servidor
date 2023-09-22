const { fileURLToPath } = require ( 'url')
const { dirname } = require ( 'path')
const bcrypt = require ( 'bcrypt')

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

//const __filename = fileURLToPath(constt.meta.url);
const _dirname = dirname(__filename);


module.exports = {
    createHash,
    validatePassword
}