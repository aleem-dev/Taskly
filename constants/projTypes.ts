export type ShoppingListItemType = {
  id: string;
  name: string;
  createdAtTimestamp ?: number,
  completedAtTimestamp?: number;
  deletedAtTimestamp?: number;
  lastUpdatedTimestamp?: number;
  eventType: "created" | "completed" | "deleted" | "incomplete" | "overdue",
  buff?: string
}