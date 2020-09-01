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

export interface Card {
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

export default class SubscriptionService {
  async loadSubscriptionByTenant(tenantSlug: string): Promise<Subscription> {
    const response = await ajax.get('/api/v0/authentication/ping');

    return {
      id: 1,
      status: SubscriptionStatuses.Active,
      lastPaymentAmount: 100,
      lastPaymentDate: '20200726T000000',
      renewsOnDate: '20200727T000000',
      card: {
        brand: Brands.Mastercard,
        last4: "5555",
        expirationMonth: 12,
        expirationYear: 30
      },
      transactions: [
        {
          date: "20200726T000000",
          amount: 100,
          last4: "5555"
        },
        {
          date: "20200626T000000",
          amount: 100,
          last4: "5555"
        }
      ]
    };
  }

  async loadPaymentMethodsByTenant(tenantSlug: string): Promise<Card[]> {
    const response = await ajax.get('/api/v0/authentication/ping');

    return [
      {
        brand: Brands.Mastercard,
        last4: "5555",
        expirationMonth: 12,
        expirationYear: 30
      },
      {
        brand: Brands.Amex,
        last4: "7657",
        expirationMonth: 4,
        expirationYear: 23
      }
    ]
  }

  cancelSubscription(tenantSlug: string): void {
    console.log('cancel');
  }

  changePaymentMethod(last4: string): void {
    console.log(`changed to ${last4}`);
  }

  addPaymentMethod(): void {
    console.log('add');
  }
}
