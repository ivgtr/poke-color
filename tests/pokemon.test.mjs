import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pokemon = JSON.parse(await readFile(new URL('../src/localize/pokemon/ja.json', import.meta.url)))

test('all 151 original Pokémon have unique numbers and two valid colors', () => {
  assert.equal(pokemon.length, 151)
  assert.equal(new Set(pokemon.map(p => p.Number)).size, 151)
  for (const p of pokemon) {
    assert.ok(p.Name)
    assert.match(p.Color, /^#[0-9a-f]{6}$/i)
    assert.match(p.SubColor, /^#[0-9a-f]{6}$/i)
  }
})
