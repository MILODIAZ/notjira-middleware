export enum RabbitMQ {
  AuthorizationQueue = 'authorization',
  ManagementQueue = 'management',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  JWT = 'UPDATE_JWT',
}

export enum TeamMSG {
  CREATE = 'CREATE_TEAM',
  FIND_ALL = 'FIND_TEAMS',
  FIND_ONE = 'FIND_TEAM',
  UPDATE = 'UPDATE_TEAM',
  DELETE = 'DELETE_TEAM',
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
}

export enum ProjectMSG {
  CREATE = 'CREATE_PROJECT',
  FIND_ALL = 'FIND_PROJECTS',
  FIND_ONE = 'FIND_PROJECT',
  UPDATE = 'UPDATE_PROJECT',
  DELETE = 'DELETE_PROJECT',
}

export enum TaskMSG {
  CREATE = 'CREATE_TASK',
  FIND_ALL = 'FIND_TASKS',
  FIND_ONE = 'FIND_TASK',
  UPDATE = 'UPDATE_TASK',
  DELETE = 'DELETE_TASK',
}
