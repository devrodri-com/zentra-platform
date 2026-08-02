import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FoundationMessage } from "./foundation-message";

describe("FoundationMessage", () => {
  it("renders the neutral foundation content", () => {
    render(<FoundationMessage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "ZENTRA Platform Foundation",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Technical development baseline")).toBeInTheDocument();
  });

  it("renders exactly one level-one heading", () => {
    render(<FoundationMessage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
