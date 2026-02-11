import i18n from "@/i18n";
import api from "@/lib/axios";
import type { Node } from "@/types";
import { isAxiosError } from "axios";

export const getParentNodes = async (): Promise<Node[]> => {
  try {
    const { data } = await api.get<Node[]>("/nodes?parent=null");
    return data;
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
    const { data } = await api.get<Node[]>(`/nodes?parent=${parentId}`);
    return data;
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
    const { data } = await api.post<Node>("/nodes", {
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
    await api.delete(`/nodes/${id}`);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || i18n.global.t("errors.delete_node"),
      );
    }
    throw error;
  }
};

export const countChildren = async (id: number): Promise<number> => {
  try {
    const { data } = await api.get<Node[]>(`/nodes?parent=${id}`);
    return data.length;
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
