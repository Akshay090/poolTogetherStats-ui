// components/Prizes.jsx

import { useQuery } from "@apollo/react-hooks";
import { ethers } from "ethers";
import gql from "graphql-tag";

const prizesQuery = gql`
  query {
    poolPrizes(orderBy: drawId, orderDirection: asc) {
      id
      drawId
      depositCount
      depositAmount
      withdrawalCount
      withdrawalAmount
    }
  }
`;

export function Prizes() {
  const { loading, error, data } = useQuery(prizesQuery);

  let result = <div className="font-bold mt-4 text-cyan-400">...Loading</div>;
  if (error) {
    result = `Error: ${error.message}`;
  } else if (data) {
    result = (
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <td className="px-4 py-2 text-cyan-600">Prize Id</td>
            <td className="px-4 py-2 text-cyan-600">Deposit Count</td>
            <td className="px-4 py-2 text-cyan-600">Withdrawal Count</td>
            <td className="px-4 py-2 text-cyan-600">Total Deposits</td>
            <td className="px-4 py-2 text-cyan-600">Total Withdrawals</td>
          </tr>
        </thead>
        <tbody>
          {data.poolPrizes.map((poolPrize) => (
            <tr key={poolPrize.id.toString()}>
              <td className="border border-cyan-500 px-4 py-2 text-cyan-600 font-medium">
                {poolPrize.drawId.toString()}
              </td>
              <td className="border border-cyan-500 px-4 py-2 text-cyan-600 font-medium">
                {poolPrize.depositCount.toString()}
              </td>
              <td className="border border-cyan-500 px-4 py-2 text-cyan-600 font-medium">
                {poolPrize.withdrawalCount.toString()}
              </td>
              <td className="border border-cyan-500 px-4 py-2 text-cyan-600 font-medium">
                {ethers.utils.formatEther(poolPrize.depositAmount, {
                  commify: true,
                  pad: true,
                })}
              </td>
              <td className="border border-cyan-500 px-4 py-2 text-cyan-600 font-medium">
                {ethers.utils.formatEther(poolPrize.withdrawalAmount, {
                  commify: true,
                  pad: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return result;
}
