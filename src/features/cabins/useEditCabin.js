import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertOrEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => insertOrEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin Edited Successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      //reset();
    },
    onError: () => [toast.error('Something went Wrong!')],
  });

  return { isEditing, editCabin };
}
