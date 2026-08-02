# Role and capability matrix

The typed capability list in the authorization domain is the sole runtime
source of truth. This document makes the intended grants reviewable. All
unlisted or unsupported combinations are denied.

Legend: **Allow** grants the capability when every lifecycle, assurance, and
scope check passes. **Deny** is explicit deny-by-default.

## Customer-account roles

All grants are limited to the customer account on the active membership and the
resource. `OWNER` and `ADMIN` are equivalent for the currently defined list;
future ownership-sensitive operations require a separate decision.

| Capability                      | OWNER | ADMIN | MEMBER | VIEWER |
| ------------------------------- | ----- | ----- | ------ | ------ |
| `account.profile.read`          | Allow | Allow | Allow  | Allow  |
| `account.profile.update`        | Allow | Allow | Deny   | Deny   |
| `order.read`                    | Allow | Allow | Allow  | Allow  |
| `order.repeat`                  | Allow | Allow | Allow  | Deny   |
| `order.claim.request`           | Allow | Allow | Allow  | Deny   |
| `subscription.read`             | Allow | Allow | Allow  | Allow  |
| `subscription.fragrance.change` | Allow | Allow | Allow  | Deny   |
| `subscription.address.update`   | Allow | Allow | Allow  | Deny   |
| `shipment.read`                 | Allow | Allow | Allow  | Allow  |
| `product.purchase`              | Allow | Allow | Allow  | Deny   |
| `support.request.create`        | Allow | Allow | Allow  | Deny   |

An anonymous guest may request `order.claim.request` without receiving order
existence, order data, account scope, or access. That public workflow is
separate from a membership grant.

## Staff roles

Every staff grant also requires an active user and `MFA` assurance.
`BUSINESS_OWNER` has commercial and operational authority but no automatic
technical authority. `TECHNICAL_ADMIN` has only the three technical
capabilities.

| Capability                    | BUSINESS_OWNER | OPERATIONS_ADMIN | TECHNICAL_ADMIN |
| ----------------------------- | -------------- | ---------------- | --------------- |
| `catalog.read`                | Allow          | Allow            | Deny            |
| `catalog.draft.write`         | Allow          | Allow            | Deny            |
| `catalog.publish`             | Allow          | Deny             | Deny            |
| `pricing.read`                | Allow          | Allow            | Deny            |
| `pricing.publish`             | Allow          | Deny             | Deny            |
| `promotion.draft.write`       | Allow          | Allow            | Deny            |
| `promotion.publish`           | Allow          | Deny             | Deny            |
| `order.read.all`              | Allow          | Allow            | Deny            |
| `order.update`                | Allow          | Allow            | Deny            |
| `tracking.update`             | Allow          | Allow            | Deny            |
| `customer.read`               | Allow          | Allow            | Deny            |
| `customer.export.request`     | Allow          | Allow            | Deny            |
| `customer.export.approve`     | Allow          | Deny             | Deny            |
| `subscription.read.all`       | Allow          | Allow            | Deny            |
| `subscription.operate`        | Allow          | Allow            | Deny            |
| `subscription.cancel.request` | Allow          | Allow            | Deny            |
| `subscription.cancel.approve` | Allow          | Deny             | Deny            |
| `refund.request`              | Allow          | Allow            | Deny            |
| `refund.approve`              | Allow          | Deny             | Deny            |
| `inventory.read`              | Allow          | Allow            | Deny            |
| `inventory.adjust`            | Allow          | Allow            | Deny            |
| `fragrance.change`            | Allow          | Allow            | Deny            |
| `address.update`              | Allow          | Allow            | Deny            |
| `technical.configure`         | Deny           | Deny             | Allow           |
| `technical.deploy`            | Deny           | Deny             | Allow           |
| `technical.diagnose`          | Deny           | Deny             | Allow           |

## Separation guarantees

- Provider claims never supply these roles or grants.
- Customer roles do not imply a staff role.
- Staff roles do not create customer-account membership.
- `OPERATIONS_ADMIN` may prepare or request reserved actions but cannot publish
  or approve them.
- `TECHNICAL_ADMIN` cannot read customers, export data, publish commercial
  content, approve economic actions, or operate the business.
- No role bypasses user lifecycle, MFA, account isolation, or audit controls.
