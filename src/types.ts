export type Customer = {
  name: string,
  document: number,
}

export type Product = {
  id: string,
  amount: number,
}

export type Address = {
  zip_code: number,
  house_number: number,
  street: string,
  neighborhood: string,
  city: string,
  uf: string,
  complement: string,
  reference: string,
}

export type OrderParams = {
  customer: Customer,
  items: Product[],
  address: Address,
}

// table.string('productId').unsigned().notNullable();
// table.string('customerDocument').unsigned().notNullable();
// table.integer('amount')

export type Queue = 'order' | 'email';

export type LogLevel = 'info' | 'warning' | 'error' | 'verbose' | 'debug';

export type LogText = {
  type: LogLevel,
  message: string,
  label: string,
  time: Date,
}
