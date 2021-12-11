# Rune Metaverse Solidity Test

The Rune Metaverse uses NFTs to represent assets (weapons, armour, trinkets, consumables, etc.) that can be used throughout all our current and future games. For an example of what some of these items look like, see https://rune.game/runewords.

As well as metadata being externally available through JSON files as with many NFTs, our tokens encode details about the items as part of the token numbers themselves. This allows our smart contracts to parse the tokens and take action depending on the data they contain.

Being able to do this efficiently is key to making our platform cost-effective for our users.

As someone who has shown interest in volunteering or working with Rune (or you're just interested in general!) this repository contains a test harness that will allow you to put your skills into practice.

## Instructions

1) Make a note of the time
2) Download the repo (don't fork it as making your solution public will ruin the fun for others!)
3) Set up using `yarn install`
4) Compile contracts using `npx hardhat compile`
5) Run tests using `npx hardhat test`

If you're an existing Rune player, you may be familiar with the token format. If not, you should spend some time reading through `/test/TokenDecoder.test.ts` to understand how a raw token number translates into an instance of the `Runeword` struct.

When you first test, you should expect all 42 tests to fail.

By filling in `decodeRuneword` in `/contracts/TokenDecoder.sol`, make all 42 tests pass. You should not modify any files other than `TokenDecoder.sol`. However, if you wish to bring in any external Solidity libraries, feel free to place them in the `/contracts` folder and import them. The OpenZeppelin standard contract library is already a dependency, so you can use those if needed using the standard import format.

6) When complete, upload your completed contract and any dependencies to a private gist, and send the link to  `@defimatt` on Telegram. In your message, include how long it took you from first downloading the repo to submitting your solution. (If you split the effort over multiple days, just report the number of hours actively working on it.)

## Criteria

The following will be used as criteria when assessing your solution:

- Correctness - all tests pass, with no changes to any existing file except `TokenDecoder.sol`
- Legibility - clear, easy-to-read and understand code following accepted Solidity coding practices, with NatSpec documentation and value-adding comments where appropriate
- Gas optimisation - after correctness and security, the parsimonious usage of gas is one of the key concerns when writing Solidity smart contracts. In the output from the test suite, each test will report the units of gas your solution used, alongside the lowest gas a correct solution has been recorded to use to date. Try to beat it if you can!

![Gas usage per test](/assets/testoutput.png)
