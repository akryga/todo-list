// Uncomment these imports to begin using these cool features!

import {
  initModels,
  todo
} from "../models/init-models";

import {inject} from '@loopback/core';
import {
  get,
  getModelSchemaRef
} from '@loopback/rest';
import {MydbDataSource} from '../datasources';


export class TodoController {

  // ds: MydbDataSource;

  constructor(@inject('datasources.mydb') dataSource: MydbDataSource) {

    initModels(dataSource.getSequelize());
  }

  @get('/todos', {
    responses: {
      '200': {
        description: 'Array of Todo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(todo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(): Promise<todo[]> {
    return todo.findAll();
  }
}
