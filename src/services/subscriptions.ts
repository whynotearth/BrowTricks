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

export interface Card {
  type: string;
  masked: string;
}

export interface Transaction {
  date: string;
  amount: number;
}

export default class SubscriptionService {
  async loadSubscriptionByTenant(tenantSlug: string): Promise<Subscription> {
    const response = await ajax.get('/api/v0/authentication/ping');

    return {
      id: 1,
      status: SubscriptionStatuses.Active,
      lastPaymentAmount: 100,
      lastPaymentDate: '20200726T00:00:00Z',
      renewsOnDate: '20200727T00:00:00Z',
      card: {
        type: 'Mastercard',
        masked: '***********5555'
      },
      transactions: []
    };
  }

  cancelSubscription(): void {
    console.log('cancel');
  }

  changePaymentMethod(): void {
    console.log('change');
  }

  addPaymentMethod(): void {
    console.log('add');
  }
}
