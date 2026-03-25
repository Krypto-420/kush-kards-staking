import React, { useState, useEffect } from 'react';
import { connectWallet, fetchNFTs } from './utils/solana';
import { calculateRewards } from './utils/rewards';

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [nfts, setNFTs] = useState([]);
  const [rewards, setRewards] = useState(0);

  const handleConnect = async () => {
    const addr = await connectWallet();
    setWallet(addr);
  };

  useEffect(() => {
    if (wallet) {
      fetchNFTs(wallet).then(setNFTs);
    }
  }, [wallet]);

  useEffect(() => {
    let total = 0;
    nfts.forEach(n => total += calculateRewards(10, n.aura, 1));
    setRewards(total);
  }, [nfts]);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl mb-4">Kush Kards Staking</h1>
      <button onClick={handleConnect} className="bg-green-500 px-4 py-2 rounded">Connect Wallet</button>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {nfts.map(nft => (
          <div key={nft.id} className="border p-2 rounded">
            <img src={nft.image} alt="" />
            <p>{nft.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2>Rewards: {rewards} $SEEDS</h2>
      </div>
    </div>
  );
}
