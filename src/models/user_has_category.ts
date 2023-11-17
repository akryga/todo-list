import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { category, categoryId } from './category';
import type { user, userId } from './user';

export interface user_has_categoryAttributes {
  user_username: string;
  category_category_id: number;
}

export type user_has_categoryPk = "user_username" | "category_category_id";
export type user_has_categoryId = user_has_category[user_has_categoryPk];
export type user_has_categoryCreationAttributes = user_has_categoryAttributes;

export class user_has_category extends Model<user_has_categoryAttributes, user_has_categoryCreationAttributes> implements user_has_categoryAttributes {
  user_username!: string;
  category_category_id!: number;

  // user_has_category belongsTo category via category_category_id
  category_category!: category;
  getCategory_category!: Sequelize.BelongsToGetAssociationMixin<category>;
  setCategory_category!: Sequelize.BelongsToSetAssociationMixin<category, categoryId>;
  createCategory_category!: Sequelize.BelongsToCreateAssociationMixin<category>;
  // user_has_category belongsTo user via user_username
  user_username_user!: user;
  getUser_username_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser_username_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser_username_user!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_has_category {
    return user_has_category.init({
    user_username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    category_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category',
        key: 'category_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_has_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_username" },
          { name: "category_category_id" },
        ]
      },
      {
        name: "fk_user_has_category_category1_idx",
        using: "BTREE",
        fields: [
          { name: "category_category_id" },
        ]
      },
      {
        name: "fk_user_has_category_user_idx",
        using: "BTREE",
        fields: [
          { name: "user_username" },
        ]
      },
    ]
  });
  }
}
