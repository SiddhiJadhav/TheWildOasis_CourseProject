import { useQuery } from '@tanstack/react-query';
import { getSettings, updateSetting } from '../../services/apiSettings';

export function useSettings() {
  const {
    isPending,
    error,
    data: settings,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { isPending, error, settings };
}
