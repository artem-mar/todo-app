const { test, expect } = require('@playwright/test');

test('open form', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await page.getByRole('button').first().click();

  // форма открылась
  await expect(page.getByPlaceholder('Название задачи')).toBeVisible();

  // далее закрываем форму
  await page.getByRole('button', { name: 'Отмена' }).click();

  // снова проверяем, тут тесты падают
  await expect(page.getByPlaceholder('Название задачи')).toBeVisible();
});

test('add a new task', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await page.getByRole('button').first().click();

  await page.getByPlaceholder('Название задачи').fill('test task');
  await page.getByPlaceholder('Введите описание').fill('описание');
  await page.getByRole('textbox', { name: 'Дедлайн' }).fill('2023-04-10T10:20');

  await page.getByRole('button', { name: 'Отправить' }).click();

  await expect(page.getByText('test task')).toBeVisible();
  await expect(page.getByText('10 апреля')).toBeVisible();
  await expect(page.getByText('описание')).toBeVisible();
});

test('edit task', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await page.getByTestId('edit task').first().click();

  await expect(page.locator('_react=Form')).toBeVisible();
});

test('delete task', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('delete test task').click();

  // тут по идее тесты должны падать
  await expect(page.getByText('10 апреля')).toBeVisible();
});
