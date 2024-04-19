import { deployContract } from "./utils";
import * as fs from "fs"
import * as path from "path"
import { network } from "hardhat";


// This script is used to deploy an ERC20 token contract
// as well as verify it on Block Explorer if possible for the network

export default async function () {

  const weth9 = await deployContract("WETH9");
  const factory = await deployContract("UniswapV3Factory");
  
  const deploymentFileDir = path.join(__dirname, `../deployments/deployment.${network.name}.json`)
  fs.writeFileSync(deploymentFileDir, JSON.stringify({
    "WETH": await weth9.getAddress(),
    "v3CoreFactoryAddress": await factory.getAddress(),
  }))

  return {
    weth9,
    factory,
  };
}
