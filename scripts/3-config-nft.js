import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x7445Dd1bD5f6a2d937949F4a6bD4eB43798Ed5de",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Podcast #1: Shazam Intro",
        description: "This NFT will give you access to PodcastDAO, and an exclusive channel with Discord channel with Shazam",
        image: readFileSync("scripts/assets/shazampodcastNFTphoto.png"),
        //animation_url: "https://ipfs.io/ipfs/bafkreibbhaql7fh6qsodg4jrq3qgiivr4u3kicprgv3a6c42nzg3dxumgm",
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()