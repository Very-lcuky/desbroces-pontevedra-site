import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const client = createPublicClient({
  chain: base,
  transport: http("https://base-mainnet.g.alchemy.com/v2/hpm3wjQJZ31MCYtCUfJen"), // Tu URL de Alchemy
});

async function obtenerBloque() {
  try {
    const block = await client.getBlock({
      blockNumber: 123456n,  // Cambia el número de bloque si necesitas otro
    });

    console.log("Bloque obtenido:", block);
  } catch (error) {
    console.error("Error al obtener el bloque:", error);
  }
}

obtenerBloque();
