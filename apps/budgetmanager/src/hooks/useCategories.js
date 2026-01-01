import { useQuery } from "@tanstack/react-query";
import { ENV } from "../config/env";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/categories`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    staleTime: 1000 * 60 * 10,
  });
}
