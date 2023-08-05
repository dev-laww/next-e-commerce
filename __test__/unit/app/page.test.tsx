import { render, screen } from "@testing-library/react"
import Home from "@app/page"
import "@testing-library/jest-dom"

describe("Page", () => {
    it("renders correctly", () => {
        const {container} = render(<Home/>)

        const paragraph = screen.getByRole("main", {
            name: "",
        })

        expect(paragraph).toBeInTheDocument()
        expect(container).toMatchSnapshot()
    })
})