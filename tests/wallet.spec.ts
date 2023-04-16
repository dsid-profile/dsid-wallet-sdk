import { Result } from "ethers"
import Api from "../services/api.service"
import Wallet, { StudentProfile } from "../services/wallet.service"

describe("Wallet", () => {
    let wallet: Wallet
    let api: Api
    let studentNumber: number
    before(() => {
        studentNumber = 1812336
        wallet = new Wallet("maid green quantum teach fragile average rate subway maple quality grief alone", "http://localhost:8000")
        api = new Api("http://localhost:8000")
    })

    /*
    // call from admin web
    it("Create student", async () => {
        //create student
        const result = await api.post("/schools/create-students", {
            ids: [studentNumber], 
            names: ["Terry"]
        })
    })

    // call from mobile app
    it("Submit infomation", async () => {
        // get student info
        const studentInfo = await wallet.getProfile(studentNumber)

        // submit student info on App
        const studentProfile: StudentProfile = {
            id: studentNumber,
            name: studentInfo.name,
            dayOfBirth: (new Date()).valueOf().toString(),
            selfieImage: "https://file.com/selfie",
            idBackImage: "https://file.com/idBackImage",
            idFrontImage: "https://file.com/idFrontImage",
            email: "email@gmail.com",
            phoneNumber: "01234567892"
        }

        const result = await wallet.submitProfile(studentProfile)
        console.log(result)
        console.log(studentInfo)
    })

    // call from admin web
    it("Verify infomation", async () => {
        const result = await api.post("/schools/verify", {
            ids: [studentNumber]
        })

        console.log(result)
    })
    */

    it("Update infomation", async () => {
        const studentInfo = await wallet.getProfile(studentNumber)
        const studentProfile: StudentProfile = {
            id: studentNumber,
            name: studentInfo.name,
            dayOfBirth: (new Date()).valueOf().toString(),
            selfieImage: "https://file.com/selfie",
            idBackImage: "https://file.com/idBackImage",
            idFrontImage: "https://file.com/idFrontImage",
            email: "email@gmail.com",
            phoneNumber: "01234567892"
        }

        const result = await wallet.updateProfile(studentProfile)

        console.log(result)
    })
})
