import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = new Metaplex(connection);

export const connectWallet = async () => {
  const { solana } = window;
  if (!solana) return alert("Install Phantom");

  const response = await solana.connect();
  return response.publicKey.toString();
};

export const fetchNFTs = async (walletAddress) => {
  const owner = new PublicKey(walletAddress);
  const nfts = await metaplex.nfts().findAllByOwner({ owner });

  return nfts.map(nft => ({
    id: nft.mintAddress.toString(),
    name: nft.name,
    image: nft.json?.image || "https://via.placeholder.com/150",
    aura: "Green"
  }));
};
