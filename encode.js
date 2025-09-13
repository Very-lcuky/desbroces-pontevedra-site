import { ethers } from "ethers";

// Define la interfaz de tu contrato
const iface = new ethers.utils.Interface([
  "function mintTo(address to, uint256 amount)"
]);

// Dirección de destino y cantidad
const to = "0x692018bED36405fD85d9f9531A146cA3b0aE45a0";
const amount = 1;

// Genera la data codificada en hex
const data = iface.encodeFunctionData("mintTo", [to, amount]);

console.log(data);
