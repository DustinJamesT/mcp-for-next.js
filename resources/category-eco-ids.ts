
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js"; // Or appropriate path from SDK
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";


export const CATEGORY_ECO_IDS = `
<available_ecosystem_ids>
        * Bitcoin (ecosystem_id: 1701): Bitcoin network and Bitcoin-based protocols
        * Ethereum (ecosystem_id: 4694): Ethereum mainnet and Ethereum-based protocols
        * Solana (ecosystem_id: 11943): Solana blockchain and Solana-based protocols
        * Base (ecosystem_id: 15071): Base L2 and Base-based protocols (Coinbase's L2)
        * Optimism (ecosystem_id: 9558): Optimism L2 and Optimism-based protocols
        * Arbitrum (ecosystem_id: 813): Arbitrum L2 and Arbitrum-based protocols
        * Celestia (ecosystem_id: 2651): Celestia modular blockchain and Celestia-based protocols
        * Monad (ecosystem_id: 21788): Monad L1 network and Monad-based protocols
        * Binance Smart Chain (ecosystem_id: 1615): Binance Smart Chain and BSC-based protocols
        * MegaETH (ecosystem_id: 21724): MegaETH network and related protocols
        * Eclipse (ecosystem_id: 21723): Eclipse blockchain and Eclipse-based protocols
        * Movement (ecosystem_id: 8768): Movement blockchain and Movement-based protocols
        * Aptos (ecosystem_id: 779): Aptos blockchain and Aptos-based protocols
        * Sui (ecosystem_id: 12556): Sui blockchain and Sui-based protocols
        * Avalanche (ecosystem_id: 1063): Avalanche network and Avalanche-based protocols
        * Polygon (ecosystem_id: 10322): Polygon network and Polygon-based protocols
        * Scroll (ecosystem_id: 11434): Scroll L2 and Scroll-based protocols
        * Berachain (ecosystem_id: 1515): Berachain network and Bearachain-based protocols
        * Sonic (ecosystem_id: 12090): Sonic blockchain and Sonic-based protocols
        * Hyperliquid (ecosystem_id: 6373): Hyperliquid network and Hyperliquid-based protocols
        * Uniswap (ecosystem_id: 13595): Unichain L2 network (Uniswap's L2), Unichain-based protocols, and Uniswap-Hook enabled protocols
        * NEAR (ecosystem_id: 8971): NEAR Protocol and NEAR-based protocols
        * Hedera (ecosystem_id: 6086): Hedera network and Hedera-based protocols
        * Ronin (ecosystem_id: 11150): Ronin blockchain and Ronin-based protocols
        * Cosmos (ecosystem_id: 3191): Cosmos network and Cosmos-based protocols
        * Ripple (ecosystem_id: 11079): Ripple network and Ripple-based protocols
        * Bittensor (ecosystem_id: 1790): Bittensor network and Bittensor-based protocols. Note: Bittensor's token is called TAO and the subnets on Bittensor all have dTAO or alpha tokens.
        * Virtuals (ecosystem_id: 13926): Virtuals AI Agents Ecosystem and Virtuals-based protocols
        * ElizaOS (ecosystem_id: 388): ElizaOS AI Agents Ecosystem and ElizaOS-based protocols (formally known as ai16z)
        * Telegram (ecosystem_id: 13026): Telegram (TON) network and Telegram-based protocols
        * TRON (ecosystem_id: 13386): TRON network and TRON-based protocols
        * Cardano (ecosystem_id: 2510): Cardano network and Cardano-based protocols
        * ZKsync (ecosystem_id: 15022): ZKsync network and ZKsync-based protocols
        * Blast (ecosystem_id: 1828): Blast network and Blast-based protocols
        * Linea (ecosystem_id: 21801): Linea network and Linea-based protocols
        * Stacks (ecosystem_id: 1892): Stacks network and Stacks-based protocols
        * Celo (ecosystem_id: 2656): Celo network and Celo-based protocols
        * Starknet (ecosystem_id: 12388): Starknet network and Starknet-based protocols
        * Sei (ecosystem_id: 11484): Sei network and Sei-based protocols
    </available_ecosystem_ids>

    <available_category_ids>
        * DeFi (category_id: 513): DeFi protocols, DeFi infrastructure, and DeFi services
        * Derivatives (category_id: 514): derivatives protocols, perpetual derivatives, and derivative infrastructure
        * RWAs (category_id: 547): real world assets, real world asset infrastructure, and real world asset services
        * NFTs (category_id: 515): NFTs, NFT markets, and NFT infrastructure
        * Gaming (category_id: 516): gaming protocols, games, and game infrastructure
        * AI (category_id: 517): AI protocols, AI infrastructure, and AI services
        * SocialFi (category_id: 518): social protocols with onchain social features and financization 
        * DAOs (category_id: 519): decentralized autonomous organizations
        * Memecoins (category_id: 520): memecoins, shibes, and other meme-based cryptocurrencies
        * Stablecoins (category_id: 521): stablecoins, algorithmic stablecoins, and other stablecoin protocols
        * Ecosystems (category_id: 522): base chain infrastructure like layer-1s
        * Rollups (category_id: 523): rollups, layer 2s, and other scaling solutions
        * ZK (category_id: 526): zero-knowledge proofs, zk-rollups, and zk-infrastructure
        * Interoperability (category_id: 527): protocols that enable cross-chain communication like bridges, oracles, etc.
        * DePIN (category_id: 512): decentralized physical infrastructure like wireless, compute, storage, etc.
        * Wallets (category_id: 525): wallets, wallet infrastructure, and wallet services
        * Consumer (category_id: 528): onchain consumer products, services, and experiences
    </available_category_ids>
`

export function getCategoryEcoIds(server: McpServer) {
    server.resource(
        "Feed: Returns feed metadata. Accepts content resource URI, i.e. feeds://{id}, where 'id' is a feed identifier.",
        new ResourceTemplate("feeds://{category_or_ecosystem}}", { list: undefined }),
        async (uri: URL, variables, ctx) => {
          const id = variables.id as string;
          const client = 'test'
          console.log('... [resource] getCategoryEcoIds ctx:', ctx);
          const auth = ctx.authInfo?.token; // ← "Bearer xxx"
          console.log('... [resource] getCategoryEcoIds auth:', auth);
          const authInfo = ctx.authInfo;
          console.log('... [resource] getCategoryEcoIds authInfo:', authInfo);
          try {
            const response = ""
            console.log('... [resource] getCategoryEcoIds process.env.VELDT_API_KEY:', process.env.VELDT_API_KEY);

            return {
              contents: [
                {
                  uri: uri.toString(),
                  text: CATEGORY_ECO_IDS,
                  mimeType: 'text/plain'
                }
              ]
            };
          } catch (error) {
            console.error("Error fetching feed:", error);
            return {
              contents: []
            };
          }
        }
      );
    } 

