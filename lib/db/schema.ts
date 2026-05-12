import { pgTable, text, timestamp, real } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const krevusEnquiries = pgTable('krevus_enquiries', {
  id:              text('id').primaryKey().$defaultFn(() => createId()),
  name:            text('name').notNull(),
  company:         text('company').notNull(),
  email:           text('email').notNull(),
  industry:        text('industry').notNull(),
  serviceInterest: text('service_interest').notNull(),
  message:         text('message').notNull(),
  howFound:        text('how_found'),
  createdAt:       timestamp('created_at').defaultNow().notNull(),
  status:          text('status').default('new').notNull(),
  notes:           text('notes'),
})

export const briqlyEnquiries = pgTable('briqly_enquiries', {
  id:           text('id').primaryKey().$defaultFn(() => createId()),
  name:         text('name').notNull(),
  businessName: text('business_name').notNull(),
  businessType: text('business_type').notNull(),
  phone:        text('phone').notNull(),
  email:        text('email').notNull(),
  service:      text('service').notNull(),
  message:      text('message'),
  createdAt:    timestamp('created_at').defaultNow().notNull(),
  status:       text('status').default('new').notNull(),
  packageSold:  text('package_sold'),
  dealValue:    real('deal_value'),
})

export type NewKrevusEnquiry = typeof krevusEnquiries.$inferInsert
export type NewBriqlyEnquiry = typeof briqlyEnquiries.$inferInsert
