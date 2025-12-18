import { CategoryType } from "./enums.js";

export class CategoryGroup {
  constructor({ id, user_id, name, type, color }) {
    this.id = id;
    this.userId = user_id;
    this.name = name;
    this.type =
      type.toUpperCase() in CategoryType ? type : CategoryType.EXPENSE;
    this.color = color;
  }
}

export class Category {
  constructor({
    id,
    category_group_id,
    name,
    exclude_from_overview = false,
    color,
  }) {
    this.id = id;
    this.categoryGroupId = category_group_id;
    this.iconId = icon_id;
    this.name = name;
    this.excludeFromOverview = exclude_from_overview;
    this.color = color;
  }
}
