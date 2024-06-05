export interface MainArtist {
  id: string | null,
  artistId?: string | null,
  userIds?: string[],
  name: string | null,
  labelName: string | null,
  avatar?: string | null,
  email?: string | null
}

export interface Collaborator extends MainArtist {
  type: 'MAIN' | 'FEAT'
}

export interface Owner extends MainArtist {
  split: number
}

export interface Songwriter extends MainArtist {
  type: 'MUSIC' | 'LYRICS'
}

export interface Credit extends MainArtist {
  roles: string[]
}

export const INSTRUMENTALS = [
  {
    id: false,
    name: 'No, this track is not an instrumental',
    help: 'This track contains vocals'
  },
  {
    id: true,
    name: 'Yes, this track is an instrumental',
    help: 'This track has no vocals'
  }
];

export const EXPLICIT = [
  {
    id: 'NONE',
    name: 'No, not Explicit',
    help: 'No, this track contains no explicit language or themes.'
  },
  {
    id: 'EXPLICIT',
    name: 'Yes, Explicit',
    help: 'Yes this track contains explicit language or themes.'
  },
  {
    id: 'CLEAN',
    name: 'Clean',
    help: 'No, this track contains no explicit language or themes.'
  }
];

export const DRAG_CONFIG = {
  behaviour: 'drag',
  start: [0, 30000],
  connect: true,
  keyboard: true,
  range: {
    min: 0,
    max: 180000
  },
  step: 1000,
  limit: 30000,
  min: 30000,
  max: 30000
}
