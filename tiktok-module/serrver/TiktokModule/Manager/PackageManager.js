
const Helper = require("../Helper/HelperFunction");
const PackageAPI = require('../API/PackageAPI');


const GetPackageDetail = (config, packageID) => {
    console.log('GetPackageDetail', { config, packageID });
    return PackageAPI.GetPackageDetail(config, Helper.timestamp(), packageID);
  };


module.exports = {GetPackageDetail};