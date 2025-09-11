import fetch from "node-fetch";

const SECRET_KEY = "scx0JtD9rHn7Am2LeXJBo-oAUQw6BxPppF5H1ttNHO3xGnoDZ9gnXkUPWR3u0o0Kh2_S_UhFsb1w7VQ660TyNA";
const SERVER_WALLET = "0x692018bED36405fD85d9f9531A146cA3b0aE45a0";
const CONTRACT_ADDRESS = "TU_CONTRACT_ADDRESS"; // reemplaza

export async function mintTokens(req, res) {
  try {
    const { to, amount } = req.body;

    const response = await fetch("https://api.thirdweb.com/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": SECRET_KEY
      },
      body: JSON.stringify({
        chainId: "84532",  // Base Testnet/Mainnet
        from: SERVER_WALLET,
        transactions: [
          {
            type: "contractCall",
            contractAddress: CONTRACT_ADDRESS,
            method: "mintTo(address,uint256)",
            params: [to, amount]
          }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
