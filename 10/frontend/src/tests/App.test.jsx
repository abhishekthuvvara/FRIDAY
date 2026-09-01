import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";

describe("FRIDAY App Foundation", () => {
  it("renders the landing page correctly", async () => {
    // We need to wrap App in the context providers it uses to avoid routing errors in tests
    render(<App />);

    // Use findAllByText because the word "FRIDAY" appears multiple times on the page
    const fridayElements = await screen.findAllByText(/FRIDAY/i);
    expect(fridayElements.length).toBeGreaterThan(0);

    // Look for "Coding Assistant" instead of "AI Coding Assistant"
    // because the words are split across different HTML elements.
    expect(await screen.findByText(/Coding Assistant/i)).toBeDefined();
  });
});
