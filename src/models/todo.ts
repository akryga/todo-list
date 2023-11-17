import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface todoAttributes {
  id: number;
  title: string;
  desc?: string;
  isComplete?: number;
  user_username: string;
}

export type todoPk = "id" | "user_username";
export type todoId = todo[todoPk];
export type todoOptionalAttributes = "desc" | "isComplete";
export type todoCreationAttributes = Optional<todoAttributes, todoOptionalAttributes>;

export class todo extends Model<todoAttributes, todoCreationAttributes> implements todoAttributes {
  id!: number;
  title!: string;
  desc?: string;
  isComplete?: number;
  user_username!: string;

  // todo belongsTo user via user_username
  user_username_user!: user;
  getUser_username_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser_username_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser_username_user!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof todo {
    return todo.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isComplete: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    user_username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'username'
      }
    }
  }, {
    sequelize,
    tableName: 'todo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "user_username" },
        ]
      },
      {
        name: "fk_todo_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_username" },
        ]
      },
    ]
  });
  }
}
