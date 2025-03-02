import type { User } from "@repo/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
	return useQuery({
		queryKey: ["users", "all"],
		queryFn: async () =>
			fetch("/users").then((result) => result.json() as Promise<User[]>),
	});
};
