import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import type { Params } from "react-router";
import { typedjson } from "remix-typedjson";
import { z } from "zod";
import { parseForm, parseParams } from "zodix";
import { createFolder } from "~/actions/folders.server";
import { createApiFromReq } from "~/lib/api.server";
import FolderIndex from "./folders-index";

const getParams = (params: Params) => {
  return parseParams(params, { gameId: z.string() });
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { api } = await createApiFromReq(request);
  const { gameId } = getParams(params);
  const folders = await api.folders.getGameFolders(gameId);
  return typedjson({ folders, gameId });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { api, userId } = await createApiFromReq(request);
  if (request.method === "POST") {
    return await createFolder(request, api, userId);
  }
  if (request.method === "PATCH") {
    const { name, parentFolderId, folderId } = await parseForm(request, {
      name: z.string(),
      parentFolderId: z.string().optional(),
      folderId: z.string(),
    });

    const result = await api.folders.updateFolder(folderId, { name, parentFolderId });
    return typedjson(result);
  }

  if (request.method === "DELETE") {
    const { entityId } = await parseForm(request, { entityId: z.string() });
    const result = await api.folders.deleteFolder(entityId);
    return typedjson(result);
  }
};

export { FolderIndex as default };
