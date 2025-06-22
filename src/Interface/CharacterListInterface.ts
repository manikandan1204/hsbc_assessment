export interface CharacterLists {
  info: Info
  results: CharacterListsInfo[]
}

export interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface CharacterListsInfo extends CharacterListsTableInfo {
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharacterListsTableInfo {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
}



export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}
