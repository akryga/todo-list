import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';
import type { user_has_category, user_has_categoryId } from './user_has_category';

export interface categoryAttributes {
  category_id: number;
  name: string;
  descr?: string;
}

export type categoryPk = "category_id";
export type categoryId = category[categoryPk];
export type categoryOptionalAttributes = "category_id" | "descr";
export type categoryCreationAttributes = Optional<categoryAttributes, categoryOptionalAttributes>;

export class category extends Model<categoryAttributes, categoryCreationAttributes> implements categoryAttributes {
  category_id!: number;
  name!: string;
  descr?: string;

  // category belongsToMany user via category_category_id and user_username
  user_username_users!: user[];
  getUser_username_users!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUser_username_users!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUser_username_user!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUser_username_users!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUser_username_user!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUser_username_user!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUser_username_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUser_username_user!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUser_username_users!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUser_username_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // category hasMany user_has_category via category_category_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof category {
    return category.init({
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descr: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
