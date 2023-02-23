import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"

const moodContractAddress = "0xea29Bf52600B24951487358228e7580DC7774A39";
const moodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
let moodContract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        moodContract = new ethers.Contract(
            moodContractAddress,
            moodContractABI,
            signer
        )
    })
})

async function getMood() {
    const getMoodPromice = moodContract.getMood();
    const mood = await getMoodPromice;
    alert(mood);
}

async function setMood() {
    const mood = document.getElementById("mood").value;
    const setMoodPromise = moodContract.setMood(mood);
    await setMoodPromise;
}