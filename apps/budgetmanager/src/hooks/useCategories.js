import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ENV } from "../config/env";

const KEYS = {
  all: ["categories"],
  groups: ["category-groups"],
};

export function useCategories() {
  return useQuery({
    queryKey: KEYS.all,
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

export function useCategoryGroups() {
  return useQuery({
    queryKey: KEYS.groups,
    queryFn: async () => {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/categories/groups`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch category groups");
      return res.json();
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory) => {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create category");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.all });
    },
  });
}

export function useCreateCategoryGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newGroup) => {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/categories/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGroup),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create category group");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.groups });
    },
  });
}
