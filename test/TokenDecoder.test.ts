import { ethers } from "hardhat"
import chai from "chai"
import { should } from "chai"
import { solidity } from "ethereum-waffle"
import { TokenDecoder, TokenDecoder__factory } from "../typechain"

chai.use(solidity)
should()

describe("TokenDecoder", () => {
    const logGas = true

    let tokenDecoderContract: TokenDecoder

    beforeEach(async () => {
        const [deployer] = await ethers.getSigners()
        const tokenDecoderFactory = new TokenDecoder__factory(deployer)
        tokenDecoderContract = await tokenDecoderFactory.deploy()
    })

    describe("Decode Runeword", async () => {
        type Runeword = {
            token: string
            item: number
            _type: number
            attributeCount: number
            attributeTypes: number[]
            attributeValues: number[]
        }

        let totalGas = 0
        const lowestTotalGas = 1152469

        const testDecode = async (expected: Runeword, lowestGas: number): Promise<void> => {
            const result = await tokenDecoderContract.decodeRuneword(expected.token)

            result.token.should.equal(expected.token, "Token")
            result.item.should.equal(expected.item, "Item")
            result._type.should.equal(expected._type, "Type")
            result.attributeCount.should.equal(expected.attributeCount, "Attribute count")
            result.attributeTypes.should.have.same.ordered.members(expected.attributeTypes, "Attribute types")
            result.attributeValues.should.have.same.ordered.members(expected.attributeValues, "Attribute values")

            const gas = (await tokenDecoderContract.estimateGas.decodeRuneword(expected.token)).toNumber()
            totalGas += gas

            if (logGas) {
                console.log("\t- %d gas, lowest to date %d", gas, lowestGas)
            }
        }

        it("Should decode test Steel", async () => {
            await testDecode(
                {
                    token: "100300001012001015200200320030000000000000000000000000000000000000000000000086",
                    item: 1,
                    _type: 1,
                    attributeCount: 3,
                    attributeTypes: [1, 2, 3, 0, 0, 0, 0, 0],
                    attributeValues: [15, 3, 0, 0, 0, 0, 0, 0],
                },
                25858,
            )
        })

        it("Should decode test Fury", async () => {
            await testDecode(
                {
                    token: "100300002012001007200404020050200000000000000000000000000000000000000000000816",
                    item: 2,
                    _type: 1,
                    attributeCount: 3,
                    attributeTypes: [1, 4, 5, 0, 0, 0, 0, 0],
                    attributeValues: [7, 40, 20, 0, 0, 0, 0, 0],
                },
                25870,
            )
        })

        it("Should decode test Lorekeeper", async () => {
            await testDecode(
                {
                    token: "100300003052001003200600120071000000000000000000000000000000000000000000000511",
                    item: 3,
                    _type: 5,
                    attributeCount: 3,
                    attributeTypes: [1, 6, 7, 0, 0, 0, 0, 0],
                    attributeValues: [3, 1, 100, 0, 0, 0, 0, 0],
                },
                25870,
            )
        })

        it("Should decode test Worldstone Shard", async () => {
            await testDecode(
                {
                    token: "1003000041829991322999001299907529998162999000299944229996182999005000000666",
                    item: 4,
                    _type: 18,
                    attributeCount: 8,
                    attributeTypes: [999, 999, 999, 999, 999, 999, 999, 999],
                    attributeValues: [132, 1, 75, 816, 0, 442, 618, 5],
                },
                28379,
            )
        })

        it("Should decode test Flash", async () => {
            await testDecode(
                {
                    token: "1003000051120010072006004200401900000000000000000000000000000000000000000958",
                    item: 5,
                    _type: 11,
                    attributeCount: 3,
                    attributeTypes: [1, 6, 4, 0, 0, 0, 0, 0],
                    attributeValues: [7, 4, 19, 0, 0, 0, 0, 0],
                },
                26150,
            )
        })

        it("Should decode test Titan", async () => {
            await testDecode(
                {
                    token: "1003000060720010032008012201100100000000000000000000000000000000000000000335",
                    item: 6,
                    _type: 7,
                    attributeCount: 3,
                    attributeTypes: [1, 8, 11, 0, 0, 0, 0, 0],
                    attributeValues: [3, 12, 1, 0, 0, 0, 0, 0],
                },
                26150,
            )
        })

        it("Should decode test Smoke", async () => {
            await testDecode(
                {
                    token: "1003000070920010032008090200910000000000000000000000000000000000000000000964",
                    item: 7,
                    _type: 9,
                    attributeCount: 3,
                    attributeTypes: [1, 8, 9, 0, 0, 0, 0, 0],
                    attributeValues: [3, 90, 100, 0, 0, 0, 0, 0],
                },
                26150,
            )
        })

        it("Should decode test Glory", async () => {
            await testDecode(
                {
                    token: "100300010022001014200401520070152006012200201320030072039001202100100000426",
                    item: 10,
                    _type: 2,
                    attributeCount: 8,
                    attributeTypes: [1, 4, 7, 6, 2, 3, 39, 21],
                    attributeValues: [14, 15, 15, 12, 13, 7, 1, 1],
                },
                28501,
            )
        })

        it("Should decode test Grace", async () => {
            await testDecode(
                {
                    token: "100300011022001022200402520070102006014200200820030082039007202100300000148",
                    item: 11,
                    _type: 2,
                    attributeCount: 8,
                    attributeTypes: [1, 4, 7, 6, 2, 3, 39, 21],
                    attributeValues: [22, 25, 10, 14, 8, 8, 7, 3],
                },
                28501,
            )
        })

        it("Should decode test Genesis", async () => {
            await testDecode(
                {
                    token: "1003000120120010042004032200700220020102003009203900620210040000000000000720",
                    item: 12,
                    _type: 1,
                    attributeCount: 7,
                    attributeTypes: [1, 4, 7, 2, 3, 39, 21, 0],
                    attributeValues: [4, 32, 2, 10, 9, 6, 4, 0],
                },
                28048,
            )
        })

        it("Should decode test Destiny", async () => {
            await testDecode(
                {
                    token: "100300013022001036200401520070152006010200201420030092039001202100100000055",
                    item: 13,
                    _type: 2,
                    attributeCount: 8,
                    attributeTypes: [1, 4, 7, 6, 2, 3, 39, 21],
                    attributeValues: [36, 15, 15, 10, 14, 9, 1, 1],
                },
                28501,
            )
        })

        it("Should decode test Wrath", async () => {
            await testDecode(
                {
                    token: "100300014012001002201900120130102011001200200220030142039008202100600000210",
                    item: 14,
                    _type: 1,
                    attributeCount: 8,
                    attributeTypes: [1, 19, 13, 11, 2, 3, 39, 21],
                    attributeValues: [2, 1, 10, 1, 2, 14, 8, 6],
                },
                28501,
            )
        })

        it("Should decode test Fortress", async () => {
            await testDecode(
                {
                    token: "1003000150320080032012004201300820110022047010203900320210050000000000000313",
                    item: 15,
                    _type: 3,
                    attributeCount: 7,
                    attributeTypes: [8, 12, 13, 11, 47, 39, 21, 0],
                    attributeValues: [3, 4, 8, 2, 10, 3, 5, 0],
                },
                28048,
            )
        })

        it("Should decode test Elder", async () => {
            await testDecode(
                {
                    token: "100300016012001003200700420130022011003200200920030122039011202100700000136",
                    item: 16,
                    _type: 1,
                    attributeCount: 8,
                    attributeTypes: [1, 7, 13, 11, 2, 3, 39, 21],
                    attributeValues: [3, 4, 2, 3, 9, 12, 11, 7],
                },
                28501,
            )
        })

        it("Should decode test Pledge", async () => {
            await testDecode(
                {
                    token: "100300019052007011200600220110032008003000000000000000000000000000000000565",
                    item: 19,
                    _type: 5,
                    attributeCount: 4,
                    attributeTypes: [7, 6, 11, 8, 0, 0, 0, 0],
                    attributeValues: [11, 2, 3, 3, 0, 0, 0, 0],
                },
                26751,
            )
        })

        it("Should decode test Flow", async () => {
            await testDecode(
                {
                    token: "10030002008200800420070052013004201100420340002006001000000000000000000000042",
                    item: 20,
                    _type: 8,
                    attributeCount: 6,
                    attributeTypes: [8, 7, 13, 11, 34, 6, 0, 0],
                    attributeValues: [4, 5, 4, 4, 0, 1, 0, 0],
                },
                27423,
            )
        })

        it("Should decode test Guiding Light", async () => {
            await testDecode(
                {
                    token: "100300021022001031201308320120002007019200500120060522002009200301000000000",
                    item: 21,
                    _type: 2,
                    attributeCount: 8,
                    attributeTypes: [1, 13, 12, 7, 5, 6, 2, 3],
                    attributeValues: [31, 83, 0, 19, 1, 52, 9, 10],
                },
                28489,
            )
        })

        it("Should decode test Lionheart", async () => {
            await testDecode(
                {
                    token: "1003000220120010122007010201200320810022002010200301020210050000000000000219",
                    item: 22,
                    _type: 1,
                    attributeCount: 7,
                    attributeTypes: [1, 7, 12, 81, 2, 3, 21, 0],
                    attributeValues: [12, 10, 3, 2, 10, 10, 5, 0],
                },
                28036,
            )
        })

        it("Should decode test Pressure", async () => {
            await testDecode(
                {
                    token: "100300023092008005200400420070022013002201900100000000000000000000000000000432",
                    item: 23,
                    _type: 9,
                    attributeCount: 5,
                    attributeTypes: [8, 4, 7, 13, 19, 0, 0, 0],
                    attributeValues: [5, 4, 2, 2, 1, 0, 0, 0],
                },
                26825,
            )
        })

        it("Should decode test Zeal", async () => {
            await testDecode(
                {
                    token: "100300024242008005201100020130112071003207200100000000000000000000000000000000",
                    item: 24,
                    _type: 24,
                    attributeCount: 5,
                    attributeTypes: [8, 11, 13, 71, 72, 0, 0, 0],
                    attributeValues: [5, 0, 11, 3, 1, 0, 0, 0],
                },
                26789,
            )
        })

        it("Should decode test Balance", async () => {
            await testDecode(
                {
                    token: "100300025012008002200400520060002074018207500100000000000000000000000000000000",
                    item: 25,
                    _type: 1,
                    attributeCount: 5,
                    attributeTypes: [8, 4, 6, 74, 75, 0, 0, 0],
                    attributeValues: [2, 5, 0, 18, 1, 0, 0, 0],
                },
                26801,
            )
        })

        it("Should decode test Eternity", async () => {
            await testDecode(
                {
                    token: "100300026122001002200400220130052019001206100120350202002007200301100000230",
                    item: 26,
                    _type: 12,
                    attributeCount: 8,
                    attributeTypes: [1, 4, 13, 19, 61, 35, 2, 3],
                    attributeValues: [2, 2, 5, 1, 1, 20, 7, 11],
                },
                28501,
            )
        })

        it("Should decode test Instinct", async () => {
            await testDecode(
                {
                    token: "10030002712200100320080022004002201200220620042006002000000000000000000000000",
                    item: 27,
                    _type: 12,
                    attributeCount: 6,
                    attributeTypes: [1, 8, 4, 12, 62, 6, 0, 0],
                    attributeValues: [3, 2, 2, 2, 4, 2, 0, 0],
                },
                27411,
            )
        })

        it("Should decode test Beacon", async () => {
            await testDecode(
                {
                    token: "100300028132001001200800120130022007002200600100000000000000000000000000000085",
                    item: 28,
                    _type: 13,
                    attributeCount: 5,
                    attributeTypes: [1, 8, 13, 7, 6, 0, 0, 0],
                    attributeValues: [1, 1, 2, 2, 1, 0, 0, 0],
                },
                26813,
            )
        })

        it("Should decode test Dragonlight", async () => {
            await testDecode(
                {
                    token: "1003000291320400032001005200805020130202007010000000000000000000000001",
                    item: 29,
                    _type: 13,
                    attributeCount: 5,
                    attributeTypes: [40, 1, 8, 13, 7, 0, 0, 0],
                    attributeValues: [3, 5, 50, 20, 10, 0, 0, 0],
                },
                27861,
            )
        })

        it("Should decode test Haze", async () => {
            await testDecode(
                {
                    token: "100300030052047012203400220610022069000200203020030002093336209400100000318",
                    item: 30,
                    _type: 5,
                    attributeCount: 8,
                    attributeTypes: [47, 34, 61, 69, 2, 3, 93, 94],
                    attributeValues: [12, 2, 2, 0, 30, 0, 336, 1],
                },
                28501,
            )
        })

        it("Should decode test Luminous Flywings", async () => {
            await testDecode(
                {
                    token: "1003000321420400042034001207300320130180000000000000000000000000000018",
                    item: 32,
                    _type: 14,
                    attributeCount: 4,
                    attributeTypes: [40, 34, 73, 13, 0, 0, 0, 0],
                    attributeValues: [4, 1, 3, 18, 0, 0, 0, 0],
                },
                27385,
            )
        })

        it("Should decode test Mercy", async () => {
            await testDecode(
                {
                    token: "100300035012001004200401520340012019000200201220030042039024202100600000618",
                    item: 35,
                    _type: 1,
                    attributeCount: 8,
                    attributeTypes: [1, 4, 34, 19, 2, 3, 39, 21],
                    attributeValues: [4, 15, 1, 0, 12, 4, 24, 6],
                },
                28501,
            )
        })

        it("Should decode test Scholar's Codex 1", async () => {
            await testDecode(
                {
                    token: "100301200142040006200100120130050000000000000000000000000000000000000000002",
                    item: 1200,
                    _type: 14,
                    attributeCount: 3,
                    attributeTypes: [40, 1, 13, 0, 0, 0, 0, 0],
                    attributeValues: [6, 1, 5, 0, 0, 0, 0, 0],
                },
                26260,
            )
        })

        it("Should decode test Scholar's Codex 2", async () => {
            await testDecode(
                {
                    token: "1003012001420400062001001201300500000000000000000000000000000000000000000001",
                    item: 1200,
                    _type: 14,
                    attributeCount: 3,
                    attributeTypes: [40, 1, 13, 0, 0, 0, 0, 0],
                    attributeValues: [6, 1, 5, 0, 0, 0, 0, 0],
                },
                26138,
            )
        })

        it("Should decode test General's Medallion", async () => {
            await testDecode(
                {
                    token: "100301201142040005200100320130100000000000000000000000000000000000000000003",
                    item: 1201,
                    _type: 14,
                    attributeCount: 3,
                    attributeTypes: [40, 1, 13, 0, 0, 0, 0, 0],
                    attributeValues: [5, 3, 10, 0, 0, 0, 0, 0],
                },
                26260,
            )
        })

        it("Should decode test Crafting Competition Certificate", async () => {
            await testDecode(
                {
                    token: "100301202242059002000000000000000000000000000000000000000000000000000000000",
                    item: 1202,
                    _type: 24,
                    attributeCount: 1,
                    attributeTypes: [59, 0, 0, 0, 0, 0, 0, 0],
                    attributeValues: [2, 0, 0, 0, 0, 0, 0, 0],
                },
                25290,
            )
        })

        it("Should decode test Founder's Cube", async () => {
            await testDecode(
                {
                    token: "1003012052220400020000000000000000000000000000000000000000000000000049",
                    item: 1205,
                    _type: 22,
                    attributeCount: 1,
                    attributeTypes: [40, 0, 0, 0, 0, 0, 0, 0],
                    attributeValues: [2, 0, 0, 0, 0, 0, 0, 0],
                },
                25960,
            )
        })

        it("Should decode test Golden Lion Cub", async () => {
            await testDecode(
                {
                    token: "100303000062040005200100520130402034005204700320080032039012000000000000003",
                    item: 3000,
                    _type: 6,
                    attributeCount: 7,
                    attributeTypes: [40, 1, 13, 34, 47, 8, 39, 0],
                    attributeValues: [5, 5, 40, 5, 3, 3, 12, 0],
                },
                28146,
            )
        })

        it("Should decode test Blue-Eyes White Drake", async () => {
            await testDecode(
                {
                    token: "100303001062040005200100520130032034005204700320080302039013000000000000003",
                    item: 3001,
                    _type: 6,
                    attributeCount: 7,
                    attributeTypes: [40, 1, 13, 34, 47, 8, 39, 0],
                    attributeValues: [5, 5, 3, 5, 3, 30, 13, 0],
                },
                28170,
            )
        })

        it("Should decode test Red-Eyes Black Drake", async () => {
            await testDecode(
                {
                    token: "100303002062040004200100720130042034007204701620080042039014000000000000002",
                    item: 3002,
                    _type: 6,
                    attributeCount: 7,
                    attributeTypes: [40, 1, 13, 34, 47, 8, 39, 0],
                    attributeValues: [4, 7, 4, 7, 16, 4, 14, 0],
                },
                28158,
            )
        })

        it("Should decode test Fairy Drake", async () => {
            await testDecode(
                {
                    token: "100303003062040006200100320130082034002204700220080022039015000000000000004",
                    item: 3003,
                    _type: 6,
                    attributeCount: 7,
                    attributeTypes: [40, 1, 13, 34, 47, 8, 39, 0],
                    attributeValues: [6, 3, 8, 2, 2, 2, 15, 0],
                },
                28170,
            )
        })

        it("Should decode test Goblin Drake", async () => {
            await testDecode(
                {
                    token: "100303004062040003200101020130202034005204700520080052039016000000000000001",
                    item: 3004,
                    _type: 6,
                    attributeCount: 7,
                    attributeTypes: [40, 1, 13, 34, 47, 8, 39, 0],
                    attributeValues: [3, 10, 20, 5, 5, 5, 16, 0],
                },
                28158,
            )
        })

        it("Should decode test Hippogryph", async () => {
            await testDecode(
                {
                    token: "100303005062040004200100720130162034004204700420080042039017000000000000002",
                    item: 3005,
                    _type: 6,
                    attributeCount: 7,
                    attributeTypes: [40, 1, 13, 34, 47, 8, 39, 0],
                    attributeValues: [4, 7, 16, 4, 4, 4, 17, 0],
                },
                28170,
            )
        })

        it("Should decode test Wyvern", async () => {
            await testDecode(
                {
                    token: "100303006062040006200100320130082034002204700220080022039018000000000000004",
                    item: 3006,
                    _type: 6,
                    attributeCount: 7,
                    attributeTypes: [40, 1, 13, 34, 47, 8, 39, 0],
                    attributeValues: [6, 3, 8, 2, 2, 2, 18, 0],
                },
                28158,
            )
        })

        it("Should decode test Forest Turtle", async () => {
            await testDecode(
                {
                    token: "100303007062040003200101020130202034005204700520080052039019000000000000001",
                    item: 3007,
                    _type: 6,
                    attributeCount: 7,
                    attributeTypes: [40, 1, 13, 34, 47, 8, 39, 0],
                    attributeValues: [3, 10, 20, 5, 5, 5, 19, 0],
                },
                28158,
            )
        })

        it("Should decode test Skeleton Drake", async () => {
            await testDecode(
                {
                    token: "100303008062040003200101020130202034005204700520080052039020000000000000001",
                    item: 3008,
                    _type: 6,
                    attributeCount: 7,
                    attributeTypes: [40, 1, 13, 34, 47, 8, 39, 0],
                    attributeValues: [3, 10, 20, 5, 5, 5, 20, 0],
                },
                28158,
            )
        })

        after(async () => {
            console.log("\t- %d total gas, lowest to date %d", totalGas, lowestTotalGas)
        })
    })
})
