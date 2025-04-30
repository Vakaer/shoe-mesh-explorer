export type ShoePart =
  | 'laces'
  | 'mesh'
  | 'caps'
  | 'inner'
  | 'sole'
  | 'stripes'
  | 'band'
  | 'patch';

export type ShoeItems = Record<ShoePart, string>;