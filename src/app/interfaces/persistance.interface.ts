export interface FsPersistanceConfig {
  name?: string;
  timeout?: number;
}

export type FsPersistance = boolean | FsPersistanceConfig;
