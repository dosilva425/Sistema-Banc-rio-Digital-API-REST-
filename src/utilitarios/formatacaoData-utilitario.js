const format = require('date-fns/format');

const formatarDataIso = (req, res) => {
    const dataIso = format(new Date(), 'yyyy-MM-dd kk:mm:ss');
    return dataIso;
}

module.exports = formatarDataIso;