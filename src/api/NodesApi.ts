import i18n from "@/i18n";
import api from "@/lib/axios";
import type { Node } from "@/types";
import { isAxiosError } from "axios";

export const getParentNodes = async (): Promise<Node[]> => {
  try {
    const { data } = await api.get<Node[]>("/api/nodes");
    return data.filter((node) => node.parent === null);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || i18n.global.t("errors.fetch_parent"),
      );
    }
    throw error;
  }
};

export const getChildNodes = async (parentId: number): Promise<Node[]> => {
  try {
    const { data } = await api.get<Node[]>("/api/nodes", {
      params: { parent: parentId },
    });
    // Fallback client-side filtering in case json-server ignores params
    return data.filter((node) => node.parent === parentId);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || i18n.global.t("errors.fetch_children"),
      );
    }
    throw error;
  }
};

export const createNode = async (
  parentId: number | null,
  title: string,
): Promise<Node> => {
  try {
    const { data } = await api.post<Node>("/api/node", {
      parent: parentId,
      title,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || i18n.global.t("errors.create_node"),
      );
    }
    throw error;
  }
};

export const deleteNode = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/node/${id}`);
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.error ||
        (error.response?.statusText
          ? `${i18n.global.t("errors.delete_node")} (${error.response.statusText})`
          : i18n.global.t("errors.delete_node"));
      throw new Error(message);
    }
    throw error;
  }
};

export const countChildren = async (id: number): Promise<number> => {
  try {
    const { data } = await api.get<Node[]>(`/api/nodes?parent=${id}`);
    const filtered = data.filter((node) => node.parent === id);
    return filtered.length;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || i18n.global.t("errors.count_children"),
      );
    }
    throw error;
  }
};

export const hasChildren = async (id: number): Promise<boolean> => {
  const count = await countChildren(id);
  return count > 0;
};
