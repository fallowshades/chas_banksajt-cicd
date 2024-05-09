import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' //extend-expect
import Page from './page'

it('App Router: Works with Server Components', () => {
  render(<Page />)

  screen.debug()

  expect(screen.getByRole('heading')).toHaveTextContent('Välkommen till banken')
})
