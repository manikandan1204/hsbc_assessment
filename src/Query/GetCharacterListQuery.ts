import { useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query'
import { fetchCharacterList } from '../Services/CharacterListService'

export const getCharacterListQuery = (page: number):any => {
    const queryClient = useQueryClient();
      return  useQuery({
            queryKey: ['characterList', page],
            queryFn: () => fetchCharacterList(page),
            placeholderData: keepPreviousData,
            enabled: false,
        })
}