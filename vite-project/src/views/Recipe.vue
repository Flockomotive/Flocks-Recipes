<template>
  <div class="recipe-page">
    <header>
      <!-- Top Navigation -->
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/recipes">Recipes</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>{{ recipe.title }}</h1>
      <p>{{ recipe.description }}</p> <!-- Added description -->
      <h2>Zutaten</h2>
      <ul>
        <li v-for="ingredient in recipe.ingredientGroups[0].ingredients" :key="ingredient.item">
          {{ ingredient.amount ? ingredient.amount + ' ' + (ingredient.unit || '') + ' ' : '' }}{{ ingredient.item }}
        </li>
      </ul>
      <h2>Zubereitung</h2>
      <ol>
        <li v-for="step in recipe.steps" :key="step">{{ step }}</li>
      </ol>
      <p>{{ recipe.cookingInstructions }}</p>
    </main>
  </div>
</template>

<style>
.recipe-page {
  padding: 20px;
  background-color: #fff;
}
@media (max-width: 768px) {
  /* Responsive styles for recipe page */
}
</style>