"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CategoriesRepositoryInMemory = require("../../repositories/in-memory/CategoriesRepositoryInMemory");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

describe("Create Category", () => {
  let createCategoryUseCase;
  let categoriesRepositoryInMemory;
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("Should create a category", async () => {
    const category = {
      name: "Create Category",
      description: "Teste"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    expect(categoryCreated).toHaveProperty("id");
  });
  it("Should not be able create a category with same name", async () => {
    const category = {
      name: "Create Category",
      description: "Teste"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new _AppError.AppError("Category Already Exists"));
  });
});