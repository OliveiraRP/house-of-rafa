import { useQuery } from "@tanstack/react-query";
import { ENV } from "../config/env";

export function useTransactions(walletId) {
  return useQuery({
    queryKey: ["transactions", walletId],
    queryFn: async () => {
      const res = await fetch(
        `${ENV.BACKEND_URL}/api/v1/transactions/wallet/${walletId}`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();

      return data;
    },
    enabled: !!walletId,
  });
}
