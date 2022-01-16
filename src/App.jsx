import { useEffect, useMemo, useState } from "react";

import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
//import { ConnectWallet } from "@3rdweb/react";
import twitterLogo from './assets/twitter-logo.svg';
import discordLogo from './assets/discordlogo.png';

// Constants
const TWITTER_HANDLE = 'sdimantha';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const DISCORD_LINK = `https://discord.gg/gZY4DEQ8Yb`;



const sdk = new ThirdwebSDK("rinkeby");



const bundleDropModule = sdk.getBundleDropModule(
  "0x7445Dd1bD5f6a2d937949F4a6bD4eB43798Ed5de",
);


const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address)

  
  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  
  const [isClaiming, setIsClaiming] = useState(false);

  
  useEffect(() => {
    
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if (!address) {
      return;
    }
    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!")
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to nft balance", error);
      });
  }, [address]);

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to NFPodcasts!</h1>
        <h2>Mint limited edition podcast NFTs for 🔮 exclusive perks, merch and more</h2>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <><div className="member-page">
        <h1>NFPodcasts Member Page</h1>
        <figure>
          <figcaption>Exclusive Shazam music welcome video:</figcaption>
          <video controls src="https://ipfs.io/ipfs/bafybeid242qi4fleo5i6pbihbtgguslshj7i7tmvuoayeb6jq3l3yl3xpi" type="video/mp4">
          </video>
        </figure>
      </div>
      <div className="footer-container">
          <img alt="Discord Logo" className="discord-logo" src={discordLogo} />
          <a
            className="footer-text"
            href={DISCORD_LINK}
            target="_blank"
            rel="noreferrer"
          >{`join the community`}</a>
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div></>
    );
  };
  
  const mintNft = () => {
    setIsClaiming(true);
    
    bundleDropModule
    .claim("0", 1)
    .then(() => {
    
      setHasClaimedNFT(true);
    
      console.log(
        `🌊 Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
      );
    })
    .catch((err) => {
      console.error("failed to claim", err);
    })
    .finally(() => {
    
      setIsClaiming(false);
    });
  }
  
  
  return (
    <div className="mint-nft">
      <h1>Mint your limited edition 🎙️ podcast NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );

  
};

export default App;