import { task } from "hardhat/config"

import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"
dotenvConfig({ path: resolve(__dirname, "./.env") })

import { HardhatUserConfig } from "hardhat/types"
import { NetworkUserConfig } from "hardhat/types"

import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "solidity-coverage"

task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(await account.getAddress())
  }
})

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    coverage: {
      url: "http://127.0.0.1:9999",
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
}

export default config
