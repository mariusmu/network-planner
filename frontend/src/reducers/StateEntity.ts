export interface StateEntity<T> {
  entity: T
  state: 'idle' | 'loading' | 'succeeded' | 'failed'
}
