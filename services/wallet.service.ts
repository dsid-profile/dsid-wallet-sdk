import {InfuraProvider} from '@ethersproject/providers';
import {Contract, ethers, HDNodeWallet, InterfaceAbi} from "ethers";
import ProfileAbi from "../profile.abi.json";
import Api from "./api.service";
import {ProfileService} from './profile.service';

export interface StudentProfile {
    name: string
    dayOfBirth: number
    email: string,
    phoneNumber: string,
    avatar: string,
    idFrontImage: string,
    idBackImage: string
}

class Wallet {
    wallet: HDNodeWallet
    provider: InfuraProvider
    api: Api
    contract: Contract

    constructor(mnemonic: string, apiEndpoint: string, ) {
        this.provider = new InfuraProvider("sepolia", 'bf8cd18abd9e4daf8b0b552cdb8af09b');
        this.wallet = ethers.Wallet.fromPhrase(mnemonic)
        this.api = new Api(apiEndpoint)
        this.contract = new Contract("0x46ECCE43b97eD208183E1619Ac90F7B72fFc2a2D", ProfileAbi.abi as InterfaceAbi)
    }

    getAddress = (): string => {
        return this.wallet.address
    }

    submitProfile = async (studentProfile: StudentProfile): Promise<any> => {
        const leave = [studentProfile.name, String(studentProfile.dayOfBirth), studentProfile.email, studentProfile.phoneNumber, studentProfile.avatar, studentProfile.idBackImage, studentProfile.idBackImage]
        const root = ProfileService.createTree(leave).root().hash.toString("hex");

        const result = this.api.post("/student/submit", {
            ...studentProfile,
            day_of_birth: studentProfile.dayOfBirth,
            phone_number: studentProfile.phoneNumber,
            id_front_image: studentProfile.idFrontImage,
            id_back_image: studentProfile.idBackImage,
            root,
        })

        return result
    }

    updateProfile = async () => {
    }

    getProfile = async (studentId: number) => {
        const result = this.api.post('/student')
    }
}

export default Wallet
