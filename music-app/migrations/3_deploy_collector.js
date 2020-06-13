const Collector = artifacts.require("Collector");

module.exports = function (deployer) {
  deployer.deploy(Collector);
};
