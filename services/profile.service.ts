import Web3 from "web3";
import {MerkleNode, MerkleTree} from "./merkleTree.service";

export class ProfileService {
    static createTree(
        leave: string[]
    ): MerkleTree {
        const hashes = leave.map(leaf => {
            return this.computeHash(leaf)
        })

        return new MerkleTree(hashes)
    }

    static getProofs(tree: MerkleTree, index: number): MerkleNode[] {
        const nodes = tree.nodes()
        const proofs = []
        let currentIndex = index
        for (let i = 0; i < nodes.length - 1; i++) {
            const proof = currentIndex % 2 == 0
                ? nodes[i][currentIndex + 1]
                : nodes[i][currentIndex - 1]
            currentIndex = (currentIndex - (currentIndex % 2)) / 2
            proofs.push(proof)
        }

        return proofs
    }

    static computeHash(data: string): Buffer {
        const web3 = new Web3()
        const hash: string | null = web3.utils.soliditySha3(
            {type: "string", value: String(data)},
        )
        return hash ? Buffer.from(hash.substring(2), 'hex') : Buffer.from("")
    }
}
