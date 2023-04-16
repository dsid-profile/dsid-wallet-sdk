import {ethers, HDNodeWallet} from "ethers";
import Api from "./api.service";
import {ProfileService} from './profile.service';

export interface StudentProfile {
    id: number
    name: string
    dayOfBirth: string
    email: string,
    phoneNumber: string,
    selfieImage: string,
    idFrontImage: string,
    idBackImage: string
}

class Wallet {
    wallet: any
    api: Api

    constructor(mnemonic: string, apiEndpoint: string, ) {
        this.wallet = ethers.Wallet.fromPhrase(mnemonic)
        this.api = new Api(apiEndpoint)
    }

    getAddress = (): string => {
        return this.wallet.address
    }
    submitProfile = async (studentProfile: StudentProfile): Promise<any> => {
        const leave = [studentProfile.name, studentProfile.dayOfBirth, studentProfile.email, studentProfile.phoneNumber, studentProfile.selfieImage, studentProfile.idBackImage, studentProfile.idBackImage]
        const root = "0x" + ProfileService.createTree(leave).root().hash.toString("hex");

        const result = await this.api.post("/students/submit", {
            id: studentProfile.id,
            address: this.getAddress(),
            day_of_birth: studentProfile.dayOfBirth,
            email: studentProfile.email,
            phone_number: studentProfile.phoneNumber,
            selfie_image: studentProfile.selfieImage,
            id_front_image: studentProfile.idFrontImage,
            id_back_image: studentProfile.idBackImage,
            root,
        })

        return result
    }

    updateProfile = async (studentProfile: StudentProfile) => {
        const leave = [studentProfile.name, studentProfile.dayOfBirth, studentProfile.email, studentProfile.phoneNumber, studentProfile.selfieImage, studentProfile.idBackImage, studentProfile.idBackImage]
        const root = "0x" + ProfileService.createTree(leave).root().hash.toString("hex");

        console.log(
            {
                name: "Profile",
                version: "0.0.1",
                chainId: 0xaa36a7,
                verifyingContract: "0x46ECCE43b97eD208183E1619Ac90F7B72fFc2a2D"
            }, 
            {
                Update: [
                    { name: "tokenId", type: "uint256" },
                    { name: "merkleRoot", type: "bytes32" },
                ]
            },
            {
                Update: {
                    tokenId: studentProfile.id.toString(),
                    merkleRoot: ethers.hexlify(root)
                }
            }
        )

        const signature = await this.wallet.signMessage(
            {
                name: "Profile",
                version: "0.0.1",
                chainId: 0xaa36a7,
                verifyingContract: "0x46ECCE43b97eD208183E1619Ac90F7B72fFc2a2D"
            }, 
            {
                Update: [
                    { name: "tokenId", type: "uint256" },
                    { name: "merkleRoot", type: "bytes32" },
                ]
            },
            {
                Update: {
                    tokenId: studentProfile.id.toString(),
                    merkleRoot: ethers.hexlify(root)
                }
            }
        )

        console.log(signature)

        const result = await this.api.post("/students/update", {
            id: studentProfile.id,
            address: this.getAddress(),
            day_of_birth: studentProfile.dayOfBirth,
            email: studentProfile.email,
            phone_number: studentProfile.phoneNumber,
            selfie_image: studentProfile.selfieImage,
            id_front_image: studentProfile.idFrontImage,
            id_back_image: studentProfile.idBackImage,
            root,
            signature
        })

        return result
    }

    getProfile = async (studentId: number): Promise<any> => {
        const result: any = await this.api.get(`/students/student?id=${studentId}`)
        return result.message
    }
}

export default Wallet
