import type { Sequelize } from "sequelize";
import { category as _category } from "./category";
import type { categoryAttributes, categoryCreationAttributes } from "./category";
import { todo as _todo } from "./todo";
import type { todoAttributes, todoCreationAttributes } from "./todo";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";
import { user_has_category as _user_has_category } from "./user_has_category";
import type { user_has_categoryAttributes, user_has_categoryCreationAttributes } from "./user_has_category";

export {
  _category as category,
  _todo as todo,
  _user as user,
  _user_has_category as user_has_category,
};

export type {
  categoryAttributes,
  categoryCreationAttributes,
  todoAttributes,
  todoCreationAttributes,
  userAttributes,
  userCreationAttributes,
  user_has_categoryAttributes,
  user_has_categoryCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const category = _category.initModel(sequelize);
  const todo = _todo.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const user_has_category = _user_has_category.initModel(sequelize);

  category.belongsToMany(user, { as: 'user_username_users', through: user_has_category, foreignKey: "category_category_id", otherKey: "user_username" });
  user.belongsToMany(category, { as: 'category_category_id_categories', through: user_has_category, foreignKey: "user_username", otherKey: "category_category_id" });
  user_has_category.belongsTo(category, { as: "category_category", foreignKey: "category_category_id"});
  category.hasMany(user_has_category, { as: "user_has_categories", foreignKey: "category_category_id"});
  todo.belongsTo(user, { as: "user_username_user", foreignKey: "user_username"});
  user.hasMany(todo, { as: "todos", foreignKey: "user_username"});
  user_has_category.belongsTo(user, { as: "user_username_user", foreignKey: "user_username"});
  user.hasMany(user_has_category, { as: "user_has_categories", foreignKey: "user_username"});

  return {
    category: category,
    todo: todo,
    user: user,
    user_has_category: user_has_category,
  };
}
