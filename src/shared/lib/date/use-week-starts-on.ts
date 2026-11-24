import { useAboutMe } from '@/shared/api/queries/auth';
import { DEFAULT_WEEK_STARTS_ON, isWeekStartsOn, type WeekStartsOn } from './week-starts-on';

export const useWeekStartsOn = (): WeekStartsOn => {
  const { data: me } = useAboutMe();
  const fromApi = me?.data?.weekStartsOn;

  if (fromApi !== undefined && isWeekStartsOn(fromApi)) {
    return fromApi;
  }

  return DEFAULT_WEEK_STARTS_ON;
};