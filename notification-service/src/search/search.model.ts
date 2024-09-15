
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SearchDocument = Search & Document ;

@Schema()
export class Search {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const SearchSchema = SchemaFactory.createForClass(Search);
