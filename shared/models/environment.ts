export interface Environment {
  id: string
  name: string
  description: string
}

export interface EnvironmentList {
  environments: Environment[]
}
