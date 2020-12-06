// todo: cleanup
import { ajax } from '@/services/ajax';

/*

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
  price: number;
  features: string[];
  terms: string;
}

export interface Coupon {
  code: string;
  discount: number;
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
*/

export const SubscriptionStatuses = {
  Unknown: 0,
  Active: 1,
  Cancelled: 2
};

export const Brands = {
  Unknown: 0,
  Amex: 1,
  DinersClub: 2,
  Discover: 3,
  Jcb: 4,
  Mastercard: 5,
  Visa: 6,
  UnionPay: 7
};

export default class SubscriptionService {
  async getPlans(domain) {
    const response = await ajax.get(`/api/v0/subscriptions/domain/${domain}`);
    return response.data;
  }

  async validateCoupon(domain, couponCode) {
    const response = await ajax.post(
      `/api/v0/subscriptions/domain/${domain}/validateCoupon`,
      {
        couponCode: couponCode
      }
    );
    return response.data;
  }

  async createSubscirption(tenantSlug, subscriptionId, couponCode) {
    return await ajax.post(`/api/v0/tenant/${tenantSlug}/subscriptions/`, {
      subscriptionId: subscriptionId,
      couponCode: couponCode
    });
  }

  async loadSubscriptionByTenant(tenantSlug) {
    const response = await ajax.get(
      `/api/v0/tenant/${tenantSlug}/subscriptions`
    );
    const transactions = await ajax.get(
      `/api/v0/tenant/${tenantSlug}/subscriptions/payments`
    );
    return {
      ...response.data,
      transactions: transactions.data
    };
  }

  async loadPaymentMethodsByTenant(tenantSlug) {
    const response = await ajax.get(
      `/api/v0/tenant/${tenantSlug}/paymentmethods`
    );

    return response.data;
  }

  async cancelSubscription(tenantSlug) {
    return ajax.post(`/api/v0/tenant/${tenantSlug}/subscriptions/cancel1`);
  }

  async changePaymentMethod(tenantSlug, cardId) {
    await ajax.post(
      `/api/v0/tenant/${tenantSlug}/subscriptions/changepaymentmethod`,
      { cardId: cardId }
    );
  }

  async addPaymentMethod(tenantSlug, token) {
    await ajax.post(`/api/v0/tenant/${tenantSlug}/paymentmethods/`, {
      token: token
    });
  }

  async getPublishableKey(tenantSlug) {
    const response = await ajax.get(
      `/api/v0/tenant/${tenantSlug}/paymentmethods/stripe`
    );
    return response.data.publishableKey;
  }
}
