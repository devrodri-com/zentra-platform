import type { OrderClaimId } from "../domain/identifiers";
import type { OrderAccountClaim } from "../domain/order-claim";

export interface OrderClaimRepository {
  findOrderClaimById(orderClaimId: OrderClaimId): Promise<OrderAccountClaim | null>;
  saveOrderClaim(claim: OrderAccountClaim, expectedVersion: number): Promise<void>;
}
