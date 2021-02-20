// components/TokenSupplies.jsx

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ethers } from "ethers";

const supplyQuery = gql`
  query {
    poolCommittedSupply: call(contract: "DaiPool", fn: "committedSupply")
      @client
    poolOpenSupply: call(contract: "DaiPool", fn: "openSupply") @client
    daiSupply: call(contract: "Dai", fn: "totalSupply") @client
    poolLiquidityCap: call(contract: "MainDaiPool", fn: "liquidityCap") @client
    poolBalance: call(contract: "MainDaiPool", fn: "balance") @client
  }
`;

export function TokenSupplies() {
  const { loading, error, data } = useQuery(supplyQuery, {
    pollInterval: 2000,
  });

  let result = <div className="font-bold mt-4 text-cyan-400">...Loading</div>;
  if (error) {
    result = `Error: ${error.message}`;
  } else if (data) {
    result = (
      <div className="stats-bar">
        <p>
          Pool Committed Supply:{" "}
          {ethers.utils.formatEther(data.poolCommittedSupply)}
        </p>
        <p>Pool Open Supply: {ethers.utils.formatEther(data.poolOpenSupply)}</p>
        <p>Dai Supply: {ethers.utils.formatEther(data.daiSupply)}</p>
        <p>
          Pool Liquidity Cap: {ethers.utils.formatEther(data.poolLiquidityCap)}
        </p>
        <p>Pool Balance: {ethers.utils.formatEther(data.poolBalance)}</p>
      </div>
    );
  }

  return result;
}
