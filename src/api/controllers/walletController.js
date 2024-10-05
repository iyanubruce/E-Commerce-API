const Wallet = require("../models/wallet");

exports.createWallet = async (req, res) => {
	try {
		const { userId, initialBalance, currency } = req.body;
		const userExists = await User.findById(userId);
		if (!userExists) {
			return res.status(404).json({ message: "User not found" });
		}

		const newWallet = new Wallet({
			userId,
			balance: initialBalance,
			currency,
		});

		const savedWallet = await newWallet.save();
		res.status(201).json({
			message: "New wallet created",
			wallet: savedWallet,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error creating wallet" });
	}
};

exports.fundWallet = async (req, res) => {
	try {
		const { amount, id, currency } = req.body;

		if (!amount || !currency) {
			return res.status(400).json({ message: "Invalid input" });
		}

		const walletExists = await Wallet.findById(id);
		if (!walletExists) {
			return res.status(404).json({ message: "Wallet does not exist" });
		}

		if (walletExists.currency !== currency) {
			return res.status(400).json({ message: "Currency mismatch" });
		}

		const newBalance = walletExists.balance + amount;

		const updatedWallet = await Wallet.findByIdAndUpdate(
			id,
			{ balance: newBalance },
			{ new: true },
		);
		res.status(200).json({
			message: "Wallet funded successfully",
			wallet: updatedWallet,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error funding wallet" });
	}
};

exports.sendToWallet = async (req, res) => {
	try {
		const { amount, sendersId, currency, recipientsId } = req.body;

		if (!amount || !currency || !sendersId || !recipientsId) {
			return res.status(400).json({ message: "Invalid input" });
		}

		const sendersWalletExists = await Wallet.findById(sendersId);
		const recipientsWalletExists = await Wallet.findById(recipientsId);

		if (!sendersWalletExists || !recipientsWalletExists) {
			return res
				.status(404)
				.json({ message: "One or both wallets do not exist" });
		}

		if (sendersWalletExists.currency !== currency) {
			return res
				.status(400)
				.json({ message: "Sender's currency mismatch" });
		}

		if (recipientsWalletExists.currency !== currency) {
			return res
				.status(400)
				.json({ message: "Recipient's currency mismatch" });
		}

		const sendersNewBalance = sendersWalletExists.balance - amount;
		const recipientsNewBalance = recipientsWalletExists.balance + amount;

		const updatedSendersWallet = await Wallet.findByIdAndUpdate(
			sendersId,
			{ balance: sendersNewBalance },
			{ new: true },
		);

		const updatedRecipientsWallet = await Wallet.findByIdAndUpdate(
			recipientsId,
			{ balance: recipientsNewBalance },
			{ new: true },
		);

		res.status(200).json({
			message: "Transfer completed",
			sender: updatedSendersWallet,
			recipient: updatedRecipientsWallet,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error completing transfer" });
	}
};
