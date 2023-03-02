// const { ethers } = require("https://cdn.ethers.io/lib/ethers-5.2.umd.min.js");

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

async function getMood() {
    const mood = await moodContract.getMood();
    console.log("get works");
    alert(mood);
}

async function setMood() {
    const mood = document.getElementById("mood").value;
    await moodContract.setMood(mood);
    console.log("set works");
}

const main = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
	const accounts = await provider.send("eth_requestAccounts", []);
	signer = provider.getSigner(accounts[0]);
	moodContract = new ethers.Contract(moodContractAddress, moodContractABI, signer);
	
	let getBtn = document.getElementById("get")
	let setBtn = document.getElementById("set")

	setBtn.addEventListener('click', setMood);
	getBtn.addEventListener('click', getMood);
}

main()

