import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ENV } from "../config/env";

export function useWallets() {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/wallets`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch wallets");
      return res.json();
    },
  });
}

export function useCreateWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/wallets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create wallet");
      }
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wallets"] }),
  });
}

export function useUpdateWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/wallets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wallets"] }),
  });
}

export function useArchiveWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(
        `${ENV.BACKEND_URL}/api/v1/wallets/${id}/archive`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Archive failed");
      return res.json();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["wallets"] });
      const previous = queryClient.getQueryData(["wallets"]);
      queryClient.setQueryData(["wallets"], (old) =>
        old?.filter((w) => w.id !== id)
      );
      return { previous };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["wallets"], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["wallets"] }),
  });
}
