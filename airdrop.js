// npm init -y
// npm install --save @solana/web3.js

const { 
    Connection, 
    LAMPORTS_PER_SOL, 
    clusterApiUrl, 
    Keypair
  } = require("@solana/web3.js");
  
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
  (async ()=> {
  
    const keypair = Keypair.generate();
  
    const airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      LAMPORTS_PER_SOL*2
    );
    
    const latestBlockHash = await connection.getLatestBlockhash();
    
    const txn = await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });
  
    console.log({
      publicKey: keypair.publicKey,
      privateKey: keypair.secretKey,
      signature: airdropSignature,
      txn
    })
  })()

//   b4da19ec81ce605bc9831fcc9f17803dc3af7bc4076d6c235ece62320ddb93f7
//   [
//     130,   6, 170,  99, 139,  17,  12, 237,  26,  51, 245,
//     187, 152, 188, 144, 225, 239,  93, 114,  23, 250, 114,
//     161, 183, 178, 209, 205,  49,  91,  37, 116, 177, 180,
//     218,  25, 236, 129, 206,  96,  91, 201, 131,  31, 204,
//     159,  23, 128,  61, 195, 175, 123, 196,   7, 109, 108,
//      35,  94, 206,  98,  50,  13, 219, 147, 247
//   ]