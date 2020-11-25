import { ajax } from '@/services/ajax';

export enum SubscriptionStatuses {
  Unknown = 0,
  Active,
  Cancelled
}

export interface Subscription {
  id: number;
  status: SubscriptionStatuses;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  renewsOnDate: string;
  card: Card;
  transactions: Transaction[];
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  terms: string;
}

export enum Brands {
  Unknown = 0,
  Amex,
  DinersClub,
  Discover,
  Jcb,
  Mastercard,
  Visa,
  UnionPay
}

export interface BillingDetails {
  name: string;
  address_line1: string;
  address_line2: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  address_country: string;
}

export interface Card {
  id: number;
  brand: Brands;
  last4: string;
  expirationMonth: number;
  expirationYear: number;
}

export interface Transaction {
  date: string;
  last4?: string;
  amount: number;
}

export interface Plan {
  id: number;
  name: number;
  price: number;
}

export default class SubscriptionService {
  async getPlans(domain: string): Promise<Plan[]> {
    const response = await ajax.get<Plan[]>(
      `/api/v0/subscriptions/domain/${domain}`
    );
    return response.data;
  }

  async createSubscirption(
    tenantSlug: string,
    subscriptionId: number,
    couponCode: string
  ) {
    const response = await ajax.post(
      `/api/v0/tenant/${tenantSlug}/subscriptions/`,
      {
        subscriptionId: subscriptionId,
        couponCode: couponCode
      }
    );
  }

  async loadSubscriptionByTenant(tenantSlug: string): Promise<Subscription> {
    const response = await ajax.get(
      `/api/v0/tenant/${tenantSlug}/subscriptions/`
    );
    const transactions = await ajax.get(
      `/api/v0/tenant/${tenantSlug}/subscriptions/payments`
    );
    return {
      ...response.data,
      transactions: transactions.data
    };
  }

  async loadPaymentMethodsByTenant(tenantSlug: string): Promise<Card[]> {
    const response = await ajax.get(
      `/api/v0/tenant/${tenantSlug}/paymentmethods`
    );

    return response.data;
  }

  async cancelSubscription(tenantSlug: string): Promise<void> {
    const response = await ajax.post(
      `/api/v0/tenant/${tenantSlug}/subscriptions/cancel1`
    );
  }

  async changePaymentMethod(tenantSlug: string, cardId: number): Promise<void> {
    await ajax.post(
      `/api/v0/tenant/${tenantSlug}/subscriptions/changepaymentmethod`,
      { cardId: cardId }
    );
  }

  async addPaymentMethod(tenantSlug: string, token: string): Promise<void> {
    await ajax.post(`/api/v0/tenant/${tenantSlug}/paymentmethods/`, {
      token: token
    });
  }

  async getPublishableKey(tenantSlug: string): Promise<string> {
    const response = await ajax.get(
      `/api/v0/tenant/${tenantSlug}/paymentmethods/stripe`
    );
    return response.data.publishableKey;
  }
}
