import { render, screen } from '@testing-library/react'
import Home from "@app/page"
import '@testing-library/jest-dom'

describe('Home', () => {
    it('Main', () => {
        render(<Home/>)

        const paragraph = screen.getByRole('main', {
            name: "",
        })

        expect(paragraph).toBeInTheDocument()
    })

    it('Get started by editing', () => {
        render(<Home/>)

        const paragraph = screen.getByText('Get started by editing')

        expect(paragraph).toBeInTheDocument()
    })

    it('src/app/page.tsx', () => {
        render(<Home/>)

        const paragraph = screen.getByText('src/app/page.tsx')

        expect(paragraph).toBeInTheDocument()

        expect(paragraph).toHaveClass('font-bold')
    })
})