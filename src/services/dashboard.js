import { request } from '@umijs/max';

export async function fetchConsumptionDuration() {
  return request(
    '/analysis/api/room-timesget/getTotalSummaryDetailsByClientId?clientId=466',
  );
}
