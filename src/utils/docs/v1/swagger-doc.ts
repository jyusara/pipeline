import { boolean, number } from 'joi';
import { HOST, SWAGGER_SCHEMA } from '../../../config';

export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'API shopimax',
    description: 'API Documentation'
  },
  host: HOST,
  basePath: '/api/v1',
  schemes: [SWAGGER_SCHEMA],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/orders/{id}': {
      get: {
        summary: 'Obtener un pedido por ID',
        tags: ['Order'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del pedido'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Order'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      }
    },
    '/agents/{id}': {
      get: {
        summary: 'Obtener un agente por ID',
        tags: ['Agent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del agente'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Agent'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      },
      put: {
        summary: 'Actualizar un agente por ID',
        tags: ['Agent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del agente'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/UpdateAgentRequestDto'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Agent'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      }
    },
    '/agents': {
      get: {
        summary: 'Obtener todos los agentes',
        tags: ['Agent'],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/Agent'
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      }
    },
    '/agents/create': {
      post: {
        summary: 'Crear un nuevo agente',
        tags: ['Agent'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/CreateAgentRequestDto'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Agent'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '409': {
            description: 'Already Register',
            schema: {
              $ref: '#/definitions/AlreadyRegisterError'
            }
          }
        }
      }
    },
    '/storage/{id}': {
      get: {
        summary: 'Obtener un almacenamiento por ID',
        tags: ['Storage'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del almacenamiento'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Storage'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      },
      delete: {
        summary: 'Eliminar un almacenamiento por ID',
        tags: ['Storage'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del almacenamiento'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              $ref: '#/definitions/DeleteResponseSuccess'
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      },
      put: {
        summary: 'Actualizar un almacenamiento por ID',
        tags: ['Storage'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID del almacenamiento'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/UpdateStorageRequestDto'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Storage'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '404': {
            description: 'Not Found',
            schema: {
              $ref: '#/definitions/NotFoundError'
            }
          }
        }
      }
    },
    '/storages': {
      get: {
        summary: 'Obtener todos los almacenamientos',
        tags: ['Storage'],
        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,
            type: 'number',
            description: 'Límite de resultados'
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            type: 'number',
            description: 'Número de página'
          }
        ],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/GetStoragesResponse'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          }
        }
      }
    },
    '/storage/create': {
      post: {
        summary: 'Crear un nuevo almacenamiento',
        tags: ['Storage'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/CreateStorageRequestDto'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Ok',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean'
                },
                result: {
                  $ref: '#/definitions/Storage'
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/BadRequest'
            }
          },
          '409': {
            description: 'Already Register',
            schema: {
              $ref: '#/definitions/AlreadyRegisterError'
            }
          }
        }
      }
    }
  },
  definitions: {
    OrderDetail: {
      type: 'object',
      properties: {
        orderDetailId: {
          type: 'string'
        },
        productName: {
          type: 'string'
        },
        productPrice: {
          type: 'number'
        },
        externalProductId: {
          type: 'string'
        },
        sku: {
          type: 'string'
        },
        quantity: {
          type: 'number'
        }
      }
    },
    Order: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        orderNumber: {
          type: 'string'
        },
        storeName: {
          type: 'string'
        },
        agency: {
          type: 'string'
        },
        agent: {
          type: 'string'
        },
        client: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            lastname: {
              type: 'string'
            },
            documentNumber: {
              type: 'string'
            },
            phone: {
              type: 'string'
            },
            country: {
              type: 'string'
            },
            department: {
              type: 'string'
            },
            province: {
              type: 'string'
            },
            address: {
              type: 'string'
            },
            reference: {
              type: 'string'
            },
            email: {
              type: 'string'
            }
          }
        },
        agencyCost: {
          type: 'number'
        },
        advancePayment: {
          type: 'number'
        },
        pendingPayment: {
          type: 'number'
        },
        subtotal: {
          type: 'number'
        },
        discount: {
          type: 'number'
        },
        total: {
          type: 'number'
        },
        orderDetail: {
          type: 'array',
          items: {
            $ref: '#/definitions/OrderDetail'
          }
        },
        deliveryType: {
          type: 'string'
        },
        paymentMethod: {
          type: 'string'
        },
        observation: {
          type: 'string'
        },
        contactedStatus: {
          type: 'string'
        },
        registerStatus: {
          type: 'string'
        },
        status: {
          type: 'string'
        },
        comment: {
          type: 'string'
        },
        creationDate: {
          type: 'string'
        },
        updateDate: {
          type: 'string'
        }
      }
    },
    Agent: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        lastname: {
          type: 'string'
        },
        startWorkingTime: {
          type: 'string'
        },
        endWorkingTime: {
          type: 'string'
        },
        address: {
          type: 'string'
        },
        documentNumber: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        role: {
          type: 'string'
        },
        status: {
          type: boolean
        },
        registreStatus: {
          type: 'string'
        },
        assigned: {
          type: boolean
        }
      }
    },
    Storage: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        address: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        capacity: {
          type: 'string'
        },
        status: {
          type: 'string'
        },
        creationDate: {
          type: 'string'
        },
        updateDate: {
          type: 'string'
        }
      }
    },
    SuccessResponse: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean'
        },
        result: {
          type: 'object'
        }
      }
    },
    BadRequest: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        error: {
          type: 'string'
        },
        statusCode: {
          type: 'number',
          example: 400
        },
        type: {
          type: 'string',
          example: '<<Action>>BadRequestError'
        }
      }
    },
    NotFoundError: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        error: {
          type: 'string',
          example: '<<Model>> not found'
        },
        statusCode: {
          type: 'number',
          example: 404
        },
        type: {
          type: 'string',
          example: '<<Action>><<Model>>NotFoundError'
        }
      }
    },
    AlreadyRegisterError: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        error: {
          type: 'string',
          example: '<<Model>> already registered'
        },
        statusCode: {
          type: 'number',
          example: 409
        },
        type: {
          type: 'string',
          example: '<<Model>>AlreadyRegisteredError'
        }
      }
    },
    CreateAgentRequestDto: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Juan'
        },
        lastname: {
          type: 'string',
          example: 'Perez'
        },
        startWorkingTime: {
          type: 'string',
          example: '08:00'
        },
        endWorkingTime: {
          type: 'string',
          example: '18:00'
        },
        address: {
          type: 'string',
          example: 'Av. Los Incas 123'
        },
        documentNumber: {
          type: 'string',
          example: '63846509'
        },
        email: {
          type: 'string',
          example: 'juanperez@mail.com'
        },
        phone: {
          type: 'string',
          example: '987654321'
        },
        role: {
          type: 'string',
          example: 'asesor'
        },
        status: {
          type: boolean,
          example: true
        },
        assigned: {
          type: boolean,
          example: true
        },
        registreStatus: {
          type: 'string',
          example: 'active'
        }
      }
    },
    UpdateAgentRequestDto: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Juan'
        },
        lastname: {
          type: 'string',
          example: 'Perez'
        },
        documentNumber: {
          type: 'string',
          example: '63846509'
        },
        email: {
          type: 'string',
          example: 'juanperez@mail.com'
        },
        phone: {
          type: 'string',
          example: '987654321'
        }
      }
    },
    UpdateStorageRequestDto: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'active'
        }
      }
    },
    GetStoragesResponse: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: '#/definitions/Storage'
          }
        },
        page: {
          type: 'number',
          example: 1
        },
        limit: {
          type: 'number',
          example: 10
        },
        totalRecords: {
          type: 'number',
          example: 1
        },
        totalPages: {
          type: 'number',
          example: 1
        }
      }
    },
    DeleteResponseSuccess: {
      type: 'object',
      properties: {
        success: {
          type: boolean,
          example: true
        },
        result: {
          message: {
            type: 'string',
            example: '<<Model>> deleted successfully'
          }
        }
      }
    },
    CreateStorageRequestDto: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Almacen 1'
        },
        address: {
          type: 'string',
          example: 'Av. Los Incas 123'
        },
        phone: {
          type: 'string',
          example: '987654321'
        },
        capacity: {
          type: 'string',
          example: '1000'
        },
        status: {
          type: 'string',
          example: 'inactive'
        },
        email: {
          type: 'string',
          example: 'test3@email.com'
        }
      }
    }
  }
};
