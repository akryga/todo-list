import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { category, categoryId } from './category';
import type { todo, todoId } from './todo';
import type { user_has_category, user_has_categoryId } from './user_has_category';

export interface userAttributes {
  username: string;
  email?: string;
  password: string;
  create_time?: Date;
}

export type userPk = "username";
export type userId = user[userPk];
export type userOptionalAttributes = "email" | "create_time";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  username!: string;
  email?: string;
  password!: string;
  create_time?: Date;

  // user belongsToMany category via user_username and category_category_id
  category_category_id_categories!: category[];
  getCategory_category_id_categories!: Sequelize.BelongsToManyGetAssociationsMixin<category>;
  setCategory_category_id_categories!: Sequelize.BelongsToManySetAssociationsMixin<category, categoryId>;
  addCategory_category_id_category!: Sequelize.BelongsToManyAddAssociationMixin<category, categoryId>;
  addCategory_category_id_categories!: Sequelize.BelongsToManyAddAssociationsMixin<category, categoryId>;
  createCategory_category_id_category!: Sequelize.BelongsToManyCreateAssociationMixin<category>;
  removeCategory_category_id_category!: Sequelize.BelongsToManyRemoveAssociationMixin<category, categoryId>;
  removeCategory_category_id_categories!: Sequelize.BelongsToManyRemoveAssociationsMixin<category, categoryId>;
  hasCategory_category_id_category!: Sequelize.BelongsToManyHasAssociationMixin<category, categoryId>;
  hasCategory_category_id_categories!: Sequelize.BelongsToManyHasAssociationsMixin<category, categoryId>;
  countCategory_category_id_categories!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany todo via user_username
  todos!: todo[];
  getTodos!: Sequelize.HasManyGetAssociationsMixin<todo>;
  setTodos!: Sequelize.HasManySetAssociationsMixin<todo, todoId>;
  addTodo!: Sequelize.HasManyAddAssociationMixin<todo, todoId>;
  addTodos!: Sequelize.HasManyAddAssociationsMixin<todo, todoId>;
  createTodo!: Sequelize.HasManyCreateAssociationMixin<todo>;
  removeTodo!: Sequelize.HasManyRemoveAssociationMixin<todo, todoId>;
  removeTodos!: Sequelize.HasManyRemoveAssociationsMixin<todo, todoId>;
  hasTodo!: Sequelize.HasManyHasAssociationMixin<todo, todoId>;
  hasTodos!: Sequelize.HasManyHasAssociationsMixin<todo, todoId>;
  countTodos!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany user_has_category via user_username
  user_has_categories!: user_has_category[];
  getUser_has_categories!: Sequelize.HasManyGetAssociationsMixin<user_has_category>;
  setUser_has_categories!: Sequelize.HasManySetAssociationsMixin<user_has_category, user_has_categoryId>;
  addUser_has_category!: Sequelize.HasManyAddAssociationMixin<user_has_category, user_has_categoryId>;
  addUser_has_categories!: Sequelize.HasManyAddAssociationsMixin<user_has_category, user_has_categoryId>;
  createUser_has_category!: Sequelize.HasManyCreateAssociationMixin<user_has_category>;
  removeUser_has_category!: Sequelize.HasManyRemoveAssociationMixin<user_has_category, user_has_categoryId>;
  removeUser_has_categories!: Sequelize.HasManyRemoveAssociationsMixin<user_has_category, user_has_categoryId>;
  hasUser_has_category!: Sequelize.HasManyHasAssociationMixin<user_has_category, user_has_categoryId>;
  hasUser_has_categories!: Sequelize.HasManyHasAssociationsMixin<user_has_category, user_has_categoryId>;
  countUser_has_categories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  }
}
