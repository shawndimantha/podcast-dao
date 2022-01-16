import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x96c50049623738a3A699F203788d42d1C5464b5d");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "PodcastDAO Membership",
      description: "A DAO for fans of Podcasts",
      // The image for the collection that will show up on OpenSea.
      image: readFileSync("scripts/assets/podcastdaologo.png"),
      //animation_url: "https://ipfs.io/ipfs/bafkreibbhaql7fh6qsodg4jrq3qgiivr4u3kicprgv3a6c42nzg3dxumgm",
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: "0x5ac62Bb43f2f9B613d26fD5bB26C923B690B9A2e",
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()