import { expect, test } from "@playwright/test";

test("Header is visible", async ({ page }) => {
  await page.goto("/");

  expect(await page.innerText("h1")).toBe("Paul Sanders");
});
