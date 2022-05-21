/*
  - Model é a representação do objeto que trafega entre o banco e a aplicação.
  - Schema é a representação da tabela em si.
*/

import { tableSchema } from '@nozbe/watermelondb/Schema'

export const userSchema = tableSchema({
  name: 'users',
  columns: [
    { name: 'user_id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'driver_license', type: 'string' },
    { name: 'avatar', type: 'string' },
    { name: 'token', type: 'string' }
  ]
})