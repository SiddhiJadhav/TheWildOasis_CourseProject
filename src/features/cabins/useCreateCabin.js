import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertOrEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: insertOrEditCabin,
    onSuccess: () => {
      toast.success('New Cabin Added Successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      //reset();
    },
    onError: () => [toast.error('Something went Wrong!')],
  });

  return { isCreating, createCabin };
}
