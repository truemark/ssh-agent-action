import {getInput} from '@actions/core'

export function required(value: string | undefined | null): string {
  if (!value) throw new Error('Required input is missing')
  return value
}

export function optionalNumber(value: string): number | undefined {
  if (!value) return undefined
  return parseInt(value, 10)
}

export function optionalBoolean(value: string): boolean | undefined {
  if (!value) return undefined
  return value === 'true'
}

export function optionalJson<T>(value: string): T | undefined {
  if (!value) return undefined
  return JSON.parse(value) as T
}

export function optionalValues(value: string, allowedValues: string[]): string | undefined {
  if (!value) return undefined
  if (!allowedValues.includes(value)) throw new Error(`Invalid value for input: ${value}`)
  return value
}

export function optionalArray(value: string, delimiter?: string): string[] | undefined {
  if (!value) return undefined
  return value.split(delimiter ?? '\n')
}

export function undefinedIfEmpty(value: string): string | undefined {
  if (!value || value === '') return undefined
  return value
}

export function requiredValues(value: string, allowedValues: string[]): string {
  if (!allowedValues.includes(value)) throw new Error(`Invalid value for input: ${value}`)
  return value
}

export interface Config {
  readonly privateKeyPath: string
}

export function loadConfig(): Config {
  return {
    privateKeyPath: getInput('private-key-path')
  }
}
