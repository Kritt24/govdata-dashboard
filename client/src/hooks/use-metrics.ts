import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useMetrics() {
  return useQuery({
    queryKey: [api.metrics.list.path],
    queryFn: async () => {
      const res = await fetch(api.metrics.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch metrics");
      return api.metrics.list.responses[200].parse(await res.json());
    },
  });
}

export function useMetric(id: number) {
  return useQuery({
    queryKey: [api.metrics.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.metrics.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch metric details");
      return api.metrics.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
