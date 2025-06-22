import { CharacterLists } from "../Interface/CharacterListInterface";
import axios from '../AxiosConfig'

 export async function fetchCharacterList(pageNo:number): Promise<CharacterLists> {
    try {
      const response = await axios.get(`/character?page=${pageNo}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };