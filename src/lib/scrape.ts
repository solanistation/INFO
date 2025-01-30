const ragChat = require("rag-chat");
const redis = require("redis");

const scrape = async () => {
  const url = "https://solana.com/docs/rpc/http/gettokenaccountbalance";
  const isSolanaDocsUrlAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    url
  );

  if (!isSolanaDocsUrlAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: url,
      // config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", url);
  }
};

scrape();
