import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export function useTransactionsByTimeframe(startDate, endDate) {
  return useQuery({
    queryKey: ["transactions", { startDate, endDate }],
    queryFn: async () => {
      const params = new URLSearchParams({ startDate, endDate });
      const res = await fetch(
        `${ENV.BACKEND_URL}/api/v1/transactions?${params.toString()}`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to fetch transactions");
      return res.json();
    },
    enabled: !!startDate && !!endDate,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create transaction");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}
