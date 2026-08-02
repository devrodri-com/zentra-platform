import type { CustomerAccount } from "../domain/customer-account";
import type { CustomerAccountId } from "../domain/identifiers";

export interface CustomerAccountReader {
  findCustomerAccountById(customerAccountId: CustomerAccountId): Promise<CustomerAccount | null>;
}
