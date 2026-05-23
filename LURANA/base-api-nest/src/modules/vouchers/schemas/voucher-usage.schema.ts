import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'voucher_usages' })
export class VoucherUsage {
  @Prop({ type: Types.ObjectId, ref: 'Voucher', required: true })
  voucherId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  orderId!: string;

  @Prop({ type: Number, default: 0 })
  discountApplied!: number;

  @Prop({ type: [Types.ObjectId], ref: 'Product', default: [] })
  productIds!: Types.ObjectId[];
}

export type VoucherUsageDocument = VoucherUsage & Document;
export const VoucherUsageSchema = SchemaFactory.createForClass(VoucherUsage);
