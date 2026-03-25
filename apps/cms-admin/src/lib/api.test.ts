import { describe, expect, it } from 'vitest'

describe('api client smoke', () => {
  it('has test harness configured', () => {
    expect(typeof fetch).toBe('function')
  })
})
