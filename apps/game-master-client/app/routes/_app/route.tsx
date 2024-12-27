import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useRouteError } from "react-router";
import { typedjson, useTypedRouteLoaderData } from "remix-typedjson";
import { Text } from "~/components/ui/typeography";
import { createApiFromReq } from "~/lib/api.server";
import { getData } from "~/util/handle-error";
import { AppLayout } from "./root-layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Game Master: Notes for Heroes" },
    {
      name: "description",
      content: "Take your notes to the next level with Game Master",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { userId, api } = await createApiFromReq(request);
  const userGames = await getData(() => api.users.games(userId));
  const userData = await getData(() => api.users.getUser(userId));

  return typedjson({ userGames, userData });
};

export function useAppData() {
  const data = useTypedRouteLoaderData<typeof loader>("routes/_app");
  if (data === undefined) {
    throw new Error("useAppData must be used within the _app route or its children");
  }
  return data;
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="mx-auto w-4/5">
      <Text variant={"h3"} className="pt-20 w-full text-center">
        Something went wrong
      </Text>
    </div>
  );
}

export { AppLayout as default };
