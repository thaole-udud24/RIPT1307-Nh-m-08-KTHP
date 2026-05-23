# Voucher Business Specification - Lunaria

---

# I. Business Overview

Lunaria promotion system is designed to support flexible marketing campaigns, control discount efficiency, and optimize customer shopping experience.

The system currently supports two main promotion types:

| Promotion Type | Description |
|---|---|
| Direct Product Discount | Product prices are discounted directly on website/app without requiring voucher input. Suitable for seasonal sales, clearance campaigns, or global discount events. |
| Voucher / Coupon | Customers must enter a voucher code during checkout to receive discounts. Suitable for campaign tracking and customer segmentation. |

---

# II. Business Objectives

The Voucher system allows Admin to:

- Create vouchers
- Manage voucher active time
- Restrict customer scope
- Configure flash sale / golden hour
- Apply voucher to specific products or entire system
- Track voucher status
- Validate voucher usability in cart

The system supports the following operations:

- Create voucher
- Save draft voucher
- Activate voucher
- Update voucher
- End voucher
- Validate voucher conditions

---

# III. Business Flow Analysis

---

# 1. Basic Voucher Information

This step defines voucher identity and target customers.

## Features

- Voucher name configuration
- Voucher code configuration
- Customer scope selection

---

## Business Rules

### VoucherCode Rules

- Must be unique
- No whitespace allowed
- No special characters
- No Vietnamese accented characters

---

## Customer Scope Types

| Value | Description |
|---|---|
| ALL_CUSTOMERS | Apply to all customers |
| NEW_CUSTOMERS | Apply only to first-time buyers |
| VIP_CUSTOMERS | Apply only to VIP customers |

---

# 2. Time Management Mechanism

The system supports flexible time configuration for flash sale campaigns or seasonal campaigns.

---

## Time Components

| Component | Description |
|---|---|
| StartDate | Voucher activation start date |
| EndDate | Voucher expiration date |
| GoldenHour | Daily usable time range |
| Repeat | Daily or weekly recurrence |

---

## Example Configuration

| Setting | Value |
|---|---|
| StartDate | 2026-08-01 |
| EndDate | 2026-08-31 |
| GoldenHour | 08:00 - 12:00 |
| Repeat | DAILY |

---

# Time Validation Rules

## Voucher Availability

Voucher is valid only when:

```text
CurrentDate >= StartDate
AND
CurrentDate <= EndDate
```

---

## Golden Hour Validation

Voucher can only be used during configured golden hour.

Example:

```text
08:00 - 12:00
```

Customer cannot use voucher outside this time range.

---

## Repeat Mechanism

Supported repeat types:

| Type | Description |
|---|---|
| DAILY | Repeat every day |
| WEEKLY | Repeat on selected weekdays |

---

# 3. Discount Mechanism and Scope

Voucher can be applied to:

| Scope Type | Description |
|---|---|
| ALL_PRODUCTS | Apply discount to all products |
| SPECIFIC_PRODUCTS | Apply discount only to configured products |

---

## Supported Discount Types

| Discount Type | Description |
|---|---|
| PERCENTAGE | Discount by percentage |
| FIXED_AMOUNT | Discount by fixed amount |

---

## Example

### Percentage Discount

```text
10% OFF
```

### Fixed Amount Discount

```text
50,000 VND OFF
```

---

# IV. Voucher Status Lifecycle

| Status | Description |
|---|---|
| DRAFT | Voucher saved but not activated |
| ACTIVE | Voucher currently usable |
| EXPIRED | Voucher expired |
| DISABLED | Voucher manually disabled |

---

# Voucher Lifecycle Flow

```text
DRAFT
  ↓
ACTIVE
  ↓
EXPIRED
```

or

```text
ACTIVE
  ↓
DISABLED
```

---

# V. Cart Validation Rules

The system validates voucher before checkout.

---

## Validation Conditions

### 1. Voucher Exists

Voucher code must exist in system.

---

### 2. Voucher Status

Voucher must be ACTIVE.

---

### 3. Time Validation

Current time must satisfy:

- StartDate
- EndDate
- GoldenHour

---

### 4. Customer Scope Validation

Customer must belong to configured target group.

---

### 5. Product Scope Validation

Cart products must match voucher scope.

---

# VI. Suggested Technical Design

---

# Suggested Voucher Entity

```ts
Voucher {
  id
  voucherCode
  voucherName

  status

  customerScope

  discountType
  discountValue

  applyScope

  startDate
  endDate

  goldenHourStart
  goldenHourEnd

  repeatType

  applicableProducts[]

  createdAt
  updatedAt
}
```

---

# Suggested Enums

## VoucherStatus

```ts
DRAFT
ACTIVE
EXPIRED
DISABLED
```

---

## CustomerScope

```ts
ALL_CUSTOMERS
NEW_CUSTOMERS
VIP_CUSTOMERS
```

---

## DiscountType

```ts
PERCENTAGE
FIXED_AMOUNT
```

---

## ApplyScope

```ts
ALL_PRODUCTS
SPECIFIC_PRODUCTS
```

---

## RepeatType

```ts
NONE
DAILY
WEEKLY
```

---

# VII. Suggested API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /admin/vouchers | Create voucher |
| PATCH | /admin/vouchers/:id | Update voucher |
| PATCH | /admin/vouchers/:id/activate | Activate voucher |
| PATCH | /admin/vouchers/:id/disable | Disable voucher |
| GET | /admin/vouchers | Get voucher list |
| POST | /vouchers/validate | Validate voucher in cart |

---

# VIII. Suggested Validation Rules

## Voucher Code Regex

```regex
^[A-Z0-9_]+$
```

---

## Voucher Code Example

Valid:

```text
SUMMER2026
VIP_SALE
FLASH50
```

Invalid:

```text
summer 2026
giảmgiá
SALE!!!
```

---

# IX. Recommended Architecture

Recommended architecture:

- NestJS Modular Architecture
- VoucherModule
- VoucherService
- VoucherController
- VoucherAdminController
- VoucherSchema
- DTO Validation
- MongoDB + Mongoose

---

#---

# XI. Calculation Formulas

---

# 1. Discount Price Formula

## Formula

```text
DiscountPrice = OriginalPrice - DiscountValue
```

---

## Example

| OriginalPrice | DiscountValue | DiscountPrice |
|---|---|---|
| 500,000 | 50,000 | 450,000 |

---

# 2. Discount Rate Formula

## Formula

:contentReference[oaicite:0]{index=0}

---

## Example

| OriginalPrice | DiscountValue | DiscountRate |
|---|---|---|
| 500,000 | 50,000 | 10% |

---

# XII. Voucher Status Management

The system automatically determines voucher status based on realtime conditions.

---

## Voucher Status Conditions

| Status | Condition |
|---|---|
| UPCOMING | CurrentTime < StartDate |
| ACTIVE | CurrentTime between StartDate and EndDate and inside GoldenHour (if configured) |
| ENDED | CurrentTime > EndDate or manually ended by Admin |

---

# Voucher Status Flow

```text
UPCOMING
   ↓
ACTIVE
   ↓
ENDED
```

---

# Automatic Status Logic

## UPCOMING

Voucher has not started yet.

```text
CurrentTime < StartDate
```

---

## ACTIVE

Voucher is currently usable.

Conditions:

```text
CurrentTime >= StartDate
AND
CurrentTime <= EndDate
```

If GoldenHour exists:

```text
CurrentTime inside GoldenHour
```

---

## ENDED

Voucher can no longer be used.

Conditions:

```text
CurrentTime > EndDate
```

or

```text
Admin manually ends campaign
```

---

# XIII. Cart Application Rules

---

# 1. Voucher Applied To Specific Products

Rules:

- Only configured products receive discount
- Other products are ignored
- Cart total recalculates based on eligible items

---

## Example

Voucher applies only to:

```text
Nike Shoes
Adidas Hoodie
```

Customer cart:

| Product | Eligible |
|---|---|
| Nike Shoes | YES |
| iPhone 16 | NO |

---

# 2. Voucher Applied To All Products

Voucher applies system-wide.

---

## Stackable Rules

The system may restrict stacking with direct product discounts.

---

## Stacking Conditions

| Condition | Result |
|---|---|
| Product already has direct discount | Voucher may not apply |
| Product has no direct discount | Voucher applies normally |

---

# Recommended Validation Logic

```ts
if (product.hasDirectDiscount) {
  rejectVoucher();
}
```

---

# XIV. Voucher Data Persistence Workflow

| Action | Description |
|---|---|
| Save Draft | Save voucher in inactive state |
| Apply | Activate voucher |
| End Campaign | Manually terminate voucher |

---

# Workflow Example

```text
Create Voucher
      ↓
Save Draft
      ↓
Activate Voucher
      ↓
Customer Uses Voucher
      ↓
Campaign Ends
```

---

# XV. Validation Rules

| No | Validation Rule | Description |
|---|---|---|
| 1 | Duplicate Voucher Code | VoucherCode must be unique |
| 2 | Invalid Date Range | EndDate must be greater than or equal to StartDate |
| 3 | Invalid Discount Value | DiscountValue cannot exceed original price |
| 4 | Empty Required Field | Required fields cannot be empty |
| 5 | Invalid Voucher Format | VoucherCode cannot contain special characters |

---

# Suggested Validation Logic

## Voucher Code Regex

```regex
^[A-Z0-9_]+$
```

---

## Date Validation

```ts
if (endDate < startDate) {
  throw new BadRequestException();
}
```

---

## Discount Validation

```ts
if (discountValue > originalPrice) {
  throw new BadRequestException();
}
```

---

# XVI. Exception Handling

| No | Exception Case | System Behavior |
|---|---|---|
| 1 | Duplicate VoucherCode | Show error message |
| 2 | Invalid Discount Value | Show warning |
| 3 | Expired Voucher | Reject voucher |
| 4 | Voucher Outside Golden Hour | Show unavailable time message |

---

# Suggested Error Messages

## Duplicate Voucher

```text
Voucher code already exists
```

---

## Invalid Date

```text
End date must be greater than start date
```

---

## Expired Voucher

```text
Voucher has expired
```

---

## Golden Hour Restriction

```text
Voucher is not available at this time
```

---

# XVII. Suggested Backend Modules

Recommended modules:

```text
voucher/
 ├── dto/
 ├── schemas/
 ├── voucher.controller.ts
 ├── voucher.admin.controller.ts
 ├── voucher.service.ts
 ├── voucher.module.ts
```

---

# Suggested DTOs

```text
create-voucher.dto.ts
update-voucher.dto.ts
validate-voucher.dto.ts
list-voucher.dto.ts
```

---

# Suggested MongoDB Collections

| Collection | Purpose |
|---|---|
| vouchers | Store voucher data |
| voucher_usages | Store voucher usage history |
| voucher_campaigns | Store campaign metadata |

---

# Suggested Future Enhancements

- Usage limit per voucher
- Usage limit per user
- Minimum order amount
- Membership tier voucher
- Auto best voucher selection
- Voucher analytics dashboard
- Referral voucher system
- AI-based promotion recommendation