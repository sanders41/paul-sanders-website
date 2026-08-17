import { expect, test } from "@playwright/test";

test("Header is visible", async ({ page }) => {
  await page.goto("/");

  expect(await page.innerText("h1")).toBe("Paul Sanders");
});

test("GitHub sponsor button is visible", async ({ page }) => {
  await page.goto("/");

  const githubSponsorLink = page.locator(
    'a[href="https://github.com/sponsors/sanders41"]',
  );
  await expect(githubSponsorLink).toBeVisible();
  await expect(githubSponsorLink.locator("img")).toBeVisible();
});

test("BuyMeACoffee sponsor button is visible", async ({ page }) => {
  await page.goto("/");

  const buyMeACoffeeLink = page.locator(
    'a[href="https://www.buymeacoffee.com/sanders41"]',
  );
  await expect(buyMeACoffeeLink).toBeVisible();
  await expect(buyMeACoffeeLink.locator("img")).toBeVisible();
});
